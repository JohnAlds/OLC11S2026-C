/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Instrucciones;

import Abstract.Instruccion;
import Simbolo.Arbol;
import Simbolo.Tipo;
import Simbolo.tablaSimbolos;
import Simbolo.tipoInstruccion;

/**
 *
 * @author JohnAlds
 */
public class UseDatabase extends Instruccion {
    
    private String id;

    public UseDatabase(String id, int linea, int col) {
        super(new Tipo(tipoInstruccion.USEDATABASE), linea, col);
        this.id = id;
    }

    @Override
    public Object interpretar(Arbol arbol, tablaSimbolos tabla) {
        
        if(!tabla.getTablaActual().containsKey(this.id)){
            System.out.println("Error base de datos no  existe");
            return null;
        }
        
        tabla.setUseDatabase(id);
        
        return null;
    }
    
}
