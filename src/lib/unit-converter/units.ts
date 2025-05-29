import type { Unit } from './types';

let cachedUnits: Unit[] | null = null;

export async function getUnitArray(): Promise<Unit[]> {
  if (typeof window === 'undefined') {
    throw new Error('loadUnits() must be called client-side only');
  }

  if (cachedUnits !== null) return cachedUnits;

  const res = await fetch('/unit-converter/units.json');
  if (!res.ok) throw new Error('Failed to load units.json');

  const data: Unit[] = await res.json();
  cachedUnits = data;
  return cachedUnits;
}

export async function getUnitByNameOrAlias(name: string): Promise<Unit | null> {
  const units = await getUnitArray();
  const normalized = name.toLowerCase();
  return units.find(unit =>
    unit.name.toLowerCase() === normalized ||
    unit.aliases.some(alias => alias.toLowerCase() === normalized)
  ) ?? null;
}
