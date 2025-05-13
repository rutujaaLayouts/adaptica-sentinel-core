
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  activePage: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activePage }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activePage={activePage} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
