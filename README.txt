
//////////////////////////////////////
//
// REACT JS QA
//
//////////////////////////////////////

- npx kill-port 8448

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