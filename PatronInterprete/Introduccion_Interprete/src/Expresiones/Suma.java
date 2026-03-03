/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Expresiones;

import Abstract.Instruccion;
import Simbolo.Arbol;
import Simbolo.Tipo;
import Simbolo.tablaSimbolos;
import Simbolo.tipoDato;

/**
 *
 * @author JohnAlds
 */
public class Suma extends Instruccion {
    
    private Instruccion operando1;
    private Instruccion operando2;
    private OperadoresAritmeticos operacion;
    

    public Suma(Instruccion operando1, Instruccion operando2, OperadoresAritmeticos operacion, int linea, int col) {
        super(new Tipo(tipoDato.ENTERO), linea, col);
        this.operando1 = operando1;
        this.operando2 = operando2;
        this.operacion = operacion;
        
    }

    @Override
    public Object interpretar(Arbol arbol, tablaSimbolos tabla) {
        
        Object opIzq = null, opDer = null;
        
        opIzq = this.operando1.interpretar(arbol, tabla);
        opDer = this.operando2.interpretar(arbol, tabla);
        
        return switch (operacion){
            case SUMA ->
                this.suma(opIzq, opDer);
            default -> throw new IllegalStateException("Unexpected value: " + (operacion));
        };
        
       
    }
    
    public Object suma(Object op1, Object op2){
        
        var tipo1 = this.operando1.tipo.getTipoDato();
        var tipo2 = this.operando2.tipo.getTipoDato();
        
        switch (tipo1){
            //Si el tipo del operador izquierdo es ENTERO
            case ENTERO -> {
                //Aqui inician las combinaciones validas para ENTERO + otros datos
                switch (tipo2){
                    //ENTERO + ENTERO
                    case ENTERO ->{
                        this.tipo.setTipoDato(tipoDato.ENTERO);
                        System.out.println((int)op1 + (int)op2);
                        return (int)op1 + (int)op2;
                    }
                    //ENTERO + DECIMAL
                    case DECIMAL ->{
                        this.tipo.setTipoDato(tipoDato.DECIMAL);
                        return ((Integer) op1).doubleValue() + (Double) op2;
                    }
                    //ENTERO + CADENA
                    case CADENA ->{
                        this.tipo.setTipoDato(tipoDato.CADENA);
                        return String.valueOf((int)op1) + op2;
                    }
             
                }
            }
            //Si el tipo del operador izquierdo es DECIMAL
            case DECIMAL ->{
                //Aqui inician las combinaciones validas para DECIMAL + otros datos
                switch (tipo2){
                    //DECIMAL + ENTERO
                    case ENTERO ->{
                        this.tipo.setTipoDato(tipoDato.DECIMAL);
                        return (Double) op1 + ((Integer) op2).doubleValue();
                    }
                    //DECIMAL + DECIMAL
                    case DECIMAL ->{
                        this.tipo.setTipoDato(tipoDato.DECIMAL);
                        
                        return (Double)op1 + (Double)op2;
                    }
                    //DECIMAL + CADENA
                    case CADENA ->{
                        this.tipo.setTipoDato(tipoDato.CADENA);
                        return String.valueOf(op1) + (String) op2;
                    }

                }
            }
            
           
            //Si el tipo del operador izquierdo es CADENA
            case CADENA ->{
                //Aqui inician las combinaciones validas para CADENA + otros datos
                switch (tipo2){
                    //CADENA + ENTERO
                    case ENTERO ->{
                        this.tipo.setTipoDato(tipoDato.CADENA);
                        return  op1 + String.valueOf((int)op2);
                    }
                    //CADENA + DECIMAL
                    case DECIMAL ->{
                        this.tipo.setTipoDato(tipoDato.CADENA);
                        return  (String) op1 + String.valueOf(op2);
                    }
                   
                  
                    //CADENA + CADENA
                    case CADENA ->{
                        this.tipo.setTipoDato(tipoDato.CADENA);
                        return (String)op1 + (String)op2;
                    }
                  
                }
            }
        }
        return null;
    }
    
}
