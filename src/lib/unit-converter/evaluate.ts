import { ASTNode, Unit } from './types';
import { getUnitByNameOrAlias } from './units';
import { create, all, BigNumber } from 'mathjs';

const math = create(all, {
  number: 'BigNumber',
  precision: 64,
});

type EvalResult = {
  dimension: number[];
  factor: BigNumber;
};

const DIM_LENGTH = 7;

function toSafeIntegerVector(vec: number[], epsilon = 1e-10): number[] {
  return vec.map((val, i) => {
    const rounded = Math.round(val);
    if (Math.abs(val - rounded) < epsilon) {
      return rounded;
    }
    throw new Error(`Dimension vector value at index ${i} is not a safe integer: ${val}`);
  });
}

function addVectors(a: number[], b: number[]): number[] {
  return toSafeIntegerVector(a.map((val, i) => val + b[i]));
}

function subVectors(a: number[], b: number[]): number[] {
  return toSafeIntegerVector(a.map((val, i) => val - b[i]));
}

function scaleVector(vec: number[], scalar: number): number[] {
  return toSafeIntegerVector(vec.map(val => val * scalar));
}

export async function evaluateAST(node: ASTNode): Promise<EvalResult> {
  switch (node.type) {
    case 'unit': {
      const unit = await getUnitByNameOrAlias(node.name);
      if (!unit) throw new Error(`Unknown unit: ${node.name}`);
      return {
        dimension: unit.dimension,
        factor: math.bignumber(unit.conversionToSI),
      };
    }

    case 'power': {
      const baseEval = await evaluateAST(node.base);
      const powered = math.pow(baseEval.factor, math.bignumber(node.exponent));
      return {
        dimension: scaleVector(baseEval.dimension, node.exponent),
        factor: math.bignumber(powered as number | BigNumber),
      };
    }

    case 'binary': {
      const leftEval = await evaluateAST(node.left);
      const rightEval = await evaluateAST(node.right);

      if (node.op === '*') {
        return {
          dimension: addVectors(leftEval.dimension, rightEval.dimension),
          factor: leftEval.factor.times(rightEval.factor),
        };
      } else if (node.op === '/') {
        return {
          dimension: subVectors(leftEval.dimension, rightEval.dimension),
          factor: leftEval.factor.div(rightEval.factor),
        };
      }
    }

    default:
      throw new Error(`Unknown AST node type: ${JSON.stringify(node)}`);
  }
}
