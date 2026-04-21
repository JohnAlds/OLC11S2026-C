import { Instruccion } from "../Abstract/Instruccion";
import { Node } from "../Abstract/Node";
import { Errores } from "../Excepciones/Errores";
import { Simbolo } from "../Simbolo/Simbolo";
import { TablaSimbolos } from "../Simbolo/TablaSimbolos";
import { Tipo } from "../Simbolo/Tipo";
import { tipoDato } from "../Simbolo/tipoDato";
import { tipoInstruccion } from "../Simbolo/tipoInstruccion";

export class DeclaracionMatriz extends Instruccion {

    private tipoDeclarado: Tipo;
    private id: string;
    private valor: Instruccion | null;

    constructor(tipo: Tipo, id: string, valor: Instruccion | null, linea: number, columna: number) {
        super(new Tipo(tipoInstruccion.DECLARACION_MATRIZ, false), linea, columna);
        this.tipoDeclarado = tipo;
        this.id = id;
        this.valor = valor;
    }

    private convertirMatrizEnterosADecimales(matriz: any): any {
        if (!Array.isArray(matriz)) {
            return Number(matriz);
        }
        return matriz.map(item => this.convertirMatrizEnterosADecimales(item));
    }

    interpretar(arbol: any, tabla: TablaSimbolos): Errores | null {
        let resultado: any = null;

        if (this.valor !== null) {
            resultado = this.valor.interpretar(arbol, tabla);
            if (resultado instanceof Errores) return resultado;

            const tipoValor = this.valor.tipo.tipoDato;
            const dimsValor = this.valor.tipo.dimensiones;

            const mismoTipo =
                tipoValor === this.tipoDeclarado.tipoDato &&
                dimsValor === this.tipoDeclarado.dimensiones;

            const intToDouble =
                this.tipoDeclarado.tipoDato === tipoDato.DECIMAL &&
                tipoValor === tipoDato.ENTERO &&
                dimsValor === this.tipoDeclarado.dimensiones;

            if (!mismoTipo && !intToDouble) {
                return new Errores(
                    "Semantico",
                    `La matriz ${this.id} no coincide con el tipo declarado`,
                    this.linea,
                    this.col
                );
            }

            if (intToDouble) {
                resultado = this.convertirMatrizEnterosADecimales(resultado);
            }
        }

        const simbolo = new Simbolo(
            new Tipo(this.tipoDeclarado.tipoDato as tipoDato, true, this.tipoDeclarado.dimensiones),
            this.id,
            resultado,
            this.linea,
            this.col,
            "Global"
        );

        const resp = tabla.setVariable(simbolo);
        if (resp instanceof Errores) return resp;

        return null;
    }

    public ast(arbol: any, tabla: TablaSimbolos): Node {
        const node = new Node("DECLARACION_MATRIZ");
        const tipoTxt = `${tipoDato[this.tipoDeclarado.tipoDato as tipoDato]}${"[]".repeat(this.tipoDeclarado.dimensiones)}`;

        node.pushChild(new Node(tipoTxt));
        node.pushChild(new Node(this.id));

        if (this.valor !== null) {
            node.pushChild(this.valor.ast(arbol, tabla));
        }

        return node;
    }
}