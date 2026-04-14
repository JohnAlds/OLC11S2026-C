%{
// Instrucciones
const Print = require("../Instrucciones/Print").Print;
const Declaracion = require("../Instrucciones/Declaracion").Declaracion;
const Bloque = require("../Instrucciones/Bloque").Bloque;
const For = require("../Instrucciones/For").For;
const Asignacion = require("../Instrucciones/Asignacion").Asignacion;
const Continue = require("../Instrucciones/Continue").Continue;
const If = require("../Instrucciones/If").If;



// Expresiones
const Suma = require("../Expresiones/Suma").Suma;
const Resta = require("../Expresiones/Resta").Resta;
const Multiplicacion = require("../Expresiones/Multiplicacion").Multiplicacion;
const Division = require("../Expresiones/Division").Division;
const Nativo = require("../Expresiones/Nativo").Nativo;
const Identificador = require("../Expresiones/Identificador").Identificador;
const MenorQue = require("../Expresiones/MenorQue").MenorQue;
const MayorQue = require("../Expresiones/MayorQue").MayorQue;
const MenorIgual = require("../Expresiones/MenorIgual").MenorIgual;
const MayorIgual = require("../Expresiones/MayorIgual").MayorIgual;
const Igual = require("../Expresiones/Igual").Igual;
const Distinto = require("../Expresiones/Distinto").Distinto;


// Importaciones terceras
const Tipo = require("../Simbolo/Tipo").Tipo;
const tipoDato = require("../Simbolo/tipoDato").tipoDato;
const OperadoresAritmeticos = require("../Expresiones/OperadoresAritmeticos").OperadoresAritmeticos;
const OperadoresRelacionales = require("../Expresiones/OperadoresRelacionales").OperadoresRelacionales;



%}

%lex

%%

"print"                     return 'PRINT';
"int"                       return 'INT_TYPE';
"double"                    return 'DOUBLE_TYPE';
"string"                    return 'STRING_TYPE';
"true"                      return 'TRUE';
"false"                     return 'FALSE';
"for"                       return 'FOR';
"continue"                  return 'CONTINUE';
"if"                        return 'IF';
"else"                      return 'ELSE';

"<="                        return 'MENORIGUAL';
">="                        return 'MAYORIGUAL';
"=="                        return 'IGUALIGUAL';
"!="                        return 'DIFERENTE';
"<"                         return 'MENORQUE';
">"                         return 'MAYORQUE';

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

%left IGUALIGUAL DIFERENTE MENORQUE MAYORQUE MENORIGUAL MAYORIGUAL
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
    : PRINT LPAREN EXPRESION RPAREN SEMICOLON
        {
            $$ = new Print(
                $3,
                @1.first_line,
                @1.first_column
            );
        }
    | TIPO ID IGUAL EXPRESION SEMICOLON
        {
            $$ = new Declaracion(
                $1,
                $2,
                $4,
                @1.first_line,
                @1.first_column
            );
        }
    | TIPO ID SEMICOLON
        {
            $$ = new Declaracion(
                $1,
                $2,
                null,
                @1.first_line,
                @1.first_column
            );
        }
    | ID IGUAL EXPRESION SEMICOLON
        {
            $$ = new Asignacion(
                $1,
                $3,
                @1.first_line,
                @1.first_column
            );
        }
    | CONTINUE SEMICOLON
        {
            $$ = new Continue(
                @1.first_line,
                @1.first_column
            );
        }
    | FOR TIPO ID IGUAL EXPRESION SEMICOLON EXPRESION SEMICOLON ID IGUAL EXPRESION LBRACE INSTRUCCIONES RBRACE
        {
            $$ = new For(
                new Declaracion(
                    $2,
                    $3,
                    $5,
                    @2.first_line,
                    @2.first_column
                ),
                $7,
                new Asignacion(
                    $9,
                    $11,
                    @9.first_line,
                    @9.first_column
                ),
                new Bloque(
                    $13,
                    @12.first_line,
                    @12.first_column
                ),
                @1.first_line,
                @1.first_column
            );
        }
    | LBRACE INSTRUCCIONES RBRACE
        {
            $$ = new Bloque(
                $2,
                @1.first_line,
                @1.first_column
            );
        }
    | IF LPAREN EXPRESION RPAREN LBRACE INSTRUCCIONES RBRACE ELSE LBRACE INSTRUCCIONES RBRACE
        {
            $$ = new If(
                $3,
                new Bloque(
                    $6,
                    @5.first_line,
                    @5.first_column
                ),
                new Bloque(
                    $10,
                    @9.first_line,
                    @9.first_column
                ),
                @1.first_line,
                @1.first_column
            );
        }
    | IF LPAREN EXPRESION RPAREN LBRACE INSTRUCCIONES RBRACE
        {
            $$ = new If(
                $3,
                new Bloque(
                    $6,
                    @5.first_line,
                    @5.first_column
                ),
                null,
                @1.first_line,
                @1.first_column
            );
        }
;



EXPRESION
    : EXPRESION MENORQUE EXPRESION
        {
            $$ = new MenorQue(
                $1,
                $3,
                OperadoresRelacionales.MENORQUE,
                @1.first_line,
                @1.first_column
            );
        }
    | EXPRESION MAYORQUE EXPRESION
        {
            $$ = new MayorQue(
                $1,
                $3,
                OperadoresRelacionales.MAYORQUE,
                @1.first_line,
                @1.first_column
            );
        }
    | EXPRESION MENORIGUAL EXPRESION
        {
            $$ = new MenorIgual(
                $1,
                $3,
                OperadoresRelacionales.MENORIGUAL,
                @1.first_line,
                @1.first_column
            );
        }
    | EXPRESION MAYORIGUAL EXPRESION
        {
            $$ = new MayorIgual(
                $1,
                $3,
                OperadoresRelacionales.MAYORIGUAL,
                @1.first_line,
                @1.first_column
            );
        }
    | EXPRESION IGUALIGUAL EXPRESION
        {
            $$ = new Igual(
                $1,
                $3,
                OperadoresRelacionales.IGUAL,
                @1.first_line,
                @1.first_column
            );
        }
    | EXPRESION DIFERENTE EXPRESION
        {
            $$ = new Distinto(
                $1,
                $3,
                OperadoresRelacionales.DISTINTO,
                @1.first_line,
                @1.first_column
            );
        }
    | EXPRESION MAS EXPRESION
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
    | TRUE
        {
            $$ = new Nativo(
                true, 
                new Tipo(tipoDato.BOOLEANO, true), 
                @1.first_line, 
                @1.first_column);
        }
    | FALSE
        {
            $$ = new Nativo(
                false, 
                new Tipo(tipoDato.BOOLEANO, true), 
                @1.first_line, 
                @1.first_column);
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