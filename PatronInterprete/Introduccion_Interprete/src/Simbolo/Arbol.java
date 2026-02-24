/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Simbolo;

import Abstract.Instruccion;
import Excepciones.Errores;
import java.util.HashMap;
import java.util.LinkedList;

/**
 *
 * @author JohnAlds
 */
public class Arbol {

    private LinkedList<Instruccion> instrucciones;
    private String consola;
    private tablaSimbolos tablaGlobal;
    private LinkedList<Errores> errores;
    private LinkedList<Simbolo> simbolos;
    private LinkedList<Instruccion> funciones;
    private HashMap<String, Object> tablaActualStructs;
    public int contador;

    public Arbol(LinkedList<Instruccion> instrucciones) {
        this.instrucciones = instrucciones;
        this.consola = "";
        this.tablaGlobal = new tablaSimbolos();
        this.errores = new LinkedList<>();
        this.funciones = new LinkedList<>();
        this.tablaActualStructs = new HashMap<>();
    }

    public LinkedList<Instruccion> getInstrucciones() {
        return instrucciones;
    }

    public void setInstrucciones(LinkedList<Instruccion> instrucciones) {
        this.instrucciones = instrucciones;
    }

    public LinkedList<Simbolo> getSimbolos() {
        return simbolos;
    }

    public void setSimbolos(LinkedList<Simbolo> simbolos) {
        this.simbolos = simbolos;
    }

    public String getConsola() {
        return consola;
    }

    public void setConsola(String consola) {
        this.consola = consola;
    }
    
    

    public tablaSimbolos getTablaGlobal() {
        return tablaGlobal;
    }

    public void setTablaGlobal(tablaSimbolos tablaGlobal) {
        this.tablaGlobal = tablaGlobal;
    }

    public LinkedList<Errores> getErrores() {
        return errores;
    }

    public void setErrores(LinkedList<Errores> errores) {
        this.errores = errores;
    }

    public void Print(String valor) {
        this.consola += valor + "\n";
    }
    
   
    public int getContador() {
        this.contador++;
        return this.contador;

    }
    
    
}