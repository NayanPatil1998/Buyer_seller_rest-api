import { NextFunction, Request, Response } from "express";
export const BuyerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user){
        return res.status(401).json({ message: 'Not Authenticated' });
    }
    if(req.session.user.type !== "buyer"){
        return res.status(401).json({ message: 'Not valid Buyer' });
    }

    next()
}