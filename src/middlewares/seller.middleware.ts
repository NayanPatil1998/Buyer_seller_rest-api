import { NextFunction, Request, Response } from "express";
export const SellerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user){
        return res.status(401).json({ message: 'Not Authenticated' });
    }
    if(req.session.user.type !== "seller"){
        return res.status(401).json({ message: 'Not valid seller' });
    }

    next()
}