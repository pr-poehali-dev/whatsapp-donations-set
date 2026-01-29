import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastSeen: string;
}

interface Conversation {
  userId: number;
  messages: Array<{
    id: number;
    text: string;
    from: string;
    timestamp: string;
  }>;
}

interface DialogsProps {
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isMessagesOpen: boolean;
  setIsMessagesOpen: (open: boolean) => void;
  users: User[];
  conversations: Conversation[];
  selectedUser: number | null;
  setSelectedUser: (userId: number | null) => void;
  privateMessage: string;
  setPrivateMessage: (msg: string) => void;
  sendPrivateMessage: () => void;
}

export function Dialogs({
  isProfileOpen,
  setIsProfileOpen,
  isMessagesOpen,
  setIsMessagesOpen,
  users,
  conversations,
  selectedUser,
  setSelectedUser,
  privateMessage,
  setPrivateMessage,
  sendPrivateMessage,
}: DialogsProps) {
  return (
    <>
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Профиль пользователя</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" />
                <AvatarFallback className="gradient-primary text-white text-3xl">U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">UserName</h3>
                <p className="text-muted-foreground">@username_pro</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="gradient-primary">Level 12</Badge>
                  <Badge variant="outline">Streamer</Badge>
                  <Badge variant="secondary">Verified ✓</Badge>
                </div>
                <p className="text-sm mt-3 text-foreground/80">
                  Профессиональный стример и контент-мейкер. Создаю контент на тему игр, обучения и развлечений. 
                  Стримлю каждый день с 18:00 до 23:00 МСК.
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="BarChart3" className="h-5 w-5 text-primary" />
                Статистика
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-3xl font-bold text-primary">128</div>
                  <div className="text-xs text-muted-foreground mt-1">Стримов</div>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                  <div className="text-3xl font-bold text-secondary">15.2K</div>
                  <div className="text-xs text-muted-foreground mt-1">Подписчиков</div>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-accent/10 to-accent/5">
                  <div className="text-3xl font-bold text-accent">4.8</div>
                  <div className="text-xs text-muted-foreground mt-1">Рейтинг</div>
                </Card>
                <Card className="p-4 text-center bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
                  <div className="text-3xl font-bold text-yellow-500">324ч</div>
                  <div className="text-xs text-muted-foreground mt-1">В эфире</div>
                </Card>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Trophy" className="h-5 w-5 text-yellow-500" />
                Достижения (18/25)
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '🎮', name: 'Первый стрим', desc: 'Провести первую трансляцию', unlocked: true },
                  { icon: '💯', name: '100 стримов', desc: 'Провести 100 трансляций', unlocked: true },
                  { icon: '👥', name: '10K подписчиков', desc: 'Набрать 10,000 подписчиков', unlocked: true },
                  { icon: '💎', name: 'Щедрость', desc: 'Получить 50,000₽ донатов', unlocked: false },
                  { icon: '⭐', name: 'Топ стример', desc: 'Войти в топ-10 по рейтингу', unlocked: false },
                  { icon: '🔥', name: 'Марафон', desc: 'Стримить 12 часов подряд', unlocked: true },
                ].map((achievement, i) => (
                  <Card 
                    key={i}
                    className={`p-3 ${achievement.unlocked ? 'border-primary/50 bg-primary/5' : 'opacity-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{achievement.desc}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="Wallet" className="h-5 w-5 text-green-500" />
                Финансы
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="Heart" className="h-5 w-5 text-red-500" />
                    <span className="font-medium">Донатов получено</span>
                  </div>
                  <span className="text-xl font-bold text-green-500">42,500 ₽</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon name="Users" className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Подписки платные</span>
                  </div>
                  <span className="text-xl font-bold text-blue-500">234</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button className="flex-1 gradient-primary">
                <Icon name="Edit" className="mr-2 h-4 w-4" />
                Редактировать профиль
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="Settings" className="mr-2 h-4 w-4" />
                Настройки
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
        <DialogContent className="max-w-4xl h-[600px] p-0">
          <div className="grid grid-cols-[300px_1fr] h-full">
            <div className="border-r border-border">
              <div className="p-4 border-b border-border">
                <h3 className="font-bold text-lg">Сообщения</h3>
                <Input 
                  placeholder="Поиск контактов..." 
                  className="mt-2"
                />
              </div>
              <ScrollArea className="h-[calc(600px-80px)]">
                <div className="p-2 space-y-1">
                  {users.map((user) => {
                    const hasMessages = conversations.find(c => c.userId === user.id);
                    const unreadCount = user.id === 1 ? 2 : user.id === 2 ? 1 : 0;
                    
                    return (
                      <div
                        key={user.id}
                        onClick={() => setSelectedUser(user.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedUser === user.id 
                            ? 'bg-primary/10 border border-primary/50' 
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            {user.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm">{user.name}</span>
                              {unreadCount > 0 && (
                                <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-red-500">
                                  {unreadCount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.lastSeen}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            <div className="flex flex-col">
              {selectedUser !== null ? (
                <>
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                          {users.find(u => u.id === selectedUser)?.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">
                          {users.find(u => u.id === selectedUser)?.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {users.find(u => u.id === selectedUser)?.lastSeen}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-3">
                      {conversations
                        .find(c => c.userId === selectedUser)
                        ?.messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.from === 'Вы' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                msg.from === 'Вы'
                                  ? 'gradient-primary text-white'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className={`text-xs mt-1 ${
                                msg.from === 'Вы' ? 'text-white/70' : 'text-muted-foreground'
                              }`}>
                                {msg.timestamp}
                              </p>
                            </div>
                          </div>
                        ))}
                      {(!conversations.find(c => c.userId === selectedUser) || 
                        conversations.find(c => c.userId === selectedUser)?.messages.length === 0) && (
                        <div className="text-center text-muted-foreground py-8">
                          Начните переписку!
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={privateMessage}
                        onChange={(e) => setPrivateMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendPrivateMessage()}
                        placeholder="Написать сообщение..."
                        className="flex-1"
                      />
                      <Button onClick={sendPrivateMessage} className="gradient-primary">
                        <Icon name="Send" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Icon name="MessageSquare" className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p>Выберите контакт для начала переписки</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
