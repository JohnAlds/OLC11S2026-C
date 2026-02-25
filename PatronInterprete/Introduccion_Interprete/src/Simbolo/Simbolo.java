/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Simbolo;

/**
 *
 * @author JohnAlds
 */
public class Simbolo {
    private Tipo tipo;
    private String id;
    private Object valor;
    private int linea, columna;
    
    // Constructores (corrige el tercero)
    public Simbolo(Tipo tipo, String id) {
        this.tipo = tipo;
        this.id = id;
    }

    public Simbolo(Tipo tipo, String id, Object valor) {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
    }
    
    public Simbolo(Tipo tipo, String id, Object valor, int linea, int columna) {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
        this.linea = linea;   // ¡Estaba faltando!
        this.columna = columna;
    }
    
    // Getters
    public Tipo getTipo() {
        return tipo;
    }
    
    public String getId() {
        return id;
    }
    
    public Object getValor() {
        return valor;
    }
    
    public int getLinea() {
        return linea;
    }
    
    public int getColumna() {
        return columna;
    }
}