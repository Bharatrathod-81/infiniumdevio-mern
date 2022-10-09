const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./middleWare/errorHandler');
const RouteNotFound = require('./middleWare/routeNotFound');
const router = require('./router/employee.router');
const { initializeDBConnection } = require('./db/db.connect');
const app = express()
const port = process.env.PORT || 4000 ;
const mode = process.env.NODE_ENV

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

initializeDBConnection();

app.use("/employees",router);

app.use(RouteNotFound)
app.use(ErrorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))