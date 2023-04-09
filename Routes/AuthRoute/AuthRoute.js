// import { Express, request, response } from "express";
// import authController from "../../Controller/Auth/AuthController";
// const router = Express.Router();
// const AuthController= new authController();
// router.post('/api/user-signup',(request,response)=>{
//     AuthController.SignUp(request,response);
// });

// router.post('/api/user-signin',(request,response)=>{
//     AuthController.Login(request,response);

// });

// export default router ;


const express = require('express');
import { Request, Response } from 'express';
import AuthController from "../../Controller/Auth/AuthController";

const router = express.Router();
const authController = new AuthController();

router.post('/api/user-signup', (request, response) => {
  authController.SignUp(request, response);
});

router.post('/api/user-signin', (request, response) => {
  authController.Login(request, response);
});

export default router;
