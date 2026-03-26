%{
// Instrucciones
const Print = require("../Instrucciones/Print").Print;
const Declaracion = require("../Instrucciones/Declaracion").Declaracion;
const Bloque = require("../Instrucciones/Bloque").Bloque;


// Expresiones
const Suma = require("../Expresiones/Suma").Suma;
const Resta = require("../Expresiones/Resta").Resta;
const Multiplicacion = require("../Expresiones/Multiplicacion").Multiplicacion;
const Division = require("../Expresiones/Division").Division;
const Nativo = require("../Expresiones/Nativo").Nativo;
const Identificador = require("../Expresiones/Identificador").Identificador;


// Importaciones terceras
const Tipo = require("../Simbolo/Tipo").Tipo;
const tipoDato = require("../Simbolo/tipoDato").tipoDato;
const OperadoresAritmeticos = require("../Expresiones/OperadoresAritmeticos").OperadoresAritmeticos;


%}

%lex

%%

"print"                     return 'PRINT';
"int"                       return 'INT_TYPE';
"double"                    return 'DOUBLE_TYPE';
"string"                    return 'STRING_TYPE';

"("                         return 'LPAREN';
")"                         return 'RPAREN';
";"                         return 'SEMICOLON';
"="                         return 'IGUAL';

"+"                         return 'MAS';
"-"                         return 'MENOS';
"*"                         return 'POR';
"/"                         return 'DIV';


"{" return 'LBRACE';
"}" return 'RBRACE';

[0-9]+"."[0-9]+             return 'DECIMAL';
[0-9]+                      return 'INT';

\"([^\"\\]|\\[btnfr\"\'\\])*\"    return 'CADENA';

[a-zA-Z_][a-zA-Z0-9_]*      return 'ID';


[ \t\r\n]+                  /* ignorar espacios */

<<EOF>>                     return 'EOF';

.                           return 'INVALIDO';

/lex

%left MAS MENOS
%left POR DIV

%start START

%%

START
    : INSTRUCCIONES EOF
        {
            return $1;
        }
;

INSTRUCCIONES
    : INSTRUCCIONES INSTRUCCION
        {
            $1.push($2);
            $$ = $1;
        }

    | INSTRUCCION
        {
            $$ = [];
            $$.push($1);
        }
;

INSTRUCCION
    : TIPO ID IGUAL EXPRESION SEMICOLON
        {
            $$ = new Declaracion(
                $1,
                $2,
                $4,
                @1.first_line,
                @1.first_column
            );
        }
    | PRINT LPAREN EXPRESION RPAREN SEMICOLON
        {
            $$ = new Print(
                $3,
                @1.first_line,
                @1.first_column
            );
        }
    
    | BLOQUE
        {
            $$ = $1;
        }
;

BLOQUE
    : LBRACE INSTRUCCIONES RBRACE
        {
            $$ = new Bloque($2, @1.first_line, @1.first_column);
        }
;

EXPRESION

    : EXPRESION MAS EXPRESION
        {
            $$ = new Suma(
                $1,
                $3,
                OperadoresAritmeticos.SUMA,
                @1.first_line,
                @1.first_column
            );
        }

    | EXPRESION MENOS EXPRESION
        {
            $$ = new Resta(
                $1,
                $3,
                OperadoresAritmeticos.RESTA,
                @1.first_line,
                @1.first_column
            );
        }

    | EXPRESION POR EXPRESION
        {
            $$ = new Multiplicacion(
                $1,
                $3,
                OperadoresAritmeticos.MULTIPLICACION,
                @1.first_line,
                @1.first_column
            );
        }

    | EXPRESION DIV EXPRESION
        {
            $$ = new Division(
                $1,
                $3,
                OperadoresAritmeticos.DIVISION,
                @1.first_line,
                @1.first_column
            );
        }

    | INT
        {
            $$ = new Nativo(
                Number(yytext),
                new Tipo(tipoDato.ENTERO, true),
                @1.first_line,
                @1.first_column
            );
        }

    | DECIMAL
        {
            $$ = new Nativo(
                Number(yytext),
                new Tipo(tipoDato.DECIMAL, true),
                @1.first_line,
                @1.first_column
            );
        }

    | CADENA
        {
            $$ = new Nativo(
                yytext.substring(1, yytext.length - 1),
                new Tipo(tipoDato.CADENA, true),
                @1.first_line,
                @1.first_column
            );
        }
    | LPAREN EXPRESION RPAREN
        {
            $$ = $2;
        }
        
    | ID
    {
        $$ = new Identificador(
            yytext,
            @1.first_line,
            @1.first_column
        );
    }
;

TIPO
    : INT_TYPE
        {
            $$ = tipoDato.ENTERO;
        }
    | DOUBLE_TYPE
        {
            $$ = tipoDato.DECIMAL;
        }
    | STRING_TYPE
        {
            $$ = tipoDato.CADENA;
        }
;

%%