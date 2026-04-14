import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoDato } from "../Simbolo/tipoDato";
import { Errores } from "../Excepciones/Errores";
import { OperadoresRelacionales } from "./OperadoresRelacionales";
import { Node } from "../Abstract/Node"
import { Arbol } from "../Simbolo/Arbol";

export class Igual extends Instruccion {
    private operando1: Instruccion;
    private operando2: Instruccion;
    private operador: OperadoresRelacionales;

    constructor(
        operando1: Instruccion,
        operando2: Instruccion,
        operador: OperadoresRelacionales,
        linea: number,
        columna: number
    ) {
        super(new Tipo(tipoDato.BOOLEANO, true), linea, columna);
        this.operando1 = operando1;
        this.operando2 = operando2;
        this.operador = operador;
    }

    interpretar(arbol: any, tabla: TablaSimbolos): any {
        const opIzq = this.operando1.interpretar(arbol, tabla);
        if (opIzq instanceof Errores) return opIzq;

        const opDer = this.operando2.interpretar(arbol, tabla);
        if (opDer instanceof Errores) return opDer;

        const tipoIzq = this.operando1.tipo.tipoDato;
        const tipoDer = this.operando2.tipo.tipoDato;

        const esNumeroIzq = tipoIzq === tipoDato.ENTERO || tipoIzq === tipoDato.DECIMAL;
        const esNumeroDer = tipoDer === tipoDato.ENTERO || tipoDer === tipoDato.DECIMAL;

        switch (this.operador) {
            case OperadoresRelacionales.IGUAL:
                if (esNumeroIzq && esNumeroDer) {
                    return Number(opIzq) === Number(opDer);
                }

                if (tipoIzq === tipoDer) {
                    return opIzq === opDer;
                }

                return false;

            default:
                return new Errores(
                    "Semantico",
                    "Operador relacional inválido en Igual",
                    this.linea,
                    this.col
                );
        }
    }

    public ast(arbol: Arbol, tabla: TablaSimbolos): Node {
            
        let node = new Node("");
        return node;
    }
}