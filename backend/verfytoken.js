import  Jwt from "jsonwebtoken";
import { handleError } from "./error.js";


export const verifytoken = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token) return next(handleError(401,"Access Denied!"));
    Jwt.verify(token,process.env.JWT, (err,user) =>{
        if(err) return next(createError(403,"invalid token"));
        req.user = user;
        next();
    });
};