import { Tipo } from "./Tipo";

export class Simbolo {

    public tipo: Tipo
    public id: string
    public valor: any
    public linea: number
    public columna: number
    public entorno: string
    
    constructor(
        tipo: Tipo,
        id: string,
        valor: any,
        linea: number,
        columna: number,
        entorno: string
    ) {
        this.tipo = tipo
        this.id = id
        this.valor = valor
        this.linea = linea
        this.columna = columna
        this.entorno = entorno
    }

}