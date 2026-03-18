import { tipoInstruccion } from "./tipoInstruccion";
import { tipoDato } from "./tipoDato";

export class Tipo {

    private _tipo?: tipoInstruccion
    private _dato?: tipoDato

    constructor(valor: tipoInstruccion | tipoDato, esDato: boolean = true) {
        if (esDato) {
            this._dato = valor as tipoDato
        } else {
            this._tipo = valor as tipoInstruccion
        }
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

}