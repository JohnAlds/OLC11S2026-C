/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package introduccion_interprete;

import Abstract.Instruccion;
import Simbolo.Arbol;
import Simbolo.tablaSimbolos;
import analizalizadores.Lexico;
import analizalizadores.Sintactico;
import java.io.BufferedReader;
import java.io.StringReader;
import java.util.LinkedList;

/**
 *
 * @author JohnAlds
 */
public class Analizar {
    public void analizar(String codigoFuente){
        try{
            Lexico s = new  Lexico(new BufferedReader( new StringReader(codigoFuente)));

            Sintactico p = new Sintactico(s);
            var resultado = p.parse();
            var ast = new Arbol((LinkedList<Instruccion>) resultado.value);
            var tabla = new tablaSimbolos();
           

            for (var a : ast.getInstrucciones()) {
                if (a == null) {
                    continue;
                }
                var res = a.interpretar(ast, tabla); 
            }
         

        }catch(Exception e){
            System.out.println(e.getMessage());
            System.out.println();
            e.printStackTrace();
        }
    }
}
