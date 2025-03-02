# using bootstrap modal 
## install bootstrap, jquery, popper.js
npm install bootstrap jquery popper.js
## import the styles and scripts in angular.json
### styles
"node_modules/bootstrap/dist/css/bootstrap.min.css"
### scripts

"node_modules/jquery/dist/jquery.min.js",
"node_modules/bootstrap/dist/js/bootstrap.min.js",
"node_modules/popper.js/dist/umd/popper.min.js"
## generate a new modal component
ng g c modals/modal
## 