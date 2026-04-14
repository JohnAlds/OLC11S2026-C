import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoInstruccion } from "../Simbolo/tipoInstruccion";
import { tipoDato } from "../Simbolo/tipoDato";
import { Errores } from "../Excepciones/Errores";
import { Continue } from "./Continue";
import { Node } from "../Abstract/Node"
import { Arbol } from "../Simbolo/Arbol";

export class If extends Instruccion {
    private condicion: Instruccion;
    private bloqueIf: Instruccion;
    private bloqueElse: Instruccion | null;

    constructor(
        condicion: Instruccion,
        bloqueIf: Instruccion,
        bloqueElse: Instruccion | null,
        linea: number,
        columna: number
    ) {
        super(new Tipo(tipoInstruccion.IF, false), linea, columna);
        this.condicion = condicion;
        this.bloqueIf = bloqueIf;
        this.bloqueElse = bloqueElse;
    }

    interpretar(arbol: any, tabla: TablaSimbolos): any {
        const resultadoCondicion = this.condicion.interpretar(arbol, tabla);
        if (resultadoCondicion instanceof Errores) return resultadoCondicion;

        if (this.condicion.tipo.tipoDato !== tipoDato.BOOLEANO) {
            return new Errores(
                "Semantico",
                "La condicion del if debe ser booleana",
                this.linea,
                this.col
            );
        }

        if (resultadoCondicion) {
            const resultadoIf = this.bloqueIf.interpretar(arbol, tabla);
            if (resultadoIf instanceof Errores) return resultadoIf;
            if (resultadoIf instanceof Continue) return resultadoIf;
            return null;
        }

        if (this.bloqueElse != null) {
            const resultadoElse = this.bloqueElse.interpretar(arbol, tabla);
            if (resultadoElse instanceof Errores) return resultadoElse;
            if (resultadoElse instanceof Continue) return resultadoElse;
        }

        return null;
    }

    public ast(arbol: Arbol, tabla: TablaSimbolos): Node {
            
        let node = new Node("");
        return node;
    }
}