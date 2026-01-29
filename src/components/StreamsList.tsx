import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Stream {
  id: number;
  title: string;
  streamer: string;
  viewers: number;
  rating: number;
  category: string;
  thumbnail: string;
}

interface Community {
  id: number;
  name: string;
  icon: string;
  members: number;
}

interface StreamsListProps {
  streams: Stream[];
  communities: Community[];
  categories: string[];
  sortBy: 'viewers' | 'rating';
  setSortBy: (sort: 'viewers' | 'rating') => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function StreamsList({
  streams,
  communities,
  categories,
  sortBy,
  setSortBy,
  selectedCategory,
  setSelectedCategory,
}: StreamsListProps) {
  return (
    <div className="space-y-6">
      <section>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Популярные трансляции</h2>
            <div className="flex gap-2">
              <Badge 
                variant={sortBy === 'viewers' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSortBy('viewers')}
              >
                <Icon name="Eye" className="mr-1 h-3 w-3" />
                По зрителям
              </Badge>
              <Badge 
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSortBy('rating')}
              >
                <Icon name="Star" className="mr-1 h-3 w-3" />
                По рейтингу
              </Badge>
            </div>
          </div>
          <ScrollArea className="w-full">
            <div className="flex gap-2 pb-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer whitespace-nowrap animate-scale-in"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {streams.map((stream, index) => (
            <Card 
              key={stream.id}
              className="group overflow-hidden cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={stream.thumbnail} 
                  alt={stream.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 flex items-center gap-2">
                  <Badge className="bg-red-500 hover:bg-red-600 live-pulse">
                    <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
                    LIVE
                  </Badge>
                  <Badge variant="secondary" className="bg-black/60 backdrop-blur">
                    <Icon name="Eye" className="mr-1 h-3 w-3" />
                    {stream.viewers.toLocaleString()}
                  </Badge>
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="gradient-primary text-white text-xs">
                      {stream.streamer[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {stream.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{stream.streamer}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {stream.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Icon name="Star" className="h-3 w-3 fill-current" />
                    <span className="text-xs font-semibold">{stream.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Сообщества</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {communities.map((community, index) => (
            <Card 
              key={community.id}
              className="p-4 cursor-pointer hover:bg-card/80 transition-all hover:border-primary/50 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="text-center space-y-2">
                <div className="text-4xl">{community.icon}</div>
                <h3 className="font-semibold">{community.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {community.members.toLocaleString()} участников
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
