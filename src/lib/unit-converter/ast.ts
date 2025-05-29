import { UnitToken, ASTNode } from './types';

export function tokenizeUnitExpression(input: string): UnitToken[] {
  const regex = /\(|\)|\^|\*|\/|\d+(\.\d+)?|[a-zA-Z]+(?: [a-zA-Z]+)*/g;
  const rawTokens = input.match(regex);
  if (!rawTokens) return [];

  return rawTokens.map(token => {
    token = token.trim();
    if (token === '*' || token === '/' || token === '^') {
      return { type: 'operator', value: token };
    } else if (token === '(' || token === ')') {
      return { type: 'paren', value: token };
    } else if (!isNaN(Number(token))) {
      return { type: 'number', value: Number(token) };
    } else {
      return { type: 'unit', value: token };
    }
  });
}

export function parseUnitExpression(tokens: UnitToken[]): ASTNode {
  let index = 0;

  function peek() {
    return tokens[index];
  }

  function consume() {
    return tokens[index++];
  }

  function parsePrimary(): ASTNode {
    const token = consume();
    if (!token) throw new Error('Unexpected end of input');

    if (token.type === 'unit') {
      return { type: 'unit', name: token.value };
    }

    if (token.type === 'paren' && token.value === '(') {
      const expr = parseExpression();
      const next = consume();
      if (!next || next.type !== 'paren' || next.value !== ')') {
        throw new Error('Expected closing parenthesis');
      }
      return expr;
    }

    throw new Error(`Unexpected token: ${JSON.stringify(token)}`);
  }

  function parsePower(): ASTNode {
    let node = parsePrimary();

    while (peek()?.type === 'operator' && peek()?.value === '^') {
      consume(); // '^'
      const exponentToken = consume();
      if (exponentToken?.type !== 'number') {
        throw new Error('Expected number after ^');
      }
      node = { type: 'power', base: node, exponent: exponentToken.value };
    }

    return node;
  }

  function parseTerm(): ASTNode {
    let node = parsePower();

    while (peek()?.type === 'operator' && (peek()?.value === '*' || peek()?.value === '/')) {
      const op = consume().value as '*' | '/';
      const right = parsePower();
      node = { type: 'binary', op, left: node, right };
    }

    return node;
  }

  function parseExpression(): ASTNode {
    return parseTerm();
  }

  const ast = parseExpression();
  if (index < tokens.length) {
    throw new Error('Unexpected token after complete expression');
  }
  return ast;
}
