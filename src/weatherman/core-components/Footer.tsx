import React, { FC, ReactNode } from 'react';

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

const Footer = () => (
  <footer className="flex justify-end gap-4 p-4">
    {LINKS.map(({ url, text }) => (
      <Link href={url} key={url}>
        <div className="text-green-500 hover:text-green-400">{text}</div>
      </Link>
    ))}
  </footer>
);

const Link: FC<{ children: ReactNode; href: string }> = ({ href, children }) => (
  <a href={href} rel="noreferrer" target="_blank">
    {children}
  </a>
);

export default React.memo(Footer);
