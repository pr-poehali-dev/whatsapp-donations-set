import { useState } from 'react';
import { StreamHeader } from '@/components/StreamHeader';
import { StreamsList } from '@/components/StreamsList';
import { ChatPanel } from '@/components/ChatPanel';
import { Dialogs } from '@/components/Dialogs';

const MOCK_STREAMS = [
  { id: 1, title: 'Топовая игра в Valorant', streamer: 'ProGamer', viewers: 12543, rating: 4.8, category: 'Игры', thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop' },
  { id: 2, title: 'Рисую портреты на заказ', streamer: 'ArtMaster', viewers: 3421, rating: 4.9, category: 'Творчество', thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=225&fit=crop' },
  { id: 3, title: 'Учу программированию с нуля', streamer: 'CodeGuru', viewers: 8234, rating: 4.7, category: 'Образование', thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop' },
  { id: 4, title: 'Готовлю пасту карбонара', streamer: 'ChefLife', viewers: 5123, rating: 4.6, category: 'Кулинария', thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=225&fit=crop' },
  { id: 5, title: 'Покатушки на машине', streamer: 'Racer777', viewers: 9876, rating: 4.5, category: 'Авто', thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=225&fit=crop' },
  { id: 6, title: 'Разбор треков битмейкинга', streamer: 'BeatKing', viewers: 4532, rating: 4.8, category: 'Музыка', thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=225&fit=crop' },
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

const MOCK_USERS = [
  { id: 1, name: 'Alex_92', avatar: 'A', online: true, lastSeen: 'Онлайн' },
  { id: 2, name: 'MarinaK', avatar: 'M', online: false, lastSeen: '5 мин назад' },
  { id: 3, name: 'GamerPro', avatar: 'G', online: true, lastSeen: 'Онлайн' },
  { id: 4, name: 'CodeGuru', avatar: 'C', online: false, lastSeen: '1 час назад' },
  { id: 5, name: 'ArtMaster', avatar: 'A', online: true, lastSeen: 'Онлайн' },
];

const MOCK_CONVERSATIONS = [
  { userId: 1, messages: [
    { id: 1, text: 'Привет! Как дела?', from: 'Alex_92', timestamp: '14:32' },
    { id: 2, text: 'Отлично! Смотрел твой последний стрим', from: 'Alex_92', timestamp: '14:33' },
  ]},
  { userId: 2, messages: [
    { id: 1, text: 'Спасибо за рейд! 🔥', from: 'MarinaK', timestamp: '12:15' },
  ]},
];

export default function Index() {
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [donationAmount, setDonationAmount] = useState('');
  const [sortBy, setSortBy] = useState<'viewers' | 'rating'>('viewers');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [privateMessage, setPrivateMessage] = useState('');
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);

  const sendPrivateMessage = () => {
    if (privateMessage.trim() && selectedUser !== null) {
      const userConv = conversations.find(c => c.userId === selectedUser);
      const newMsg = {
        id: Date.now(),
        text: privateMessage,
        from: 'Вы',
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      
      if (userConv) {
        setConversations(conversations.map(c => 
          c.userId === selectedUser 
            ? { ...c, messages: [...c.messages, newMsg] }
            : c
        ));
      } else {
        setConversations([...conversations, { userId: selectedUser, messages: [newMsg] }]);
      }
      setPrivateMessage('');
    }
  };

  const categories = ['Все', ...Array.from(new Set(MOCK_STREAMS.map(s => s.category)))];

  const filteredAndSortedStreams = MOCK_STREAMS
    .filter(stream => {
      const matchesCategory = selectedCategory === 'Все' || stream.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stream.streamer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'viewers') return b.viewers - a.viewers;
      return b.rating - a.rating;
    });

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
      <StreamHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        setIsMessagesOpen={setIsMessagesOpen}
        setIsProfileOpen={setIsProfileOpen}
      />

      <main className="container px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <StreamsList
            streams={filteredAndSortedStreams}
            communities={COMMUNITIES}
            categories={categories}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <ChatPanel
            messages={messages}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            sendMessage={sendMessage}
            donationAmount={donationAmount}
            setDonationAmount={setDonationAmount}
            donations={MOCK_DONATIONS}
            setIsProfileOpen={setIsProfileOpen}
          />
        </div>
      </main>

      <Dialogs
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        isMessagesOpen={isMessagesOpen}
        setIsMessagesOpen={setIsMessagesOpen}
        users={MOCK_USERS}
        conversations={conversations}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        privateMessage={privateMessage}
        setPrivateMessage={setPrivateMessage}
        sendPrivateMessage={sendPrivateMessage}
      />
    </div>
  );
}
