import * as React from 'react';

export type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex place-content-center place-items-center items-center px-4 py-8">
      <p className="text-slate-500 text-sm">
        &copy; Richard Shackleton {new Date().getUTCFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
