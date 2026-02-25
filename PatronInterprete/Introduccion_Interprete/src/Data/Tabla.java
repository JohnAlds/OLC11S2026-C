package Data;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author JohnAlds
 */
public class Tabla {
    private String nombre;
    private Map<String, String> schema; 
    private List<Map<String, Object>> registros;

    public Tabla(String nombre) {
        this.nombre = nombre;
        this.schema = new LinkedHashMap<>();
        this.registros = new ArrayList<>();
    }

    public void addCampo(String campo, String tipo) {
        schema.put(campo, tipo);
    }

    public void insert(Map<String, Object> registro) {
        registros.add(registro);
    }

    public List<Map<String, Object>> getRegistros() {
        return registros;
    }

    public Map<String, String> getSchema() {
        return schema;
    }

    public String getNombre() {
        return nombre;
    }
    
    
    
}