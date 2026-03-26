import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Simbolo } from "../Simbolo/Simbolo";
import { Tipo } from "../Simbolo/Tipo";
import { Errores } from "../Excepciones/Errores";
import { tipoInstruccion } from "../Simbolo/tipoInstruccion";

export class Declaracion extends Instruccion {

    tipoDeclarado: any;
    id: string;
    valor: any;

    constructor(tipo: any, id: string, valor: any, linea: number, columna: number) {
        super(new Tipo(tipoInstruccion.DECLARACION, false), linea, columna);
        this.tipoDeclarado = tipo;
        this.id = id;
        this.valor = valor;
    }

    interpretar(arbol: any, tabla: TablaSimbolos): Errores | null {

        const resultado = this.valor.interpretar(arbol, tabla);

        if (resultado instanceof Errores) {
            return resultado;
        }

        const simbolo = new Simbolo(
            new Tipo(this.tipoDeclarado, true),
            this.id,
            resultado,
            this.linea,
            this.col, 
            "Global"
        );

        tabla.setVariable(simbolo);
        return null;
    }
}