import parser from "../analizador/parserWrapper";

export const analizar = (req: any, res: any) => {

    const { codigo } = req.body;

    try {

        const resultado = parser.parse(codigo);

        res.json({ resultado });

    } catch (error) {

        res.json({
            error: "Error de análisis"
        });

    }

};