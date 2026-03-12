%lex
%%

\s+                   /* ignorar espacios */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
"+"                   return '+';
"-"                   return '-';
"*"                   return '*';
"/"                   return '/';
"("                   return '(';
")"                   return ')';

. {
    console.log("Carácter no reconocido: " + yytext);
}

<<EOF>>               return 'EOF';

/lex

%start expressions

%%

expressions
    : e EOF         { return $1; }
;

e : e '+' e         { $$ = $1 + $3; }
    | e '-' e       { $$ = $1 - $3; }
    | e '*' e       { $$ = $1 * $3; }
    | e '/' e       { $$ = $1 / $3; }
    | '(' e ')'     { $$ = $2; }
    | NUMBER        { $$ = Number(yytext); }
;