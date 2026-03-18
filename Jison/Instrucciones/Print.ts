import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../Simbolo/Arbol"
import { TablaSimbolos } from "../Simbolo/TablaSimbolos"
import { Errores } from "../Excepciones/Errores"
import { Tipo } from "../Simbolo/Tipo"
import { tipoDato } from "../Simbolo/tipoDato"
import { tipoInstruccion } from "../Simbolo/tipoInstruccion"

export class Print extends Instruccion {

    private expresion: Instruccion

    constructor(expresion: Instruccion, linea: number, col: number) {
        super(new Tipo(tipoInstruccion.PRINT), linea, col)
        this.expresion = expresion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos): any {

        const valor = this.expresion.interpretar(arbol, tabla)

        if (valor instanceof Errores) {
            return valor
        }

        arbol.print(valor.toString())

        return null
    }

    

}