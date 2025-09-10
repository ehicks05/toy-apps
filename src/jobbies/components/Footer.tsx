import type React from 'react';
import { useState } from 'react';
import { LINKS } from '@/jobbies/constants/app';
import { useJobs } from '@/jobbies/hooks/useJobs';

interface LinkProps {
	href: string;
	children: React.ReactNode;
}
const Link = ({ href, children }: LinkProps) => (
	<a
		href={href}
		className="text-blue-500 hover:underline hover:text-blue-400"
		target="_blank"
		rel="noreferrer"
	>
		{children}
	</a>
);

const ResetJobs = () => {
	const { resetJobs } = useJobs();
	return (
		<button
			type="button"
			className="text-blue-500 hover:underline hover:text-blue-400"
			onClick={resetJobs}
		>
			reset
		</button>
	);
};

const ExportJobs = () => {
	const { exportJobs } = useJobs();
	const [label, setLabel] = useState('export');

	const handleClick = () => {
		exportJobs();
		setLabel('copied');
		setTimeout(() => setLabel('export'), 2000);
	};

	return (
		<button
			type="button"
			className="text-blue-500 hover:underline hover:text-blue-400"
			onClick={handleClick}
		>
			{label}
		</button>
	);
};

export const Footer = () => {
	return (
		<footer className="flex items-center justify-end gap-4 px-2 py-4 max-w-screen-2xl mx-auto w-full">
			<ExportJobs />
			<ResetJobs />
			{LINKS.map((link) => (
				<Link key={link.url} href={link.url}>
					{link.label}
				</Link>
			))}
		</footer>
	);
};
