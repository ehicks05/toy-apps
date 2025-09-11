import React, { FC, ReactNode } from 'react';
import { FaGithubSquare, FaHome } from 'react-icons/fa';

const LINKS = [
  {
    icon: FaGithubSquare,
    url: 'https://www.github.com/ehicks05/sol',
  },
  {
    icon: FaHome,
    url: 'https://ehicks.net',
  },
];

const Footer = () => {
  return (
    <footer className="flex justify-end gap-4 p-4">
      {LINKS.map(({ url, icon: Icon }) => {
        return (
          <Link href={url} key={url}>
            <Icon className="text-3xl text-amber-500 hover:text-green-400" />
          </Link>
        );
      })}
    </footer>
  );
};

const Link: FC<{ children: ReactNode; href: string }> = ({
  href,
  children,
}) => {
  return (
    <a href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
};

export default React.memo(Footer);
