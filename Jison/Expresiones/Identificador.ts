import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Errores } from "../Excepciones/Errores";
import { Tipo } from "../Simbolo/Tipo";
import { tipoDato } from "../Simbolo/tipoDato";
import { Node } from "../Abstract/Node";

export class Identificador extends Instruccion {

    id: string;

    constructor(id: string, linea: number, columna: number) {
        super(new Tipo(tipoDato.NULO, true), linea, columna);
        this.id = id;
    }

    interpretar(arbol: any, tabla: TablaSimbolos) {

        const simbolo = tabla.getVariable(this.id);

        if (simbolo == null) {
            return new Errores(
                "Semantico",
                `Variable ${this.id} no existe`,
                this.linea,
                this.col 
            );
        }

        this.tipo = simbolo.tipo;
        return simbolo.valor;
    }

    public ast(arbol: any, tabla: TablaSimbolos): Node {
        let node = new Node("IDENTIFICADOR");
        let simbolo = tabla.getVariable(this.id);
        if (simbolo) {
            node.pushChild(new Node(this.id));
            node.pushChild(new Node(simbolo.valor.toString()));
        } else {
            node.pushChild(new Node(this.id));
            node.pushChild(new Node("null"));
        }
        return node;
    }
}