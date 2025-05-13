
import React, { useState } from 'react';
import { Bell, Search, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/sonner";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast(`Searching for "${searchTerm}"`, {
        description: "Search functionality will be implemented in a future update."
      });
    }
  };
  
  const handleNotificationClick = () => {
    toast("Notifications", {
      description: "You have 3 unread notifications."
    });
  };
  
  const handleHelpClick = () => {
    toast("Help Center", {
      description: "Documentation and help resources will be available soon."
    });
  };
  
  const handleProfileClick = () => {
    toast("User Profile", {
      description: "Profile management will be available in a future update."
    });
  };

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center">
        <form onSubmit={handleSearch} className="relative mr-4">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </form>
        
        <Button variant="ghost" size="icon" className="mr-2 relative" onClick={handleNotificationClick}>
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">3</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="mr-4" onClick={handleHelpClick}>
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" className="h-8 w-8 rounded-full p-0" onClick={handleProfileClick}>
          <span className="text-primary-foreground bg-primary h-full w-full rounded-full flex items-center justify-center">
            RS
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
