import { Instruccion } from "../Abstract/Instruccion";
import { Node } from "../Abstract/Node";
import { Errores } from "../Excepciones/Errores";
import { Arbol } from "../Simbolo/Arbol";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoDato } from "../Simbolo/tipoDato";

export class AccesoMatriz extends Instruccion {

    private id: string;
    private indices: Instruccion[];

    constructor(id: string, indices: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoDato.NULO, true), linea, columna);
        this.id = id;
        this.indices = indices;
    }

    interpretar(arbol: Arbol, tabla: TablaSimbolos): any {
        const simbolo = tabla.getVariable(this.id);

        if (!simbolo) {
            return new Errores(
                "Semantico",
                `La variable ${this.id} no existe`,
                this.linea,
                this.col
            );
        }

        if ((simbolo.tipo.dimensiones ?? 0) <= 0) {
            return new Errores(
                "Semantico",
                `La variable ${this.id} no es una matriz`,
                this.linea,
                this.col
            );
        }

        if (simbolo.valor === null) {
            return new Errores(
                "Semantico",
                `La matriz ${this.id} es null`,
                this.linea,
                this.col
            );
        }

        if (this.indices.length > (simbolo.tipo.dimensiones ?? 0)) {
            return new Errores(
                "Semantico",
                `La matriz ${this.id} no tiene tantas dimensiones`,
                this.linea,
                this.col
            );
        }

        let actual = simbolo.valor;

        for (const indiceExp of this.indices) {
            const indice = indiceExp.interpretar(arbol, tabla);
            if (indice instanceof Errores) return indice;

            if (indiceExp.tipo.tipoDato !== tipoDato.ENTERO) {
                return new Errores(
                    "Semantico",
                    "El índice de acceso debe ser entero",
                    this.linea,
                    this.col
                );
            }

            if (!Array.isArray(actual)) {
                return new Errores(
                    "Semantico",
                    `Acceso inválido sobre ${this.id}`,
                    this.linea,
                    this.col
                );
            }

            if (indice < 0 || indice >= actual.length) {
                return new Errores(
                    "Semantico",
                    `Índice fuera de rango en ${this.id}`,
                    this.linea,
                    this.col
                );
            }

            actual = actual[indice];
        }

        const dimensionesRestantes = Math.max((simbolo.tipo.dimensiones ?? 0) - this.indices.length, 0);
        this.tipo = new Tipo(simbolo.tipo.tipoDato as tipoDato, true, dimensionesRestantes);

        return actual;
    }

    public ast(arbol: Arbol, tabla: TablaSimbolos): Node {
        const nodo = new Node("ACCESO_MATRIZ");
        nodo.pushChild(new Node(this.id));

        for (const indice of this.indices) {
            nodo.pushChild(indice.ast(arbol, tabla));
        }

        return nodo;
    }
}