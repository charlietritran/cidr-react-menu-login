
//////////////////////////////////////
//
// REACT JS QA WITH EXPRESS SERVER
//
//////////////////////////////////////

- npx kill-port 8448

1) EXPRESS SERVER: 
- install connect-mock-api (https://blog.harveydelaney.com/setting-up-a-mock-api-for-your-front-end-react-project/)
- install cors (https://www.geeksforgeeks.org/how-to-deal-with-cors-error-in-express-node-js-project/)

+ RUN:
- open terminal and type: PORT=9100 node mock-api/app.js => this will start nodejs server with port 9100
- open another terminal and test api srv: curl -i http://localhost:9100/api/user/cidrAdmin

2) REACT FRONT END:
- Remember to update authorService.js to swith to non https.

+ RUN:
- Open terminal and run npm start.  URL: http://localhost:3000/cidr-react-menu-login








- Open console from terminal and type: npm install
- Run with:  HTTPS=true npm start
- Browser url: https://localhost:8448/demo-react-auth-login
- Browser have tested: Chrome
- PORT can be changed in .env



- Rest API can be changed / adjusted from pre-set in the project: https://localhost:8443/demo-rest-auth-login



- QA:
1) Router link not move to page until refresh?  have to install react-router-dom 5.2.1
2) Network error: Cert. list not popped up?  Need to enter rest url in browser first to allow secure access confirm.
   usually, this happens when first time to call rest or after a clear cache
3) can not find redux in ../node-modules/dev-tool-extenstion => delete react-resux from pkg-json, and do: npm install --save redux react-redux