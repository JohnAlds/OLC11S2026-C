import { Instruccion } from "../Abstract/Instruccion"
import { Arbol } from "../Simbolo/Arbol"
import { TablaSimbolos } from "../Simbolo/TablaSimbolos"
import { Tipo } from "../Simbolo/Tipo"
import { Errores } from "../Excepciones/Errores"
import { tipoDato } from "../Simbolo/tipoDato"
import { OperadoresAritmeticos } from "./OperadoresAritmeticos"

export class Division extends Instruccion {

    private operando1: Instruccion
    private operando2: Instruccion
    private operacion: OperadoresAritmeticos

    constructor(
        operando1: Instruccion,
        operando2: Instruccion,
        operacion: OperadoresAritmeticos,
        linea: number,
        columna: number
    ) {
        super(new Tipo(tipoDato.ENTERO, true), linea, columna)
        this.operando1 = operando1
        this.operando2 = operando2
        this.operacion = operacion
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos): any {

        const opIzq = this.operando1.interpretar(arbol, tabla)
        if (opIzq instanceof Errores) return opIzq

        const opDer = this.operando2.interpretar(arbol, tabla)
        if (opDer instanceof Errores) return opDer

        switch (this.operacion) {
            case OperadoresAritmeticos.DIVISION:
                return this.division(opIzq, opDer)

            default:
                return new Errores(
                    "SEMANTICO",
                    "Operador invalido",
                    this.linea,
                    this.col
                )
        }
    }

    division(op1: any, op2: any): any {

        const tipo1 = this.operando1.tipo.tipoDato
        const tipo2 = this.operando2.tipo.tipoDato

        switch (tipo1) {

            case tipoDato.ENTERO:
                switch (tipo2) {

                    case tipoDato.ENTERO:
                        this.tipo.tipoDato = tipoDato.ENTERO
                        return op1 / op2

                    case tipoDato.DECIMAL:
                        this.tipo.tipoDato = tipoDato.DECIMAL
                        return Number(op1) / op2


                    default:
                        return new Errores("SEMANTICO", "Division erronea", this.linea, this.col)
                }

            case tipoDato.DECIMAL:
                switch (tipo2) {

                    case tipoDato.ENTERO:
                        this.tipo.tipoDato = tipoDato.DECIMAL
                        return op1 / Number(op2)

                    case tipoDato.DECIMAL:
                        this.tipo.tipoDato = tipoDato.DECIMAL
                        return op1 / op2


                    default:
                        return new Errores("SEMANTICO", "Division erronea", this.linea, this.col)
                }

          
        }
    }

    

}