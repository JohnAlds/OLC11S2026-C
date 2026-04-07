import { Simbolo } from "./Simbolo"
import { Errores } from "../Excepciones/Errores"
import { Node } from "../Abstract/Node"

export class TablaSimbolos {

    private tabla: Map<string, Simbolo>
    public anterior?: TablaSimbolos

    constructor(anterior?: TablaSimbolos) {
        this.tabla = new Map()
        this.anterior = anterior
    }

    setVariable(simbolo: Simbolo): Errores | null {

        if (this.tabla.has(simbolo.id)) {
            return new Errores(
                "Semantico",
                `La variable ${simbolo.id} ya existe`,
                simbolo.linea,
                simbolo.columna
            )
        }

        this.tabla.set(simbolo.id, simbolo)
        return null
    }

    getVariable(id: string): Simbolo | null {

        let tablaActual: TablaSimbolos | undefined = this

        while (tablaActual != undefined) {

            const simbolo = tablaActual.tabla.get(id)

            if (simbolo != undefined) {
                return simbolo
            }

            tablaActual = tablaActual.anterior
        }

        return null
    }

    getValueasNode(id: string): Node | null {

        let tablaActual: TablaSimbolos | undefined = this
        //console.log(tablaActual.tabla);

        while (tablaActual != undefined) {

            const simbolo = tablaActual.tabla.get(id)

            if (simbolo != undefined) {
                let node = new Node(id);
                node.pushChild(new Node(simbolo.valor.toString()));
                return node;
            }
            tablaActual = tablaActual.anterior
        }

        return null
    }

}