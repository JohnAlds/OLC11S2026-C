import { Instruccion } from "../Abstract/Instruccion";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoInstruccion } from "../Simbolo/tipoInstruccion";
import { tipoDato } from "../Simbolo/tipoDato";
import { Errores } from "../Excepciones/Errores";
import { Continue } from "./Continue";
import { Node } from "../Abstract/Node"
import { Arbol } from "../Simbolo/Arbol";

export class For extends Instruccion {
    private inicializacion: Instruccion;
    private condicion: Instruccion;
    private actualizacion: Instruccion;
    private cuerpo: Instruccion;

    constructor(
        inicializacion: Instruccion,
        condicion: Instruccion,
        actualizacion: Instruccion,
        cuerpo: Instruccion,
        linea: number,
        columna: number
    ) {
        super(new Tipo(tipoInstruccion.FOR, false), linea, columna);
        this.inicializacion = inicializacion;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.cuerpo = cuerpo;
    }

    interpretar(arbol: any, tabla: TablaSimbolos): any {
        const entornoFor = new TablaSimbolos(tabla);

        const init = this.inicializacion.interpretar(arbol, entornoFor);
        if (init instanceof Errores) return init;

        while (true) {
            const condicion = this.condicion.interpretar(arbol, entornoFor);
            if (condicion instanceof Errores) return condicion;

            if (this.condicion.tipo.tipoDato !== tipoDato.BOOLEANO) {
                return new Errores(
                    "Semantico",
                    "La condicion del for debe ser booleana",
                    this.linea,
                    this.col
                );
            }

            if (!condicion) break;

            const resultadoCuerpo = this.cuerpo.interpretar(arbol, entornoFor);

            if (resultadoCuerpo instanceof Errores) return resultadoCuerpo;

            if (resultadoCuerpo instanceof Continue) {
                const actContinue = this.actualizacion.interpretar(arbol, entornoFor);
                if (actContinue instanceof Errores) return actContinue;
                continue;
            }

            const act = this.actualizacion.interpretar(arbol, entornoFor);
            if (act instanceof Errores) return act;
        }

        return null;
    }
   
    public ast(arbol: Arbol, tabla: TablaSimbolos): Node {
            
        let node = new Node("");
        return node;
    }
}