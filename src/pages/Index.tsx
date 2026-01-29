import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const EMOJI_LIST = ['❤️', '🔥', '👍', '😂', '😮', '🎉', '💎', '⭐'];

const MOCK_STREAMS = [
  { id: 1, title: 'Топовая игра в Valorant', streamer: 'ProGamer', viewers: 12543, category: 'Игры', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop' },
  { id: 2, title: 'Рисую портреты на заказ', streamer: 'ArtMaster', viewers: 3421, category: 'Творчество', thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=225&fit=crop' },
  { id: 3, title: 'Учу программированию с нуля', streamer: 'CodeGuru', viewers: 8234, category: 'Образование', thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop' },
  { id: 4, title: 'Готовлю пасту карбонара', streamer: 'ChefLife', viewers: 5123, category: 'Кулинария', thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=225&fit=crop' },
  { id: 5, title: 'Покатушки на машине', streamer: 'Racer777', viewers: 9876, category: 'Авто', thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop' },
  { id: 6, title: 'Разбор треков битмейкинга', streamer: 'BeatKing', viewers: 4532, category: 'Музыка', thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=225&fit=crop' },
];

const MOCK_MESSAGES = [
  { id: 1, user: 'Alex_92', text: 'Привет всем!', avatar: 'A' },
  { id: 2, user: 'MarinaK', text: 'Топовый стрим! 🔥', avatar: 'M' },
  { id: 3, user: 'GamerPro', text: 'Как же круто играешь!', avatar: 'G' },
  { id: 4, user: 'NewUser', text: 'Первый раз тут, привет!', avatar: 'N' },
];

const MOCK_DONATIONS = [
  { id: 1, user: 'RichFan', amount: 500, message: 'Продолжай в том же духе!' },
  { id: 2, user: 'SupporterX', amount: 1000, message: 'Лучший стример! ❤️' },
  { id: 3, user: 'Anonymous', amount: 250, message: '' },
];

const COMMUNITIES = [
  { id: 1, name: 'Киберспорт', icon: '🎮', members: 45200 },
  { id: 2, name: 'Творчество', icon: '🎨', members: 32100 },
  { id: 3, name: 'Музыка', icon: '🎵', members: 28900 },
  { id: 4, name: 'Образование', icon: '📚', members: 19500 },
];

export default function Index() {
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [donationAmount, setDonationAmount] = useState('');

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'Вы',
        text: chatMessage,
        avatar: 'Y'
      }]);
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
            <Button variant="outline" size="icon">
              <Icon name="Search" className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Icon name="Bell" className="h-4 w-4" />
            </Button>
            <Avatar className="h-9 w-9 border-2 border-primary">
              <AvatarFallback className="gradient-primary text-white">U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-6">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Популярные трансляции</h2>
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    <Icon name="Flame" className="mr-1 h-3 w-3" />
                    Популярное
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    <Icon name="Clock" className="mr-1 h-3 w-3" />
                    Новое
                  </Badge>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_STREAMS.map((stream, index) => (
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
                      <Badge variant="outline" className="text-xs">
                        {stream.category}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Сообщества</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {COMMUNITIES.map((community, index) => (
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

          <aside className="space-y-4">
            <Card className="overflow-hidden border-border/50">
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border">
                  <TabsTrigger value="chat" className="rounded-none">
                    <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
                    Чат
                  </TabsTrigger>
                  <TabsTrigger value="donations" className="rounded-none">
                    <Icon name="DollarSign" className="mr-2 h-4 w-4" />
                    Донаты
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="m-0">
                  <div className="flex flex-col h-[600px]">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-3">
                        {messages.map((msg) => (
                          <div key={msg.id} className="flex gap-2 animate-slide-up">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-muted">
                                {msg.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-semibold text-primary">
                                  {msg.user}
                                </span>
                              </div>
                              <p className="text-sm text-foreground/90">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="p-4 border-t border-border space-y-3">
                      <div className="flex gap-1 overflow-x-auto pb-1">
                        {EMOJI_LIST.map((emoji, i) => (
                          <Button
                            key={i}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:scale-110 transition-transform"
                            onClick={() => setChatMessage(chatMessage + emoji)}
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Написать сообщение..."
                          className="flex-1"
                        />
                        <Button onClick={sendMessage} className="gradient-primary">
                          <Icon name="Send" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="donations" className="m-0">
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold">Поддержать стримера</h3>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          placeholder="Сумма"
                          className="flex-1"
                        />
                        <Button className="gradient-secondary">
                          <Icon name="Heart" className="mr-2 h-4 w-4" />
                          Донат
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        {[100, 500, 1000].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setDonationAmount(amount.toString())}
                            className="flex-1"
                          >
                            {amount} ₽
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-muted-foreground">Последние донаты</h4>
                      {MOCK_DONATIONS.map((donation) => (
                        <Card key={donation.id} className="p-3 bg-muted/30 border-primary/20 animate-scale-in">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Icon name="Heart" className="h-4 w-4 text-red-500" />
                                <span className="font-semibold text-sm">{donation.user}</span>
                                <Badge className="gradient-primary text-xs">
                                  {donation.amount} ₽
                                </Badge>
                              </div>
                              {donation.message && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {donation.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
                    <Icon name="Trophy" className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ваш профиль</h3>
                    <p className="text-xs text-muted-foreground">Level 12 • Streamer</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Опыт</span>
                    <span className="text-primary">2,450 / 3,000</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary w-[82%] transition-all"></div>
                  </div>
                </div>
                <Button className="w-full gradient-accent" size="sm">
                  <Icon name="Settings" className="mr-2 h-4 w-4" />
                  Настройки профиля
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
