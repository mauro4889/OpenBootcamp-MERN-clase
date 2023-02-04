import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


/**
 * 
 * @param {Request} req  Original request previous middleware of verification JWT
 * @param {Response} res Response to verification of JWT
 * @param {NextFunction} next Next function to be executed 
 * @returns 
 */


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    // Cheack HEADER from request for 'x-access-token'
    let token: any = req.headers['x-access-token']

    //Verify if token is present
    if (!token) {
        return res.status(403).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not authorised to consume this endpoint'
        })
    }

    //Verify the token obtained
    jwt.verify(token, `${process.env.SECRET}`, (err: any, decoded: any) => {
        if (err) {
            return res.status(500).send({
                authenticationError: 'Missing JWT in request',
                message: 'Not authorised to consume this endpoint'
            })
        }
    })

}