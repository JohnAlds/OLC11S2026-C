import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoInstruccion } from "../Simbolo/tipoInstruccion";
import { Errores } from "../Excepciones/Errores";

export class Bloque extends Instruccion {
    private instrucciones: Instruccion[];

    constructor(instrucciones: Instruccion[], linea: number, columna: number) {
        super(new Tipo(tipoInstruccion.BLOQUE, false), linea, columna);
        this.instrucciones = instrucciones;
    }

    interpretar(arbol: any, tabla: TablaSimbolos) {
        const nuevaTabla = new TablaSimbolos(tabla);

        for (const instruccion of this.instrucciones) {
            const resultado = instruccion.interpretar(arbol, nuevaTabla);

            if (resultado instanceof Errores) {
                return resultado;
            }
        }

        return null;
    }
}