import React from 'react';

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type="button"
    className="px-3 py-1.5 bg-green-600 disabled:bg-neutral-800 disabled:text-neutral-500 rounded"
    {...props}
  >
    {children}
  </button>
);

export default Button;
