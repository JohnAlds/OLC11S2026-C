/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Instrucciones;

import Abstract.Instruccion;
import Simbolo.Arbol;
import Simbolo.Tipo;
import Simbolo.tablaSimbolos;
import Simbolo.tipoDato;
import java.util.HashMap;

/**
 *
 * @author JohnAlds
 */

// Variable global String dbDeafault = "";

public class CreateTable extends Instruccion{
    
    private String idTable;
    private HashMap<String, String> schema;


    public CreateTable(String idTable, HashMap<String, String> schema, int linea, int col) {
        super(new Tipo(tipoDato.CREATETABLE), linea, col);
        this.idTable = idTable;  
        this.schema = schema;
    }

    @Override
    public Object interpretar(Arbol arbol, tablaSimbolos tabla) {
        
        
        
        
        return null;
        
    }
    
    
}
