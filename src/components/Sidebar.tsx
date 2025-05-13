
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface SidebarItemProps {
  icon: string;
  text: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active = false, href }) => {
  return (
    <Link to={href} className="block">
      <div className={`flex items-center px-4 py-3 mb-1 rounded-md transition-colors ${
        active 
          ? 'bg-primary/10 text-primary dark:bg-primary/20' 
          : 'hover:bg-muted'
      }`}>
        <span className="mr-3">{icon}</span>
        <span className={`font-medium ${active ? 'text-primary' : ''}`}>{text}</span>
      </div>
    </Link>
  );
};

const Sidebar: React.FC<{ activePage: string }> = ({ activePage }) => {
  const location = useLocation();
  const { theme } = useTheme();
  
  return (
    <div className="bg-card h-full w-64 border-r border-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-primary/90 mr-3 flex items-center justify-center text-primary-foreground font-bold text-sm">
            ASPE
          </div>
          <h1 className="font-semibold text-lg text-foreground">Security Engine</h1>
        </div>
      </div>

      <div className="px-4 py-2 flex-1 overflow-y-auto">
        <SidebarItem icon="🏠" text="Dashboard" active={location.pathname === '/'} href="/" />
        <SidebarItem icon="🔍" text="Security Events" active={location.pathname === '/events'} href="/events" />
        <SidebarItem icon="📝" text="Policies" active={location.pathname === '/policies'} href="/policies" />
        <SidebarItem icon="📊" text="Compliance" active={location.pathname === '/compliance'} href="/compliance" />
        <SidebarItem icon="🔄" text="Integrations" active={location.pathname === '/integrations'} href="/integrations" />
        <SidebarItem icon="👥" text="Users & Entities" active={location.pathname === '/users'} href="/users" />
        <SidebarItem icon="⚙️" text="Settings" active={location.pathname === '/settings'} href="/settings" />
      </div>

      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center p-3 rounded-md bg-muted/50">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mr-3">
            RS
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Rutuja Shejwal</div>
            <div className="text-xs text-muted-foreground">Security Analyst</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
