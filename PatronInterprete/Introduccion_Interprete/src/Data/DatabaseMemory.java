package Data;


import java.util.HashMap;
import java.util.Map;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author JohnAlds
 */
public class DatabaseMemory {
    private String nombre;
    private Map<String, Tabla> tablas;
    private String ruta;

    public DatabaseMemory(String nombre, String ruta) {
        this.nombre = nombre;
        this.tablas = new HashMap<>();
        this.ruta = ruta;
    }

    public void addTabla(Tabla tabla) {
        tablas.put(tabla.getNombre(), tabla);
    }

    public Tabla getTabla(String nombre) {
        return tablas.get(nombre);
    }

    public Map<String, Tabla> getTablas() {
        return tablas;
    }
}