import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StarRating from '@/components/StarRating';

const genres = ['Драма', 'Комедия', 'Триллер', 'Фантастика', 'Боевик', 'Мелодрама', 'Ужасы'];
const years = ['2024', '2023', '2022', '2021', '2020', '2019'];

const movies = [
  {
    id: 1,
    title: 'Осенний вальс',
    year: 2023,
    genre: 'Драма',
    actors: 'Алексей Иванов, Мария Петрова',
    description: 'История о двух людях, встретивших друг друга в осеннем парке'
  },
  {
    id: 2,
    title: 'Космическая одиссея',
    year: 2024,
    genre: 'Фантастика',
    actors: 'Дмитрий Сидоров, Анна Смирнова',
    description: 'Путешествие через звёзды в поисках нового дома'
  },
  {
    id: 3,
    title: 'Тайна старого города',
    year: 2023,
    genre: 'Триллер',
    actors: 'Сергей Козлов, Елена Волкова',
    description: 'Детектив раскрывает загадочное преступление'
  },
  {
    id: 4,
    title: 'Смех до слёз',
    year: 2024,
    genre: 'Комедия',
    actors: 'Павел Смирнов, Ольга Иванова',
    description: 'Смешные приключения обычной семьи'
  },
  {
    id: 5,
    title: 'Последний герой',
    year: 2022,
    genre: 'Боевик',
    actors: 'Игорь Петров, Анастасия Николаева',
    description: 'Один против всех в борьбе за справедливость'
  },
  {
    id: 6,
    title: 'Весенние чувства',
    year: 2023,
    genre: 'Мелодрама',
    actors: 'Максим Соколов, Виктория Романова',
    description: 'Романтическая история двух влюблённых'
  }
];

const series = [
  {
    id: 7,
    title: 'Забытые истории',
    year: 2023,
    genre: 'Драма',
    actors: 'Андрей Волков, Светлана Орлова',
    description: 'Многосезонная драма о семейных тайнах'
  },
  {
    id: 8,
    title: 'Детективное агентство',
    year: 2024,
    genre: 'Триллер',
    actors: 'Николай Белов, Ирина Зайцева',
    description: 'Расследования самых запутанных дел'
  },
  {
    id: 9,
    title: 'Параллельные миры',
    year: 2023,
    genre: 'Фантастика',
    actors: 'Владимир Кузнецов, Наталья Морозова',
    description: 'Путешествия между реальностями'
  }
];

const cartoons = [
  {
    id: 10,
    title: 'Приключения медвежонка',
    year: 2024,
    genre: 'Семейный',
    actors: 'Озвучка: Артём Попов',
    description: 'Добрая история о дружбе и приключениях'
  },
  {
    id: 11,
    title: 'Волшебный лес',
    year: 2023,
    genre: 'Фэнтези',
    actors: 'Озвучка: Ева Соколова',
    description: 'Магические существа в удивительном лесу'
  },
  {
    id: 12,
    title: 'Космические друзья',
    year: 2024,
    genre: 'Фантастика',
    actors: 'Озвучка: Кирилл Лебедев',
    description: 'Приключения друзей в далёком космосе'
  }
];

interface UserRating {
  movieId: number;
  rating: number;
}

interface MovieRating {
  totalRating: number;
  totalVotes: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [userRatings, setUserRatings] = useState<UserRating[]>([]);
  const [movieRatings, setMovieRatings] = useState<Record<number, MovieRating>>({
    1: { totalRating: 435, totalVotes: 50 },
    2: { totalRating: 455, totalVotes: 50 },
    3: { totalRating: 415, totalVotes: 50 },
    4: { totalRating: 395, totalVotes: 50 },
    5: { totalRating: 425, totalVotes: 50 },
    6: { totalRating: 400, totalVotes: 50 },
    7: { totalRating: 445, totalVotes: 50 },
    8: { totalRating: 430, totalVotes: 50 },
    9: { totalRating: 460, totalVotes: 50 },
    10: { totalRating: 440, totalVotes: 50 },
    11: { totalRating: 420, totalVotes: 50 },
    12: { totalRating: 405, totalVotes: 50 },
  });

  const handleRate = (movieId: number, rating: number) => {
    const existingRatingIndex = userRatings.findIndex(r => r.movieId === movieId);
    const oldUserRating = existingRatingIndex >= 0 ? userRatings[existingRatingIndex].rating : 0;
    
    if (existingRatingIndex >= 0) {
      const newUserRatings = [...userRatings];
      newUserRatings[existingRatingIndex] = { movieId, rating };
      setUserRatings(newUserRatings);
    } else {
      setUserRatings([...userRatings, { movieId, rating }]);
    }

    setMovieRatings(prev => {
      const current = prev[movieId] || { totalRating: 0, totalVotes: 0 };
      const newTotalRating = current.totalRating - oldUserRating + rating;
      const newTotalVotes = oldUserRating === 0 ? current.totalVotes + 1 : current.totalVotes;
      
      return {
        ...prev,
        [movieId]: {
          totalRating: newTotalRating,
          totalVotes: newTotalVotes,
        },
      };
    });
  };

  const getMovieRating = (movieId: number) => {
    const rating = movieRatings[movieId];
    if (!rating || rating.totalVotes === 0) return 0;
    return rating.totalRating / rating.totalVotes;
  };

  const getUserRating = (movieId: number) => {
    return userRatings.find(r => r.movieId === movieId)?.rating;
  };

  const filterContent = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.actors.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || item.genre === selectedGenre;
      const matchesYear = selectedYear === 'all' || item.year.toString() === selectedYear;
      
      return matchesSearch && matchesGenre && matchesYear;
    });
  };

  const MovieCard = ({ item }: { item: any }) => {
    const rating = getMovieRating(item.id);
    const votes = movieRatings[item.id]?.totalVotes || 0;
    const userRating = getUserRating(item.id);

    return (
      <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Icon name="Film" size={64} className="text-primary/40" />
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-lg mb-3 text-foreground">{item.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Icon name="Calendar" size={16} />
            <span>{item.year}</span>
            <span className="mx-2">•</span>
            <span>{item.genre}</span>
          </div>
          
          <div className="mb-3">
            <StarRating
              movieId={item.id}
              currentRating={rating}
              totalVotes={votes}
              userRating={userRating}
              onRate={handleRate}
            />
          </div>
          
          <div className="text-sm text-muted-foreground flex items-start gap-2 pt-3 border-t border-border">
            <Icon name="Users" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{item.actors}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Icon name="Clapperboard" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">КиноПоиск</h1>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск по названию или актёрам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Жанр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все жанры</SelectItem>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Год" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все годы</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {(searchQuery || selectedGenre !== 'all' || selectedYear !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('all');
                  setSelectedYear('all');
                }}
              >
                <Icon name="X" size={18} />
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="w-full justify-start mb-8 bg-muted/50">
            <TabsTrigger value="movies" className="gap-2">
              <Icon name="Film" size={18} />
              Фильмы
            </TabsTrigger>
            <TabsTrigger value="series" className="gap-2">
              <Icon name="Tv" size={18} />
              Сериалы
            </TabsTrigger>
            <TabsTrigger value="cartoons" className="gap-2">
              <Icon name="Sparkles" size={18} />
              Мультфильмы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movies">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterContent(movies).map(movie => (
                <MovieCard key={movie.id} item={movie} />
              ))}
            </div>
            {filterContent(movies).length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="series">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterContent(series).map(item => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>
            {filterContent(series).length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cartoons">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterContent(cartoons).map(item => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>
            {filterContent(cartoons).length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
