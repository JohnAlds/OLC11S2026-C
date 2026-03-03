/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Simbolo;

/**
 *
 * @author JohnAlds
 */
public class Tipo {
    private tipoInstruccion tipo;
    private tipoDato dato;

    public Tipo(tipoInstruccion tipo) {
        this.tipo = tipo;
    }
    
    public Tipo(tipoDato dato) {
        this.dato = dato;
    }

    public tipoInstruccion getTipo() {
        return tipo;
    }

    public void setTipo(tipoInstruccion tipo) {
        this.tipo = tipo;
    }
    
    
    public tipoDato getTipoDato() {
        return dato;
    }

    public void setTipoDato(tipoDato dato) {
        this.dato = dato;
    }
    
    
}
