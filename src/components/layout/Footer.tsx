import { LINKS } from '@/constants/app';
import React from 'react';

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

const Footer = () => {
	return (
		<footer className="flex items-center justify-end gap-4 px-2 py-4 max-w-screen-2xl mx-auto w-full">
			{LINKS.map((link) => (
				<Link key={link.url} href={link.url}>
					{link.label}
				</Link>
			))}
		</footer>
	);
};

export default React.memo(Footer);
