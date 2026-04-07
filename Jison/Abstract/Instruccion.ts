import { Arbol } from "../Simbolo/Arbol";
import { Tipo } from "../Simbolo/Tipo";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Node } from "./Node";
export abstract class Instruccion {

    tipo: Tipo;
    linea: number;
    col: number;

    constructor(tipo: Tipo, linea: number, col: number) {
        this.tipo = tipo;
        this.linea = linea;
        this.col = col;
    }

    abstract interpretar(arbol: Arbol, tabla: TablaSimbolos): any;
    public abstract ast(arbol?: Arbol, tabla?: TablaSimbolos): Node;
}