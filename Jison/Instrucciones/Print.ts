import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../Simbolo/Arbol"
import { TablaSimbolos } from "../Simbolo/TablaSimbolos"
import { Errores } from "../Excepciones/Errores"
import { Tipo } from "../Simbolo/Tipo"
import { tipoDato } from "../Simbolo/tipoDato"
import { tipoInstruccion } from "../Simbolo/tipoInstruccion"
import { Node } from "../Abstract/Node"

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

    public ast(arbol: Arbol, tabla: TablaSimbolos): Node {
        let node = new Node("PRINT");
        node.pushChild(this.expresion.ast(arbol, tabla));
        return node;
    }
    

}