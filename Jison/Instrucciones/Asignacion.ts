import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoInstruccion } from "../Simbolo/tipoInstruccion";
import { Errores } from "../Excepciones/Errores";
import { tipoDato } from "../Simbolo/tipoDato";
import { Node } from "../Abstract/Node"
import { Arbol } from "../Simbolo/Arbol";

export class Asignacion extends Instruccion {
    private id: string;
    private valor: Instruccion;

    constructor(id: string, valor: Instruccion, linea: number, columna: number) {
        super(new Tipo(tipoInstruccion.ASIGNACION, false), linea, columna);
        this.id = id;
        this.valor = valor;
    }

    interpretar(arbol: any, tabla: TablaSimbolos): any {
        const simbolo = tabla.getVariable(this.id);

        if (!simbolo) {
            return new Errores(
                "Semantico",
                `La variable ${this.id} no existe`,
                this.linea,
                this.col
            );
        }

        const nuevoValor = this.valor.interpretar(arbol, tabla);
        if (nuevoValor instanceof Errores) return nuevoValor;

        const tipoVariable = simbolo.tipo.tipoDato;
        const tipoNuevo = this.valor.tipo.tipoDato;

        const esIntToFloat =
            tipoVariable === tipoDato.DECIMAL && tipoNuevo === tipoDato.ENTERO;

        if (tipoVariable !== tipoNuevo && !esIntToFloat) {
            return new Errores(
                "Semantico",
                `No se puede asignar un valor de tipo distinto a ${this.id}`,
                this.linea,
                this.col
            );
        }

        simbolo.valor = esIntToFloat ? Number(nuevoValor) : nuevoValor;
        return null;
    }

    public ast(arbol: Arbol, tabla: TablaSimbolos): Node {
            
        let node = new Node("");
        return node;
    }
}