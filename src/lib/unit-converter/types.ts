export type Unit = {
  name: string;
  aliases: string[];
  dimension: number[];
  conversionToSI: number;
};

export type UnitToken =
  | { type: 'unit'; value: string }
  | { type: 'operator'; value: '*' | '/' | '^' }
  | { type: 'number'; value: number }
  | { type: 'paren'; value: '(' | ')' };

export type ASTNode =
  | { type: 'unit'; name: string }
  | { type: 'power'; base: ASTNode; exponent: number }
  | { type: 'binary'; op: '*' | '/'; left: ASTNode; right: ASTNode };
