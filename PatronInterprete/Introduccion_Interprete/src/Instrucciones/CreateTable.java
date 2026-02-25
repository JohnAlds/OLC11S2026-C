/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Instrucciones;

import Abstract.Instruccion;
import Data.DatabaseMemory;
import Simbolo.Arbol;
import Simbolo.Tipo;
import Simbolo.tablaSimbolos;
import Simbolo.tipoInstruccion;
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
        super(new Tipo(tipoInstruccion.CREATETABLE), linea, col);
        this.idTable = idTable;  
        this.schema = schema;
    }

    @Override
    public Object interpretar(Arbol arbol, tablaSimbolos tabla) {
        DatabaseMemory db = tabla.getDB(tabla.getUseDatabase());
        
        if(db == null){
            System.out.println("Error al obtener base de datos.");
            return null;
        }
        
        if(db.existTabla(this.idTable)){
            System.out.println("Error, tabla ya existe.");
            return null;
        }
        
        db.createTable(this.idTable, this.schema);
        
        return null;
    }
    
    
}
