
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: string;
  text: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active = false, href }) => {
  return (
    <Link to={href} className="block">
      <div className={`flex items-center px-4 py-3 mb-1 rounded-md ${active ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
        <span className="mr-3">{icon}</span>
        <span className="font-medium">{text}</span>
      </div>
    </Link>
  );
};

const Sidebar: React.FC<{ activePage: string }> = ({ activePage }) => {
  const location = useLocation();
  
  return (
    <div className="bg-white h-full w-64 border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-600 mr-3 flex items-center justify-center text-white font-bold text-sm">
            ASPE
          </div>
          <h1 className="font-semibold text-lg">Security Engine</h1>
        </div>
      </div>

      <div className="px-4 py-2">
        <SidebarItem icon="🏠" text="Dashboard" active={location.pathname === '/'} href="/" />
        <SidebarItem icon="🔍" text="Security Events" active={location.pathname === '/events'} href="/events" />
        <SidebarItem icon="📝" text="Policies" active={location.pathname === '/policies'} href="/policies" />
        <SidebarItem icon="📊" text="Compliance" active={location.pathname === '/compliance'} href="/compliance" />
        <SidebarItem icon="🔄" text="Integrations" active={location.pathname === '/integrations'} href="/integrations" />
        <SidebarItem icon="👥" text="Users & Entities" active={location.pathname === '/users'} href="/users" />
        <SidebarItem icon="⚙️" text="Settings" active={location.pathname === '/settings'} href="/settings" />
      </div>

      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="flex items-center p-3 rounded-md bg-blue-50">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 mr-3">
            RS
          </div>
          <div>
            <div className="text-sm font-medium">Rutuja Shejwal</div>
            <div className="text-xs text-gray-500">Security Analyst</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
