import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Errores } from "../Excepciones/Errores";
import { Tipo } from "../Simbolo/Tipo";
import { tipoDato } from "../Simbolo/tipoDato";

export class Identificador extends Instruccion {

    id: string;

    constructor(id: string, linea: number, columna: number) {
        super(new Tipo(tipoDato.NULO, true), linea, columna);
        this.id = id;
    }

    interpretar(arbol: any, tabla: TablaSimbolos) {

        const simbolo = tabla.getVariable(this.id);

        if (simbolo == null) {
            return new Errores(
                "Semantico",
                `Variable ${this.id} no existe`,
                this.linea,
                this.col 
            );
        }

        this.tipo = simbolo.tipo;
        return simbolo.valor;
    }
}