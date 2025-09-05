import React from 'react';

const Button = ({
	children,
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		type="button"
		className={`px-3 py-1.5 disabled:bg-neutral-800 disabled:text-neutral-500 rounded ${
			className || 'bg-neutral-500'
		}`}
		{...props}
	>
		{children}
	</button>
);

export default Button;
