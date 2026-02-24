/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Simbolo;

import Data.DatabaseMemory;
import java.util.HashMap;

/**
 *
 * @author JohnAlds
 */
public class tablaSimbolos {
    private tablaSimbolos tablaAnterior;
    private HashMap<String, Object> tablaActual;
    
    public tablaSimbolos() {
        this.tablaActual = new HashMap<>();
    }
    
    public tablaSimbolos(tablaSimbolos tablaAnterior) {
        this.tablaAnterior = tablaAnterior;
        this.tablaActual = new HashMap<>();
    }
    
    public tablaSimbolos getTablaAnterior() {
        return tablaAnterior;
    }
    
    public void setTablaAnterior(tablaSimbolos tablaAnterior) {
        this.tablaAnterior = tablaAnterior;
    }
    
    public HashMap<String, Object> getTablaActual() {
        return tablaActual;
    }

    public void setTablaActual(HashMap<String, Object> tablaActual) {
        this.tablaActual = tablaActual;
    }
    
    
    public void add(String id, Tipo tipo, Object valor, int linea, int columna, String tip){
        this.tablaActual.put(id, new Simbolo(tipo, id, valor));
    }
    
    public void addDB(String id, String ruta, int linea, int columna){
        DatabaseMemory nuevaBase = new DatabaseMemory(id, ruta);
        tablaActual.put(id, new Simbolo(new Tipo(tipoDato.DATABASE), id, nuevaBase, linea, columna));
    }
}