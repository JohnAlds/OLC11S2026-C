import e, { Request, Response } from "express";

const testController = (req: Request, res: Response) => {

    res.json({
        msg: "API funcionando correctamente",
        ok: true
    });

};

export { testController };