'use client';

import { useState, useEffect } from 'react';
import { create, all, BigNumber } from 'mathjs';
import { tokenizeUnitExpression, parseUnitExpression } from '@/lib/unit-converter/ast';
import { evaluateAST } from '@/lib/unit-converter/evaluate';

const config = {
  number: 'BigNumber' as const,
  precision: 64
};

const math = create(all, config);

function dimensionEquals(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

export default function UnitConverterPage() {
  const DIMENSION_LABELS = ['L', 'M', 'T', 'I', 'Θ', 'N', 'J'];
  const DIMENSION_WORDS = [
    'Length',
    'Mass',
    'Time',
    'Electric Current',
    'Temperature',
    'Amount of Substance',
    'Luminous Intensity'
  ];

  const [valueInput, setValueInput] = useState('42');
  const [sourceUnitInput, setSourceUnitInput] = useState('fluid ounce / kilogram^2');
  const [targetUnitInput, setTargetUnitInput] = useState('meter^3 / kilogram^2');
  const [showDebug, setShowDebug] = useState(false);

  const [numericResult, setNumericResult] = useState<number | null>(null);
  const [convertedResult, setConvertedResult] = useState<number | null>(null);
  const [sourceDebug, setSourceDebug] = useState<{ dimension: number[]; factor: BigNumber } | null>(null);
  const [targetDebug, setTargetDebug] = useState<{ dimension: number[]; factor: BigNumber } | null>(null);
  const [sourceTokens, setSourceTokens] = useState<any[]>([]);
  const [targetTokens, setTargetTokens] = useState<any[]>([]);
  const [sourceAST, setSourceAST] = useState<any | null>(null);
  const [targetAST, setTargetAST] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  function describeDimensionVector(vector: number[]) {
    return vector
      .map((value, index) => {
        if (value === 0) return null;
        const label = DIMENSION_LABELS[index];
        const word = DIMENSION_WORDS[index];
        return `${label} (${word}): ${value}`;
      })
      .filter(Boolean)
      .join(', ');
  }

  useEffect(() => {
    (async () => {
      try {
        setError(null);

        const parsedValue = math.evaluate(valueInput); // BigNumber
        setNumericResult(Number(parsedValue.toString()));

        const sTokens = tokenizeUnitExpression(sourceUnitInput);
        setSourceTokens(sTokens);
        const sAST = parseUnitExpression(sTokens);
        setSourceAST(sAST);
        const sEval = await evaluateAST(sAST);
        setSourceDebug(sEval);

        const tTokens = tokenizeUnitExpression(targetUnitInput);
        setTargetTokens(tTokens);
        const tAST = parseUnitExpression(tTokens);
        setTargetAST(tAST);
        const tEval = await evaluateAST(tAST);
        setTargetDebug(tEval);

        if (!dimensionEquals(sEval.dimension, tEval.dimension)) {
          throw new Error('Source and target unit dimensions do not match.');
        }

        const result = parsedValue.times(sEval.factor).div(tEval.factor);
        setConvertedResult(Number(result.toString()));
      } catch (err: any) {
        setNumericResult(null);
        setConvertedResult(null);
        setSourceDebug(null);
        setTargetDebug(null);
        setSourceTokens([]);
        setTargetTokens([]);
        setSourceAST(null);
        setTargetAST(null);
        setError(err.message || 'Unknown error');
      }
    })();
  }, [valueInput, sourceUnitInput, targetUnitInput]);

  return (
    <main className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold">Unit Converter Debug Page</h1>

      <div>
        <label className="block font-medium">Value</label>
        <input
          className="w-full mt-1 p-2 border rounded bg-white text-black"
          value={valueInput}
          onChange={e => setValueInput(e.target.value)}
        />
        {numericResult !== null && (
          <p className="mt-1 text-green-600">= {numericResult}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">From Unit</label>
        <input
          className="w-full mt-1 p-2 border rounded bg-white text-black"
          value={sourceUnitInput}
          onChange={e => setSourceUnitInput(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">To Unit</label>
        <input
          className="w-full mt-1 p-2 border rounded bg-white text-black"
          value={targetUnitInput}
          onChange={e => setTargetUnitInput(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={showDebug}
            onChange={(e) => setShowDebug(e.target.checked)}
          />
          Show dimension vector, tokens, AST, and SI factor
        </label>
      </div>

      {convertedResult !== null && (
        <div className="mt-4 text-blue-700">
          <p><strong>Converted Result:</strong> {convertedResult}</p>
        </div>
      )}

      {showDebug && (
        <div className="mt-6 space-y-6 text-sm text-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-black">From Unit</h2>
            <p><strong>Input:</strong> {sourceUnitInput}</p>
            <p><strong>Tokens:</strong> [{sourceTokens.map(t => JSON.stringify(t)).join(', ')}]</p>
            {sourceAST && (
              <div className="mt-1">
                <p><strong>AST:</strong></p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-48">
                  {JSON.stringify(sourceAST, null, 2)}
                </pre>
              </div>
            )}
            {sourceDebug && (
              <>
                <p><strong>Dimension Vector:</strong> [{sourceDebug.dimension.join(', ')}]</p>
                <p className="ml-4 text-gray-600 italic">
                  {describeDimensionVector(sourceDebug.dimension)}
                </p>
                <p><strong>SI Conversion Factor:</strong> {sourceDebug.factor.toString()}</p>
              </>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-black">To Unit</h2>
            <p><strong>Input:</strong> {targetUnitInput}</p>
            <p><strong>Tokens:</strong> [{targetTokens.map(t => JSON.stringify(t)).join(', ')}]</p>
            {targetAST && (
              <div className="mt-1">
                <p><strong>AST:</strong></p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-48">
                  {JSON.stringify(targetAST, null, 2)}
                </pre>
              </div>
            )}
            {targetDebug && (
              <>
                <p><strong>Dimension Vector:</strong> [{targetDebug.dimension.join(', ')}]</p>
                <p className="ml-4 text-gray-600 italic">
                  {describeDimensionVector(targetDebug.dimension)}
                </p>
                <p><strong>SI Conversion Factor:</strong> {targetDebug.factor.toString()}</p>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
    </main>
  );
}
