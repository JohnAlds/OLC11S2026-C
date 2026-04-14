import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoInstruccion } from "../Simbolo/tipoInstruccion";
import { Node } from "../Abstract/Node"
import { Arbol } from "../Simbolo/Arbol";

export class Continue extends Instruccion {
    constructor(linea: number, columna: number) {
        super(new Tipo(tipoInstruccion.CONTINUE, false), linea, columna);
    }

    interpretar(arbol: any, tabla: TablaSimbolos): any {
        return this;
    }

    public ast(arbol: Arbol, tabla: TablaSimbolos): Node {
            
        let node = new Node("");
        return node;
    }

    
}