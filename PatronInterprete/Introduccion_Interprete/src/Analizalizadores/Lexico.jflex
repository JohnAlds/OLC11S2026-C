
package analizalizadores;

import java_cup.runtime.Symbol;
import java.util.LinkedList;

%%

// ================= DIRECTRICES =================
%class Lexico
%public
%line
%column
%cup
%unicode
%ignorecase

%{

    LinkedList<String> listaErrores = new LinkedList<>();

    private void imprimir(String token){
        System.out.println(
            "Token: " + token +
            " | Lexema: '" + yytext() + "'" +
            " | Linea: " + (yyline + 1) +
            " | Columna: " + (yycolumn + 1)
        );
    }

%}

%init{
    yyline = 0;
    yycolumn = 0;
%init}

// ================= EXPRESIONES REGULARES =================
D       = [0-9]+
DD      = [0-9]+("."[0-9]+)?
comentario1 = "//".*
comentario2 = "/*"[^"\""]+"*/"
ID = [a-zA-Z][a-zA-Z0-9_]*  
CADENA = \"([^\"\\]|\\[btnfr\"\'\\])*\" 

%%

// ================= PALABRAS RESERVADAS =================
"database" {
    imprimir("DATABASE");
    return new Symbol(sym.DATABASE, yyline+1, yycolumn+1, yytext());
}


"store" {
    imprimir("STORE");
    return new Symbol(sym.STORE, yyline+1, yycolumn+1, yytext());
}


"at" {
    imprimir("AT");
    return new Symbol(sym.AT, yyline+1, yycolumn+1, yytext());
}

"use" {
    imprimir("USE");
    return new Symbol(sym.USE, yyline+1, yycolumn+1, yytext());
}

"use" {
    imprimir("USE");
    return new Symbol(sym.USE, yyline+1, yycolumn+1, yytext());
}

"table" {
    imprimir("TABLE");
    return new Symbol(sym.TABLE, yyline+1, yycolumn+1, yytext());
}

"double" {
    imprimir("RDOUBLE");
    return new Symbol(sym.RDOUBLE, yyline+1, yycolumn+1, yytext());
}

"string" {
    imprimir("RSTRING");
    return new Symbol(sym.RSTRING, yyline+1, yycolumn+1, yytext());
}

"int" {
    imprimir("RINT");
    return new Symbol(sym.RINT, yyline+1, yycolumn+1, yytext());
}


// ================= SÍMBOLOS =================
";" {
    imprimir("PTCOMA");
    return new Symbol(sym.PTCOMA, yyline+1, yycolumn+1, yytext());
}

":" {
    imprimir("DOSPT");
    return new Symbol(sym.DOSPT, yyline+1, yycolumn+1, yytext());
}

"(" {
    imprimir("PARIZQ");
    return new Symbol(sym.PARIZQ, yyline+1, yycolumn+1, yytext());
}

")" {
    imprimir("PARDER");
    return new Symbol(sym.PARDER, yyline+1, yycolumn+1, yytext());
}

"[" {
    imprimir("CORIZQ");
    return new Symbol(sym.CORIZQ, yyline+1, yycolumn+1, yytext());
}

"]" {
    imprimir("CORDER");
    return new Symbol(sym.CORDER, yyline+1, yycolumn+1, yytext());
}

"{" {
    imprimir("LLAVEIZQ");
    return new Symbol(sym.LLAVEIZQ, yyline+1, yycolumn+1, yytext());
}

"}" {
    imprimir("LLAVEDER");
    return new Symbol(sym.LLAVEDER, yyline+1, yycolumn+1, yytext());
}

// ================= OPERADORES =================
"+" {
    imprimir("MAS");
    return new Symbol(sym.MAS, yyline+1, yycolumn+1, yytext());
}

"-" {
    imprimir("MENOS");
    return new Symbol(sym.MENOS, yyline+1, yycolumn+1, yytext());
}

"*" {
    imprimir("POR");
    return new Symbol(sym.POR, yyline+1, yycolumn+1, yytext());
}

"/" {
    imprimir("DIVIDIDO");
    return new Symbol(sym.DIVIDIDO, yyline+1, yycolumn+1, yytext());
}


// ================= COMENTARIOS =================
{comentario1} {
    imprimir("COMENTARIO1");
}

{comentario2} {
    imprimir("COMENTARIO2");
}

// ================ ID =====================
{ID} {
    imprimir("IDENTIFICADOR");
    return new Symbol(sym.IDENTIFICADOR, yyline+1, yycolumn+1, yytext());
}


// ================ DATOS =====================
{CADENA} {
    imprimir("CADENA");
    return new Symbol(sym.CADENA, yyline+1, yycolumn+1, yytext());
}

{DD} {
    imprimir("DECIMAL");
    return new Symbol(sym.DECIMAL, yyline+1, yycolumn+1, yytext());
}

{D} {
    imprimir("ENTERO");
    return new Symbol(sym.ENTERO, yyline+1, yycolumn+1, yytext());
}



// ================= ESPACIOS =================
[\t\r\n\f ]   { /* ignorar */ }



// ================= ERRORES =================
. {
    String error = 
        "ERROR LÉXICO -> '" + yytext() +
        "' Línea: " + (yyline + 1) +
        " Columna: " + (yycolumn + 1);   
}
