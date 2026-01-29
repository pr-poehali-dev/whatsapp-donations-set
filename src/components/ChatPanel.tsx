import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const EMOJI_LIST = ['❤️', '🔥', '👍', '😂', '😮', '🎉', '💎', '⭐'];

interface Message {
  id: number;
  user: string;
  text: string;
  avatar: string;
}

interface Donation {
  id: number;
  user: string;
  amount: number;
  message: string;
}

interface ChatPanelProps {
  messages: Message[];
  chatMessage: string;
  setChatMessage: (msg: string) => void;
  sendMessage: () => void;
  donationAmount: string;
  setDonationAmount: (amount: string) => void;
  donations: Donation[];
  setIsProfileOpen: (open: boolean) => void;
}

export function ChatPanel({
  messages,
  chatMessage,
  setChatMessage,
  sendMessage,
  donationAmount,
  setDonationAmount,
  donations,
  setIsProfileOpen,
}: ChatPanelProps) {
  return (
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
                {donations.map((donation) => (
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

      <Card className="p-5 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarFallback className="gradient-primary text-white text-xl">U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-lg">UserName</h3>
              <p className="text-xs text-muted-foreground">@username_pro</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="text-xs gradient-primary">Level 12</Badge>
                <Badge variant="outline" className="text-xs">Streamer</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Опыт до Level 13</span>
              <span className="text-primary font-semibold">2,450 / 3,000</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary w-[82%] transition-all"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">128</div>
              <div className="text-xs text-muted-foreground">Стримов</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-secondary">15.2K</div>
              <div className="text-xs text-muted-foreground">Подписчики</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">4.8</div>
              <div className="text-xs text-muted-foreground">Рейтинг</div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border/50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Heart" className="h-4 w-4 text-red-500" />
                <span>Донатов получено</span>
              </div>
              <span className="font-semibold">42,500 ₽</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Clock" className="h-4 w-4 text-blue-500" />
                <span>Время в эфире</span>
              </div>
              <span className="font-semibold">324ч</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Icon name="Trophy" className="h-4 w-4 text-yellow-500" />
                <span>Достижений</span>
              </div>
              <span className="font-semibold">18/25</span>
            </div>
          </div>

          <Button className="w-full gradient-accent" size="sm" onClick={() => setIsProfileOpen(true)}>
            <Icon name="User" className="mr-2 h-4 w-4" />
            Открыть профиль
          </Button>
        </div>
      </Card>
    </aside>
  );
}
