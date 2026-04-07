import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../Simbolo/Arbol"
import { TablaSimbolos } from "../Simbolo/TablaSimbolos"
import { Tipo } from "../Simbolo/Tipo"
import { Node } from "../Abstract/Node"

export class Nativo extends Instruccion {

    public valor: any

    constructor(valor: any, tipo: Tipo, linea: number, columna: number) {
        super(tipo, linea, columna)
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos): any {
        return this.valor
    }

    public ast(): Node{
        let node = new Node("NATIVO");
        node.pushChild(new Node(this.valor.toString()));
        return node;
    }
}