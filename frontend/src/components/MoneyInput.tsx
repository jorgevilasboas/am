import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface MoneyInputProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string, floatValue: number | undefined) => void;
  label?: string;
}

function formatCentavosToBRL(value: string) {
  if (!value) return '';
  const number = parseFloat(value) / 100;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange, label, ...props }) => {
  // Remove tudo que não for número
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    // Remove zeros à esquerda
    raw = raw.replace(/^0+(?!$)/, '');
    onChange(raw, raw ? parseFloat(raw) / 100 : undefined);
  };

  return (
    <TextField
      {...props}
      label={label}
      value={formatCentavosToBRL(value)}
      onChange={handleInput}
      inputProps={{ inputMode: 'numeric', maxLength: 15 }}
    />
  );
}; 