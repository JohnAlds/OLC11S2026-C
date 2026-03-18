import { Instruccion } from "../Abstract/Instruccion"
import { TablaSimbolos } from "./TablaSimbolos"
import { Errores } from "../Excepciones/Errores"
import { Simbolo } from "./Simbolo"

export class Arbol {

    instrucciones: Instruccion[]
    consola: string = ""
    tablaGlobal: TablaSimbolos
    errores: Errores[] = []
    simbolos: Simbolo[] = []
    contador: number = 0

    constructor(instrucciones: Instruccion[]) {
        this.instrucciones = instrucciones
        this.tablaGlobal = new TablaSimbolos()
    }

    print(valor: string) {
        this.consola += valor + "\n"
    }

    getContador(): number {
        this.contador++
        return this.contador
    }

}