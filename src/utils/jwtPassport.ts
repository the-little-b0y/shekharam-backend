import { Request } from 'express';
import passport from 'passport';
import passportJWT from "passport-jwt";
import { login } from '../controller/authController';
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwtsecret: string = process.env.JWT_SECRET || 'jwtsecret'

/** Creating passport strategy for login */
passport.use("strategyU1", new LocalStrategy({
        usernameField: 'mobileNumber',
        passwordField: 'password',
        passReqToCallback: true
    }, (req: Request, mobileNumber: string, password: string, callback: any) => {   
        login(req, mobileNumber, password, (statuscode, responsecode, OK, data)=>{
            const passportReturn = { statuscode, responsecode, OK, data }
            callback(null, passportReturn)
        })
    }
));

/** Creating passport strategy to check isauthorized */
passport.use("strategyU2", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtsecret
    }, (jwtPayload, callback) => {
        callback(null, jwtPayload);
    }
));
