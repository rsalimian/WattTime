# WattTime
simple WebApp to pull some data from Watt Time API using AWS Lambda
and save to MongoDB

HOW TO RUN:
-----------

- clone from git hub: git@github.com:rsalimian/WattTime.git
- go to project folder
- run npm install
- run npm start


--------------------------------------------------------

stack:

    - Nodejs       v11.10.0
        - Express with ejs template system
            
    - MongoDB       
    - ANgularJS     1.7.5
    - Bootstrap     4.1.3


--------------------------------------------------------


- Lambda function pullWattTimeAPIData has scheduled to run runs every day at 2 AM
using Cloud Watch.

- Lambda watch will run at 2 AM and will pulls latest data.
