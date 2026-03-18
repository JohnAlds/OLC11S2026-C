export class Errores {

    private _tipo: string
    private _desc: string
    private _linea: number
    private _columna: number

    constructor(tipo: string, desc: string, linea: number, columna: number) {
        this._tipo = tipo
        this._desc = desc
        this._linea = linea
        this._columna = columna
    }

    // getter y setter tipo
    get tipo(): string {
        return this._tipo
    }

    set tipo(tipo: string) {
        this._tipo = tipo
    }

    // getter y setter descripcion
    get desc(): string {
        return this._desc
    }

    set desc(desc: string) {
        this._desc = desc
    }

    // getter y setter linea
    get linea(): number {
        return this._linea
    }

    set linea(linea: number) {
        this._linea = linea
    }

    // getter y setter columna
    get columna(): number {
        return this._columna
    }

    set columna(columna: number) {
        this._columna = columna
    }

    toString(): string {
        return `Errores{tipo=${this._tipo}, desc=${this._desc}, linea=${this._linea}, columna=${this._columna}}`
    }

}