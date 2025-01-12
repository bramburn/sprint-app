import React, { useState } from "react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  required?: boolean;
  errorMessage?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  required = false,
  errorMessage,
  className = "",
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = () => {
    if (required && !value.trim()) {
      setError(errorMessage || "This field is required.");
    } else {
      setError(null);
    }
  };

  return (
    <div className={`textfield-wrapper ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={handleBlur}
        className={`textfield-input ${error ? "textfield-error" : ""}`}
        aria-required={required}
        aria-invalid={!!error}
        {...props}
      />
      {error && <span className="textfield-error-message">{error}</span>}
    </div>
  );
};

export default TextField;