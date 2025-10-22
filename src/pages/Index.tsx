import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const genres = ['Драма', 'Комедия', 'Триллер', 'Фантастика', 'Боевик', 'Мелодрама', 'Ужасы', 'Детектив', 'Семейный', 'Фэнтези'];
const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];

const movies = [
  {
    id: 1,
    title: 'Закат над океаном',
    year: 2024,
    genre: 'Драма',
    rating: 8.5,
    actors: 'Иван Иванов, Мария Петрова, Алексей Смирнов',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=1200&fit=crop',
    description: 'История о семье рыбаков на побережье, которые сталкиваются с трудностями современной жизни. Потрясающая кинематография и глубокие персонажи делают этот фильм незабываемым.',
  },
  {
    id: 2,
    title: 'Смех сквозь слёзы',
    year: 2023,
    genre: 'Комедия',
    rating: 7.8,
    actors: 'Пётр Сидоров, Анна Козлова, Елена Волкова',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1200&fit=crop',
    description: 'Веселая комедия о группе друзей, которые решают открыть свой театр. Искренние эмоции и отличный юмор гарантированы.',
  },
  {
    id: 3,
    title: 'Тайна прошлого',
    year: 2024,
    genre: 'Триллер',
    rating: 8.2,
    actors: 'Алексей Смирнов, Елена Волкова, Дмитрий Орлов',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=1200&fit=crop',
    description: 'Детектив расследует серию загадочных исчезновений, которые связаны с событиями 30-летней давности. Напряжение не отпускает до последней минуты.',
  },
  {
    id: 4,
    title: 'Звёздные войны: Новая эра',
    year: 2022,
    genre: 'Фантастика',
    rating: 9.0,
    actors: 'Дмитрий Орлов, Светлана Новикова, Владимир Соколов',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&h=1200&fit=crop',
    description: 'Эпическая космическая сага о борьбе человечества за выживание в далекой галактике. Потрясающие спецэффекты и захватывающий сюжет.',
  },
  {
    id: 5,
    title: 'Город теней',
    year: 2023,
    genre: 'Боевик',
    rating: 7.9,
    actors: 'Сергей Морозов, Ольга Романова, Андрей Белов',
    image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&h=1200&fit=crop',
    description: 'Бывший спецназовец вынужден вернуться к своему прошлому, чтобы спасти город от криминального синдиката. Динамичные сцены боя и напряженный сюжет.',
  },
  {
    id: 6,
    title: 'Сердца в унисон',
    year: 2024,
    genre: 'Мелодрама',
    rating: 8.1,
    actors: 'Наталья Зайцева, Михаил Попов, Татьяна Лебедева',
    image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=1200&fit=crop',
    description: 'Трогательная история любви двух музыкантов, которые встречаются на конкурсе. Прекрасная музыка и искренние чувства.',
  },
  {
    id: 7,
    title: 'Проклятый особняк',
    year: 2023,
    genre: 'Ужасы',
    rating: 7.5,
    actors: 'Игорь Васильев, Екатерина Соловьёва, Иван Иванов',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
    description: 'Группа друзей решает провести ночь в заброшенном особняке, не подозревая о его мрачной истории. Атмосфера ужаса не отпускает ни на минуту.',
  },
  {
    id: 8,
    title: 'Последняя улика',
    year: 2024,
    genre: 'Детектив',
    rating: 8.4,
    actors: 'Владимир Соколов, Мария Петрова, Пётр Сидоров',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=1200&fit=crop',
    description: 'Опытный детектив расследует дело о краже произведений искусства. Запутанный сюжет с неожиданными поворотами.',
  },
];

