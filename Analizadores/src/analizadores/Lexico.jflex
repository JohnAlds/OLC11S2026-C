package analizadores;

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

%%

// ================= PALABRAS RESERVADAS =================
"Evaluar" {
    imprimir("REVALUAR");
    return new Symbol(sym.REVALUAR, yyline+1, yycolumn+1, yytext());
}

// ================= SÍMBOLOS =================
";" {
    imprimir("PTCOMA");
    return new Symbol(sym.PTCOMA, yyline+1, yycolumn+1, yytext());
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

// ================= NÚMEROS =================
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
