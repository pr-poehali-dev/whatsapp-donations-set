import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface StreamHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  setIsMessagesOpen: (open: boolean) => void;
  setIsProfileOpen: (open: boolean) => void;
}

export function StreamHeader({
  searchQuery,
  setSearchQuery,
  isSearchOpen,
  setIsSearchOpen,
  setIsMessagesOpen,
  setIsProfileOpen,
}: StreamHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            StreamHub
          </h1>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              <Icon name="Video" className="mr-2 h-4 w-4" />
              Трансляции
            </Button>
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              <Icon name="Users" className="mr-2 h-4 w-4" />
              Сообщества
            </Button>
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              <Icon name="TrendingUp" className="mr-2 h-4 w-4" />
              Топ
            </Button>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            {isSearchOpen && (
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию или автору..."
                className="w-64 animate-fade-in"
                autoFocus
                onBlur={() => {
                  if (searchQuery === '') {
                    setTimeout(() => setIsSearchOpen(false), 200);
                  }
                }}
              />
            )}
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) setSearchQuery('');
              }}
              className={isSearchOpen ? 'ml-2' : ''}
            >
              {isSearchOpen ? <Icon name="X" className="h-4 w-4" /> : <Icon name="Search" className="h-4 w-4" />}
            </Button>
          </div>
          <Button variant="outline" size="icon" onClick={() => setIsMessagesOpen(true)}>
            <Icon name="MessageSquare" className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500">
              3
            </Badge>
          </Button>
          <Button variant="outline" size="icon">
            <Icon name="Bell" className="h-4 w-4" />
          </Button>
          <Avatar 
            className="h-9 w-9 border-2 border-primary cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setIsProfileOpen(true)}
          >
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
            <AvatarFallback className="gradient-primary text-white">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