const series = [
  {
    id: 9,
    title: 'Последний день',
    year: 2024,
    genre: 'Драма',
    rating: 8.7,
    actors: 'Владимир Соколов, Ольга Романова, Сергей Морозов',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop',
    description: 'Многосерийная драма о врачах скорой помощи, которые каждый день спасают жизни. Реалистичные истории и глубокие персонажи.',
  },
  {
    id: 10,
    title: 'Офис навсегда',
    year: 2023,
    genre: 'Комедия',
    rating: 8.0,
    actors: 'Андрей Белов, Наталья Зайцева, Михаил Попов',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=1200&fit=crop',
    description: 'Забавный сериал о буднях сотрудников маленькой компании. Живой юмор и узнаваемые ситуации.',
  },
  {
    id: 11,
    title: 'Тёмные улицы',
    year: 2024,
    genre: 'Детектив',
    rating: 8.4,
    actors: 'Сергей Морозов, Татьяна Лебедева, Алексей Смирнов',
    image: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=800&h=1200&fit=crop',
    description: 'Детективный сериал о расследовании серии загадочных преступлений в большом городе. Напряжение в каждой серии.',
  },
  {
    id: 12,
    title: 'Империя бизнеса',
    year: 2023,
    genre: 'Драма',
    rating: 8.6,
    actors: 'Дмитрий Орлов, Светлана Новикова, Иван Иванов',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=1200&fit=crop',
    description: 'История создания крупнейшей корпорации и борьбы за власть внутри семьи основателей. Интриги и драма на высшем уровне.',
  },
  {
    id: 13,
    title: 'Космическая одиссея',
    year: 2024,
    genre: 'Фантастика',
    rating: 9.1,
    actors: 'Екатерина Соловьёва, Игорь Васильев, Елена Волкова',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=1200&fit=crop',
    description: 'Эпический сериал о первой экспедиции человечества к далеким звездам. Масштабная история с философским подтекстом.',
  },
  {
    id: 14,
    title: 'Королева сердец',
    year: 2023,
    genre: 'Мелодрама',
    rating: 7.7,
    actors: 'Мария Петрова, Пётр Сидоров, Анна Козлова',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1200&fit=crop',
    description: 'Романтический сериал о жизни и любви в высшем свете. Красивые наряды и запутанные отношения.',
  },
];

