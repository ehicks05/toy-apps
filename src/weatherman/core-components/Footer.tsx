const LINKS = [
	{
		text: 'github',
		url: 'https://www.github.com/ehicks05/weatherman-frontend',
	},
	{
		text: 'home',
		url: 'https://ehicks.net',
	},
];

export const Footer = () => (
	<footer className="flex justify-end gap-4 p-4">
		{LINKS.map(({ url, text }) => (
			<a key={url} href={url} rel="noreferrer" target="_blank">
				<div className="text-green-500 hover:text-green-400">{text}</div>
			</a>
		))}
	</footer>
);
