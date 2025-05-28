'use client';

import { useState } from 'react';
import { UnitEngine, baseUnits } from '@/lib/unit-engine';

const engine = new UnitEngine(baseUnits);

export default function UnitConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<
        { name: string; value: number; note?: string }[] | null
    >(null);

    const [error, setError] = useState<string | null>(null);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setInput(val);

        if (!val.trim()) {
            setOutput(null);
            setError(null);
            return;
        }

        const result = engine.process(val);
        if (!result) {
            setError('Invalid expression or unit(s).');
            setOutput(null);
        } else {
            setOutput(result.results);
            setError(null);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-xl font-semibold mb-2">Funny Unit Converter</h2>
            <input
                type="text"
                className="w-full p-2 border rounded mb-4"
                placeholder="Try: 3^3 kg*m/s^2"
                value={input}
                onChange={handleInputChange}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {output && (
                <ul className="space-y-1 text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded">
                    {output.map((r, i) => (
                        <li key={i}>
                            <strong>{r.name}</strong>: {r.value.toPrecision(10)}
                            {r.note && <span className="text-xs text-gray-500 ml-2">({r.note})</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
