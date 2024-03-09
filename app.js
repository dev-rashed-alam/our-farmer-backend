const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require("path");
const appRouter = require("./routes/appRouter")
const {connectDB} = require("./utilities/dbConnection");
const {
    notFoundHandler,
    errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", appRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App listening to port ${process.env.PORT}`)
})