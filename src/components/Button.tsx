import React from 'react';

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      type="button"
      className="px-4 py-2 bg-green-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-xl rounded"
      {...props}
    >
      {children}
    </button>
  );

export default Button;
