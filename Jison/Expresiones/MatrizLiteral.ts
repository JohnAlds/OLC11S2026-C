import { Instruccion } from "../Abstract/Instruccion";
import { Node } from "../Abstract/Node";
import { Errores } from "../Excepciones/Errores";
import { Arbol } from "../Simbolo/Arbol";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoDato } from "../Simbolo/tipoDato";

export class MatrizLiteral extends Instruccion {

    private filas: Instruccion[][];

    constructor(filas: Instruccion[][], linea: number, columna: number) {
        super(new Tipo(tipoDato.NULO, true, 2), linea, columna);
        this.filas = filas;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos): any {
        const resultado: any[] = [];
        let tipoBase: tipoDato | null = null;

        for (const fila of this.filas) {
            const filaInterpretada: any[] = [];

            for (const exp of fila) {
                const valor = exp.interpretar(arbol, tabla);
                if (valor instanceof Errores) return valor;

                const tipoExp = exp.tipo.tipoDato;

                if (tipoExp === undefined || tipoExp === tipoDato.NULO || tipoExp === tipoDato.ERROR) {
                    return new Errores(
                        "Semantico",
                        "No se pudo determinar el tipo de un elemento de la matriz",
                        this.linea,
                        this.col
                    );
                }

                if (tipoBase === null) {
                    tipoBase = tipoExp;
                } else if (tipoBase !== tipoExp) {
                    return new Errores(
                        "Semantico",
                        "Todos los elementos de la matriz deben ser del mismo tipo",
                        this.linea,
                        this.col
                    );
                }

                filaInterpretada.push(valor);
            }

            resultado.push(filaInterpretada);
        }

        if (tipoBase === null) {
            return new Errores(
                "Semantico",
                "No se puede inferir el tipo de una matriz vacía",
                this.linea,
                this.col
            );
        }

        this.tipo = new Tipo(tipoBase, true, 2);
        return resultado;
    }

    public ast(arbol: Arbol, tabla: TablaSimbolos): Node {
        const nodo = new Node("MATRIZ_LITERAL");

        for (const fila of this.filas) {
            const filaNodo = new Node("FILA");
            for (const exp of fila) {
                filaNodo.pushChild(exp.ast(arbol, tabla));
            }
            nodo.pushChild(filaNodo);
        }

        return nodo;
    }
}