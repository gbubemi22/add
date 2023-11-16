import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import  express from "express";
const app = express();



import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";


//import route

import routes from './src/router/index.js'

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome To ADIS APP" });
});

//use routes
app.use(routes);


//ErrorHandlerMiddleware
import notFoundMiddleware from "./src/middleware/not-found.js";
import errorHandlerMiddleware from "./src/middleware/error-handler.js";



app.use(helmet());



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 4000;

const start = async () => {
  try {
    
    app.listen(port, () => {
      console.log(`listing on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();