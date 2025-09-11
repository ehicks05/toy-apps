import type { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

const Button = ({ className, disabled, onClick, children }: Props) => {
	return (
		<button
			type="button"
			className={`border bg-black px-2 py-1 text-white
      ${disabled ? 'cursor-default opacity-50' : ''} ${className}`}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
