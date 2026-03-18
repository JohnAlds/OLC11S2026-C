%{

const Print = require("../Instrucciones/Print").Print;
const Suma = require("../Expresiones/Suma").Suma;
const Resta = require("../Expresiones/Resta").Resta;
const Multiplicacion = require("../Expresiones/Multiplicacion").Multiplicacion;
const Division = require("../Expresiones/Division").Division;
const Nativo = require("../Expresiones/Nativo").Nativo;

const Tipo = require("../Simbolo/Tipo").Tipo;
const tipoDato = require("../Simbolo/tipoDato").tipoDato;
const OperadoresAritmeticos = require("../Expresiones/OperadoresAritmeticos").OperadoresAritmeticos;


%}

%lex

%%

"print"                     return 'PRINT';
"("                         return 'LPAREN';
")"                         return 'RPAREN';
";"                         return 'SEMICOLON';

"+"                         return 'MAS';
"-"                         return 'MENOS';
"*"                         return 'POR';
"/"                         return 'DIV';

[0-9]+"."[0-9]+             return 'DECIMAL';
[0-9]+                      return 'INT';

\"([^\"\\]|\\[btnfr\"\'\\])*\"    return 'CADENA';

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
    : PRINT LPAREN EXPRESION RPAREN (SEMICOLON)?
        {
            $$ = new Print(
                $3,
                @1.first_line,
                @1.first_column
            );
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
;

%%