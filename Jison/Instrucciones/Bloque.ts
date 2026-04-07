import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoInstruccion } from "../Simbolo/tipoInstruccion";
import { Errores } from "../Excepciones/Errores";
import { Node } from "../Abstract/Node";

export class Bloque extends Instruccion {
    private instrucciones: Instruccion[];
    private entornoLocal! : TablaSimbolos;
    constructor(instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoInstruccion.BLOQUE, false), linea, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: any, tabla: TablaSimbolos) {
        this.entornoLocal = new TablaSimbolos(tabla);

        for (const instruccion of this.instrucciones) {
            const resultado = instruccion.interpretar(arbol, this.entornoLocal);

            if (resultado instanceof Errores) {
                return resultado;
            }
        }

        return null;
    }

    public ast(arbol: any, tabla: TablaSimbolos): Node {
        let node = new Node("BLOQUE");
        for (const instruccion of this.instrucciones) {
            node.pushChild(instruccion.ast(arbol, this.entornoLocal));
        }
        return node;
    }
}