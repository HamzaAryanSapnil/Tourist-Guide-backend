import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

export const validateRequest = (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        console.log("before if block", req.body);
         if (req.body && typeof req.body.data === "string") {
           req.body = JSON.parse(req.body.data);
         }
       console.log("after if block", req.body);
       console.log("before zod schema", req.body);
        
        req.body = await zodSchema.parseAsync(req.body);
        next()
    } catch (error) {
        next(error)
    }
}