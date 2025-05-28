// lib/unit-engine.ts

import { evaluate } from 'mathjs';
import Fuse from 'fuse.js';

export type Dimension = [number, number, number, number, number, number, number]; // M, L, T, I, Θ, N, J

export interface Unit {
  name: string;
  aliases: string[];
  dimension: Dimension;
  toBase: (x: number) => number;
  fromBase: (x: number) => number;
}

const zeroDim: Dimension = [0, 0, 0, 0, 0, 0, 0];

export function dimEquals(a: Dimension, b: Dimension): boolean {
  return a.every((v, i) => v === b[i]);
}

export function dimAdd(a: Dimension, b: Dimension): Dimension {
  return a.map((v, i) => v + b[i]) as Dimension;
}

export function isInverse(a: Dimension, b: Dimension): boolean {
  return a.every((v, i) => v === -b[i]);
}


export class UnitEngine {
  private units: Unit[] = [];
  private fuse: Fuse<Unit>;

  constructor(units: Unit[]) {
    this.units = units;
    this.fuse = new Fuse(units, { keys: ['name', 'aliases'], threshold: 0.3 });
  }

  evaluateExpression(input: string): { value: number; unitTokens: string[] } | null {
    const match = input.match(/^(.+?)\s+(.+)$/);
    if (!match) return null;
    const [_, expr, unitStr] = match;
    try {
      const value = evaluate(expr);
      const unitTokens = unitStr.trim().split(/[^a-zA-Z0-9]+/);
      return { value, unitTokens };
    } catch {
      return null;
    }
  }

  resolveUnits(tokens: string[]): Unit[] {
    const resolved: Unit[] = [];
    for (const token of tokens) {
      const match = this.fuse.search(token)[0]?.item;
      if (match) resolved.push(match);
    }
    return resolved;
  }

  combineDimensions(units: Unit[]): Dimension {
    return units.reduce((acc, u) => dimAdd(acc, u.dimension), [...zeroDim]);
  }

  findCompatibleUnits(dim: Dimension, includeInverses = true): Unit[] {
    return this.units.filter(u =>
      dimEquals(u.dimension, dim) ||
      (includeInverses && isInverse(u.dimension, dim))
    );
  }

  convertToAll(value: number, units: Unit[], inputDim: Dimension): { name: string; value: number; note?: string }[] {
    const base = units[0].toBase(value);
    return units.map(u => ({
      name: u.name,
      value: u.fromBase(base),
      note: isInverse(u.dimension, inputDim) ? 'inverse' : undefined
    }));
  }


  process(input: string): { inputValue: number; inputUnits: Unit[]; dimension: Dimension; results: { name: string; value: number }[] } | null {
    const parsed = this.evaluateExpression(input);
    if (!parsed) return null;

    const inputUnits = this.resolveUnits(parsed.unitTokens);
    if (!inputUnits.length) return null;

    const dim = this.combineDimensions(inputUnits);
    const compatible = this.findCompatibleUnits(dim);
    const results = this.convertToAll(parsed.value, compatible, dim);

    return {
      inputValue: parsed.value,
      inputUnits,
      dimension: dim,
      results
    };
  }
}

// Example usage (register units elsewhere and import)
export const baseUnits: Unit[] = [
  {
    name: 'meter',
    aliases: ['m'],
    dimension: [0, 1, 0, 0, 0, 0, 0],
    toBase: x => x,
    fromBase: x => x
  },
  {
    name: 'second',
    aliases: ['s'],
    dimension: [0, 0, 1, 0, 0, 0, 0],
    toBase: x => x,
    fromBase: x => x
  },
  {
    name: 'kilogram',
    aliases: ['kg'],
    dimension: [1, 0, 0, 0, 0, 0, 0],
    toBase: x => x,
    fromBase: x => x
  },
  {
    name: 'ampere',
    aliases: ['A'],
    dimension: [0, 0, 0, 1, 0, 0, 0],
    toBase: x => x,
    fromBase: x => x
  },
  {
    name: 'kelvin',
    aliases: ['K'],
    dimension: [0, 0, 0, 0, 1, 0, 0],
    toBase: x => x,
    fromBase: x => x
  },
  {
    name: 'mole',
    aliases: ['mol'],
    dimension: [0, 0, 0, 0, 0, 1, 0],
    toBase: x => x,
    fromBase: x => x
  },
  {
    name: 'candela',
    aliases: ['cd'],
    dimension: [0, 0, 0, 0, 0, 0, 1],
    toBase: x => x,
    fromBase: x => x
  }
];
