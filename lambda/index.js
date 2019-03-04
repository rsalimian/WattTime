
"use strict";

let axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb://gfgS2ekZs6mZvlrxKLUl:nid2FsbCRtIn7W9oDyqG@ds153495.mlab.com:53495/swytch"; //process.env.MONGODB_URI; // or Atlas connection string

let cachedDb = null;

/**
 * connects to database
 * @param {string} uri MongoDB database connection string
 * @return {object} database connection
 */
function connectToDatabase (uri) {
  
  // if cached db connection is not null then just use it
  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(uri, { useNewUrlParser: true })
    .then(client => {
       
      cachedDb = client.db('swytch');
      return cachedDb;
    });
}

/**
 * loads and returns basic collection Datatype
 * 
 * @param {object} db database conneciton
 * @return Object of result 
 */
async function getDatatype (db) {
  return await db.collection('datatype').find({}).toArray()
    .then((data) => { return { statusCode: 200, body: data }; })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

/**
 * loads and returns basic collection Region
 * 
 * @param {object} db database conneciton
 * @return Object of result 
 */
async function getRegionList (db) {
  return await db.collection('region').find({}).toArray()
    .then((data) => { return { statusCode: 200, body: data }; })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

/**
 * bulk insert to griddata collection
 * 
 * @param {object} db database conneciton
 * @param {data} db array of records object
 * @return Object of result 
 */
async function bulkSave (db, data) {

 return await db.collection('griddata').insertMany(data)
    .then(() => { return { statusCode: 200, body: 'bulk insert successfully processed!' }; })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

exports.handler =  async (event, context) => {
    
    context.callbackWaitsForEmptyEventLoop = false;

    // login to WattTime API 
    await login();
    
    // get today day to use as default 
    let today = new Date().toISOString().slice(0, 10);

    // load datatype collection
    let datatypeList = await connectToDatabase(MONGODB_URI)
    .then(db => getDatatype(db))
    .then(result => {
    console.log('=> returning result: ', result);
    return result.body;
    });

    // load region colleciton
    let regionList = await connectToDatabase(MONGODB_URI)
        .then(db => getRegionList(db))
        .then(result => {
        console.log('=> returning result: ', result);
        return result.body;
    });

    /**
     * prepare griddata records.
     * @param {Object} gridObject object of datagrid recoed
     */
    function prepareGridData(gridObject)
    {
        // lookup in region list to return the region id
        let obj = regionList.find(o => o.ba === gridObject.ba);
        gridObject.ba = obj.regionId;
        
        // look up in datatype list to return the typeid
        obj = datatypeList.find(o => o.name === gridObject.datatype);
        gridObject.datatype = obj.typeid;
    }

    // pull griddata form WattAPI
    let gridData = await getGridData({
        startTime : event['startTime'] || today,
        endTime : event['endTime'] || today
    });
  
    gridData.map(prepareGridData);

    // run the bulk insert
    await connectToDatabase(MONGODB_URI)
        .then(db => bulkSave(db, gridData))
        .then(result => {
        console.log('=> returning result: ', result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
    });
    
    return { statusCode: 200,body: JSON.stringify(gridData) };
};

/**
 * gets griddata datas form WattTime API
 * @param {object} params object contians StartTime and EndTime
 * @returns {objcect} object array of result
 */
async function getGridData(params)
 {
        var config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic cnNhbGltaWFuOlh4TUlPNDd3MmdoNXdRRlkmdCFl'
        }
    };
  
    var url = `https://api2.watttime.org/v2/data/?ba=CAISO_ZP26&starttime=${params['startTime']}&endtime=${params['endTime']}&style=all&moerversion=2.1`;
    return await axios.get(url, config)
        .then(response => {
             return response.data;
    })
    .catch(error => {
        console.log(error);
    });
    
}

/**
 * logins to WattTime API
 */
async function login() 
{
    var config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic cnNhbGltaWFuOlh4TUlPNDd3MmdoNXdRRlkmdCFl'
        }
    };

    return await axios.get('https://api2.watttime.org/v2/login/', config)
        .then(response => {
                return response.data.token;
    })
    .catch(error => {
        console.log(error);
    });

}