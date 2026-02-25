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
    
    public boolean existTabla(String nombre){
        return tablas.containsKey(nombre);
    }

    public Map<String, Tabla> getTablas() {
        return tablas;
    }
    
     public void createTable(String nombreTabla, Map<String, String> schema) {
        // Crear la nueva tabla
        Tabla nuevaTabla = new Tabla(nombreTabla);

        // Agregar cada campo definido en el esquema
        for (Map.Entry<String, String> campo : schema.entrySet()) {
            nuevaTabla.addCampo(campo.getKey(), campo.getValue());
        }

        // Guardar la tabla en el mapa de tablas
        addTabla(nuevaTabla);
    }
}