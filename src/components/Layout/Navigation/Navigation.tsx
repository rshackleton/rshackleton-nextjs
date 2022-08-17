import Link from 'next/link';
import * as React from 'react';

export type NavigationItem = {
  id: string;
  title: string;
  url: string;
};

export type NavigationProps = {
  className?: string;
  items: NavigationItem[];
};

const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <nav className={props.className}>
      <ul className="flex flex-col gap-6">
        {props.items.map((item) => (
          <li key={item.id}>
            <Link href={item.url}>
              <a className="inline-block font-medium underline-offset-4 hover:underline">
                {item.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
