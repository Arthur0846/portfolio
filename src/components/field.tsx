import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
  className = "",
}: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-xs text-muted">
          {label}
        </label>
        {hint}
      </div>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 text-xs text-danger"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
