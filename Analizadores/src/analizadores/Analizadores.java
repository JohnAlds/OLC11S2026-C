package analizadores;

import java.io.StringReader;

public class Analizadores {

    public static void main(String[] args) {
        try {
            String entrada = "Evaluar[5+3];";

            Lexico lexico = new Lexico(new StringReader(entrada));
            Sintactico parser = new Sintactico(lexico);

            parser.parse();  // 👈 Aquí se ejecuta todo

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
