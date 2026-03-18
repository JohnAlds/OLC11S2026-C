import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../Simbolo/Arbol"
import { TablaSimbolos } from "../Simbolo/TablaSimbolos"
import { Tipo } from "../Simbolo/Tipo"

export class Nativo extends Instruccion {

    public valor: any

    constructor(valor: any, tipo: Tipo, linea: number, columna: number) {
        super(tipo, linea, columna)
        this.valor = valor
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos): any {
        return this.valor
    }

}