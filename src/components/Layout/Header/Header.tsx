import Link from 'next/link';
import * as React from 'react';
import type { NavigationItem } from '../Navigation/Navigation';
import Navigation from '../Navigation/Navigation';

export type HeaderProps = {
  items: NavigationItem[];
};

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="flex flex-col items-center px-4 py-12 text-base">
      <Link href="/">
        <a className="inline-block pb-4 font-bold underline-offset-4 text-xl hover:underline">
          Richard Shackleton
        </a>
      </Link>
      <Navigation items={props.items} />
    </header>
  );
};

export default Header;
