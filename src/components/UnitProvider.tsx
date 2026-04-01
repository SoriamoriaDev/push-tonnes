'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { UnitSystem, detectUnitSystem } from '@/lib/units';

const UNIT_STORAGE_KEY = 'pushTonnes_unitSystem';

interface UnitContextValue {
  unit: UnitSystem;
  setUnit: (unit: UnitSystem) => void;
}

const UnitContext = createContext<UnitContextValue>({
  unit: 'metric',
  setUnit: () => {},
});

export function UnitProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnitState] = useState<UnitSystem>('metric');

  useEffect(() => {
    // Check localStorage first, then detect from locale
    const stored = localStorage.getItem(UNIT_STORAGE_KEY) as UnitSystem | null;
    if (stored === 'metric' || stored === 'imperial') {
      setUnitState(stored);
    } else {
      const detected = detectUnitSystem();
      setUnitState(detected);
      localStorage.setItem(UNIT_STORAGE_KEY, detected);
    }
  }, []);

  const setUnit = (newUnit: UnitSystem) => {
    setUnitState(newUnit);
    localStorage.setItem(UNIT_STORAGE_KEY, newUnit);
  };

  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnit() {
  return useContext(UnitContext);
}
