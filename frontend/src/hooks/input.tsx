import React, { useState } from 'react';

export function useInput({ placeholder, type = 'text' }: { placeholder: string; type: 'number' | 'text' | 'date' }) {
  const [value, setValue] = useState('');
  const el = (
    <input
      className="input"
      placeholder={placeholder}
      type={type}
      value={value}
      onInput={(e) => setValue((e.target as any).value)}
    />
  );

  return [value, el, setValue] as const;
}
