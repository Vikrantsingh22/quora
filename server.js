import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import expressSession from "express-session";
import MongoStore from "connect-mongodb-session";
import AuthRoute from './Routes/AuthRoute/AuthRoute';

// import AuthRoute from "./Routes/AuthRoute/AuthRoute";
// import QuestionRoute from "./Routes/QuestionRoute/Question";
dotenv.config();

const app = express();

//=====================================================Middlewares======================================================
app.listen(5000, ()=>{
    console.log("Started");
}
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const mongoStore = MongoStore(expressSession);
const mongoURI = process.env.mongoURI;
const store = new mongoStore({
  collection: "usersessions",
  uri: mongoURI,
  // expire means date of expiration after how many days it will expires example here it is 10 days
  expires: 10 * 60 * 60 * 24 * 1000,
});

app.use(
  expressSession({
    name: "_sid",
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60 * 60 * 24 * 1000,
      sameSite: false,
    },
  })
);

//=========================================================MongoDB Connection & Configs=================================
const mongoDB_connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(mongoURI, mongoDB_connectionOptions)
  
  .then(() => {
    console.log("Connection to MongoDB was successful");
  })
  .catch((error) => {
    console.error(error);
  });

//=========================================================Server EndPoints=============================================
app.use(AuthRoute);
// app.use(QuestionRoute);

//=========================================================Server Connection & Configs==================================
// const PORT = process.env.PORT || 3000;
const PORT = 3000; // Change the port number to 3000 or any other available port
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});