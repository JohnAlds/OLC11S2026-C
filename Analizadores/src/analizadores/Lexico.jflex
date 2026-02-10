package analizadores;
import java_cup.runtime.*;
import java.util.LinkedList;
%%

//Directrices
%class Lexico
%public
%line
%char
%cup
%unicode
%ignorecase

%{
    LinkedList<String> listaErrores = new LinkedList<>();

%}

%init{
    yyline = 1;
    yychar = 1;
%init}

// ================= EXPRESIONES REGULARES =================
D       = [0-9]+
DD      = [0-9]+("."[0-9]+)?
ID

%%

// ================= PALABRAS RESERVADAS =================
"Evaluar" {
    System.out.println("Palabra reservada reconocida: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.REVALUAR, yyline, (int) yychar, yytext());
}

// ================= SÍMBOLOS =================
";" {
    System.out.println("Simbolo reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.PTCOMA, yyline, (int) yychar, yytext());
}

"(" {
    System.out.println("Simbolo reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.PARIZQ, yyline, (int) yychar, yytext());
}

")" {
    System.out.println("Simbolo reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.PARDER, yyline, (int) yychar, yytext());
}

"[" {
    System.out.println("Simbolo reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.CORIZQ, yyline, (int) yychar, yytext());
}

"]" {
    System.out.println("Simbolo reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.CORDER, yyline, (int) yychar, yytext());
}

// ================= OPERADORES =================
"+" {
    System.out.println("Operador reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.MAS, yyline, (int) yychar, yytext());
}

"-" {
    System.out.println("Operador reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.MENOS, yyline, (int) yychar, yytext());
}

"*" {
    System.out.println("Operador reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.POR, yyline, (int) yychar, yytext());
}

"/" {
    System.out.println("Operador reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.DIVIDIDO, yyline, (int) yychar, yytext());
}

// ================= NÚMEROS =================
{DD} {
    System.out.println("Token reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.DECIMAL, yyline, (int) yychar, yytext());
}

{D} {
    System.out.println("Token reconocido: " + yyline + (int) yychar + yytext());
    return new Symbol(sym.ENTERO, yyline, (int) yychar, yytext());
}



[\t\r\n\f ]          { }

. {
    //listaErrores.add(Error);
    System.out.println(
        "Error Léxico: " + yytext() +
        " en línea: " + yyline +
        " columna: " + yychar
    );
}


