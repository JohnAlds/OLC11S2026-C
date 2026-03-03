/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package introduccion_interprete;

/**
 *
 * @author JohnAlds
 */
public class Introduccion_Interprete {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        
        Analizar a = new Analizar();
        
        String texto = """
            database universidad { 
                store at "archivo.json"; 
            } 
             &&&&&&&
            use universidad; 
                       
            table estudiantes { 
                id : int; 
                nombre : string; 
                edad : int; 
            } 
            
            3+3+3
                       !!!! $$$%
        """;
        
        
        a.analizar(texto);
    }
    
}