const cartoons = [
  {
    id: 15,
    title: 'Приключения котёнка',
    year: 2024,
    genre: 'Семейный',
    rating: 8.9,
    actors: 'Озвучка: Михаил Попов, Наталья Зайцева',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=1200&fit=crop',
    description: 'Добрый мультфильм о котенке, который отправляется в невероятное путешествие, чтобы найти свою семью. Яркая анимация и трогательная история.',
  },
  {
    id: 16,
    title: 'Волшебный лес',
    year: 2023,
    genre: 'Фэнтези',
    rating: 8.5,
    actors: 'Озвучка: Екатерина Соловьёва, Игорь Васильев',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=1200&fit=crop',
    description: 'Магическая история о лесных существах, которые защищают свой дом от злых сил. Красочная анимация и захватывающий сюжет.',
  },
  {
    id: 17,
    title: 'Космические друзья',
    year: 2024,
    genre: 'Фантастика',
    rating: 8.8,
    actors: 'Озвучка: Игорь Васильев, Владимир Соколов',
    image: 'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?w=800&h=1200&fit=crop',
    description: 'Веселый мультфильм о приключениях инопланетных друзей в космосе. Яркие персонажи и увлекательные приключения.',
  },
  {
    id: 18,
    title: 'Сказки старого города',
    year: 2023,
    genre: 'Семейный',
    rating: 8.3,
    actors: 'Озвучка: Андрей Белов, Ольга Романова',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=1200&fit=crop',
    description: 'Мультфильм о волшебных историях, которые происходят в старинном городе. Атмосферная графика и добрые истории.',
  },
  {
    id: 19,
    title: 'Подводное царство',
    year: 2024,
    genre: 'Семейный',
    rating: 9.0,
    actors: 'Озвучка: Светлана Новикова, Дмитрий Орлов',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1200&fit=crop',
    description: 'Потрясающий мультфильм о жизни морских обитателей и их приключениях. Невероятная анимация подводного мира.',
  },
  {
    id: 20,
    title: 'Драконы и рыцари',
    year: 2023,
    genre: 'Фэнтези',
    rating: 8.7,
    actors: 'Озвучка: Сергей Морозов, Татьяна Лебедева',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=1200&fit=crop',
    description: 'Эпический мультфильм о дружбе дракона и юного рыцаря. Впечатляющие боевые сцены и трогательная история.',
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [actorSearch, setActorSearch] = useState('');

  const filterContent = (items: typeof movies) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || item.genre === selectedGenre;
      const matchesYear = selectedYear === 'all' || item.year.toString() === selectedYear;
      const matchesActor = !actorSearch || item.actors.toLowerCase().includes(actorSearch.toLowerCase());
      
      return matchesSearch && matchesGenre && matchesYear && matchesActor;
    });
  };

  const filteredMovies = filterContent(movies);
  const filteredSeries = filterContent(series);
  const filteredCartoons = filterContent(cartoons);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('all');
    setSelectedYear('all');
    setActorSearch('');
  };

  const hasActiveFilters = searchQuery || selectedGenre !== 'all' || selectedYear !== 'all' || actorSearch;

  const MovieCard = ({ item }: { item: typeof movies[0] }) => (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in bg-gradient-to-br from-card to-card/80">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-sm line-clamp-3">{item.description}</p>
          </div>
        </div>
        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
          <Icon name="Star" size={14} className="mr-1" />
          {item.rating.toFixed(1)}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span>{item.year}</span>
            <span className="mx-1">•</span>
            <Badge variant="secondary" className="text-xs">
              {item.genre}
            </Badge>
          </div>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} className="mt-0.5 text-primary flex-shrink-0" />
            <span className="line-clamp-2">{item.actors}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-2xl shadow-lg">
              <Icon name="Film" size={40} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              CINEMA
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative md:col-span-2 lg:col-span-1">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary transition-colors"
              />
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary">
                <Icon name="Film" size={16} className="mr-2 text-primary" />
                <SelectValue placeholder="Все жанры" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все жанры</SelectItem>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-background/50 border-primary/20 focus:border-primary">
                <Icon name="Calendar" size={16} className="mr-2 text-primary" />
                <SelectValue placeholder="Все годы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все годы</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Icon name="Users" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по актёрам..."
                value={actorSearch}
                onChange={(e) => setActorSearch(e.target.value)}
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex justify-center animate-fade-in">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="border-primary/30 hover:bg-primary/10 hover:border-primary"
              >
                <Icon name="X" size={16} className="mr-2" />
                Сбросить фильтры
              </Button>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-14 bg-card/50 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
            <TabsTrigger 
              value="movies" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white font-semibold text-lg transition-all duration-300"
            >
              <Icon name="Film" size={20} className="mr-2" />
              Фильмы
            </TabsTrigger>
            <TabsTrigger 
              value="series"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white font-semibold text-lg transition-all duration-300"
            >
              <Icon name="Tv" size={20} className="mr-2" />
              Сериалы
            </TabsTrigger>
            <TabsTrigger 
              value="cartoons"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white font-semibold text-lg transition-all duration-300"
            >
              <Icon name="Sparkles" size={20} className="mr-2" />
              Мультфильмы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movies" className="mt-0">
            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} item={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="series" className="mt-0">
            {filteredSeries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredSeries.map((serie) => (
                  <MovieCard key={serie.id} item={serie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cartoons" className="mt-0">
            {filteredCartoons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCartoons.map((cartoon) => (
                  <MovieCard key={cartoon.id} item={cartoon} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-card/50 backdrop-blur-sm border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
                <Icon name="Film" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">CINEMA</h3>
                <p className="text-sm text-muted-foreground">Лучшие фильмы и сериалы</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2024 CINEMA. Все права защищены.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Создано с любовью к кино
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
