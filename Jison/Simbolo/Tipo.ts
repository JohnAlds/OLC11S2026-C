import { tipoInstruccion } from "./tipoInstruccion";
import { tipoDato } from "./tipoDato";

export class Tipo {

    private _tipo?: tipoInstruccion
    private _dato?: tipoDato
    private _dimensiones: number

    constructor(valor: tipoInstruccion | tipoDato, esDato: boolean = true, dimensiones: number = 0) {
        if (esDato) {
            this._dato = valor as tipoDato
        } else {
            this._tipo = valor as tipoInstruccion
        }
        this._dimensiones = dimensiones
    }

    get tipo(): tipoInstruccion | undefined {
        return this._tipo
    }

    set tipo(valor: tipoInstruccion | undefined) {
        this._tipo = valor
    }

    get tipoDato(): tipoDato | undefined {
        return this._dato
    }

    set tipoDato(valor: tipoDato | undefined) {
        this._dato = valor
    }

    get dimensiones(): number {
        return this._dimensiones
    }

    set dimensiones(valor: number) {
        this._dimensiones = valor
    }
}