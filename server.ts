const { Request, Response } = require("express");
const express = require("express");
const path = require("path");
const PORT = process.env.port || 3001;
const app = express();
const routes = require("./routes/apiRoutes")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);




app.listen(PORT, () => {
    console.log(`Server now listening on ${PORT}.`)
})