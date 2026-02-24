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

/**
 *
 * @author JohnAlds
 */
public class Database extends Instruccion{

    private String idDataBase;
    private String ruta;
    
    public Database(String idDataBase, String ruta, int linea, int col) {
        super(new Tipo(tipoDato.DATABASE), linea, col);
        this.idDataBase = idDataBase;
        this.ruta = ruta;
        
    }

    @Override
    public Object interpretar(Arbol arbol, tablaSimbolos tabla) {
        
        if(tabla.getTablaActual().containsKey(this.idDataBase)){
            System.out.println("Error base de datos ya existe");
            return null;
        }
        
        tabla.addDB(this.idDataBase, this.ruta, linea, col);
        
        return null;
    }
    
}
