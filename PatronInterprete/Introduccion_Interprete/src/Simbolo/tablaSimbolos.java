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
    private String useDatabase;
    
    public tablaSimbolos() {
        this.tablaActual = new HashMap<>();
        this.useDatabase = "";
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
        tablaActual.put(id, new Simbolo(new Tipo(tipoInstruccion.DATABASE), id, nuevaBase, linea, columna));
    }
    
    public DatabaseMemory getDB(String id) {
        Simbolo simbolo = (Simbolo) tablaActual.get(id);
        if (simbolo == null) {
            System.out.println("Base de datos '" + id + "' no encontrada.");
            return null;
        }
        if (simbolo.getTipo().getTipo() != tipoInstruccion.DATABASE) {
            System.out.println("El identificador '" + id + "' no es una base de datos.");
            return null;
        }
        return (DatabaseMemory) simbolo.getValor();
    }

    public void setUseDatabase(String useDatabase) {
        this.useDatabase = useDatabase;
    }
    
    public String getUseDatabase(){
        return this.useDatabase;
    }
}