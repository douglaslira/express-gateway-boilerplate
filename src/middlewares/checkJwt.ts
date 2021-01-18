import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JWTSECRET } from '../../config/contants';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

    let token = <string>req.headers["authorization"];
    let jwtPayload;

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    } else {
        res.status(401).send();
    }

    try {
        jwtPayload = <any>jwt.verify(token, JWTSECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        res.status(401).send();
        return;
    }
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, JWTSECRET, {expiresIn: "1h"});
    res.setHeader("token", newToken);

    next();
}