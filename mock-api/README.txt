+ RUN:
- open terminal and type: PORT=9100 node mock-api/app.js
=> this will start nodejs server with port 9100
- open another terminal and test api srv: curl -i http://localhost:9100/api/user/cidrAdmin