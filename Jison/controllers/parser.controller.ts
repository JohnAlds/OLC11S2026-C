import parser from "../analizador/parserWrapper";

import { Arbol } from "../Simbolo/Arbol";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Errores } from "../Excepciones/Errores";
import { Node } from "../Abstract/Node";

export const analizar = (req: any, res: any) => {

    const entrada = req.body.codigo;

    try {
        let init = new Node("INICIO");
        let instrucciones = parser.parse(entrada);
        console.log("Instrucciones parseadas:", instrucciones);

        // asegurar que sea arreglo
        if (!Array.isArray(instrucciones)) {
            instrucciones = [instrucciones];
        }

        const arbol = new Arbol(instrucciones);
        const tabla = new TablaSimbolos();

        for (let instruccion of instrucciones) {

            const resultado = instruccion.interpretar(arbol, tabla);
            init.pushChild(instruccion.ast(arbol, tabla));
            if (resultado instanceof Errores) {
                arbol.errores.push(resultado);
            }

        }
        console.log(init.getDot());
        res.json({
            consola: arbol.consola,
            errores: arbol.errores
        });

    } catch (error) {

        console.error("Error de análisis:", error);

        res.json({
            error: "Error de análisis"
        });

    }

};