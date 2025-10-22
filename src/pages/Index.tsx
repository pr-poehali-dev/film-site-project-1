import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RatingSystem from '@/components/RatingSystem';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const genres = ['Драма', 'Комедия', 'Триллер', 'Фантастика', 'Боевик', 'Мелодрама', 'Ужасы', 'Детектив'];
const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

const initialMovies = [
  { id: 1, title: 'Закат над океаном', year: 2024, genre: 'Драма', rating: 8.5, actors: 'Иван Иванов, Мария Петрова', totalVotes: 1250, userRating: 0 },
  { id: 2, title: 'Смех сквозь слёзы', year: 2023, genre: 'Комедия', rating: 7.8, actors: 'Пётр Сидоров, Анна Козлова', totalVotes: 890, userRating: 0 },
  { id: 3, title: 'Тайна прошлого', year: 2024, genre: 'Триллер', rating: 8.2, actors: 'Алексей Смирнов, Елена Волкова', totalVotes: 1100, userRating: 0 },
  { id: 4, title: 'Звёздные войны', year: 2022, genre: 'Фантастика', rating: 9.0, actors: 'Дмитрий Орлов, Светлана Новикова', totalVotes: 2340, userRating: 0 },
];

const initialSeries = [
  { id: 5, title: 'Последний день', year: 2024, genre: 'Драма', rating: 8.7, actors: 'Владимир Соколов, Ольга Романова', totalVotes: 1560, userRating: 0 },
  { id: 6, title: 'Офис навсегда', year: 2023, genre: 'Комедия', rating: 8.0, actors: 'Андрей Белов, Наталья Зайцева', totalVotes: 980, userRating: 0 },
  { id: 7, title: 'Тёмные улицы', year: 2024, genre: 'Детектив', rating: 8.4, actors: 'Сергей Морозов, Татьяна Лебедева', totalVotes: 1340, userRating: 0 },
];

const initialCartoons = [
  { id: 8, title: 'Приключения котёнка', year: 2024, genre: 'Семейный', rating: 8.9, actors: 'Озвучка: Михаил Попов', totalVotes: 2100, userRating: 0 },
  { id: 9, title: 'Волшебный лес', year: 2023, genre: 'Фэнтези', rating: 8.5, actors: 'Озвучка: Екатерина Соловьёва', totalVotes: 1780, userRating: 0 },
  { id: 10, title: 'Космические друзья', year: 2024, genre: 'Фантастика', rating: 8.8, actors: 'Озвучка: Игорь Васильев', totalVotes: 1920, userRating: 0 },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedActor, setSelectedActor] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [moviesData, setMoviesData] = useState(initialMovies);
  const [seriesData, setSeriesData] = useState(initialSeries);
  const [cartoonsData, setCartoonsData] = useState(initialCartoons);

  const handleRate = (itemId: number, rating: number, type: 'movies' | 'series' | 'cartoons') => {
    const updateData = (items: any[]) => {
      return items.map(item => {
        if (item.id === itemId) {
          const newTotalVotes = item.totalVotes + (item.userRating > 0 ? 0 : 1);
          const totalRating = item.rating * item.totalVotes - (item.userRating || 0) + rating;
          const newRating = totalRating / newTotalVotes;
          return { ...item, rating: newRating, userRating: rating, totalVotes: newTotalVotes };
        }
        return item;
      });
    };

    if (type === 'movies') {
      const updated = updateData(moviesData);
      setMoviesData(updated);
      if (selectedMovie && selectedMovie.id === itemId) {
        setSelectedMovie({ ...updated.find(item => item.id === itemId), type });
      }
    }
    if (type === 'series') {
      const updated = updateData(seriesData);
      setSeriesData(updated);
      if (selectedMovie && selectedMovie.id === itemId) {
        setSelectedMovie({ ...updated.find(item => item.id === itemId), type });
      }
    }
    if (type === 'cartoons') {
      const updated = updateData(cartoonsData);
      setCartoonsData(updated);
      if (selectedMovie && selectedMovie.id === itemId) {
        setSelectedMovie({ ...updated.find(item => item.id === itemId), type });
      }
    }
  };

  const filterContent = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.actors.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || item.genre === selectedGenre;
      const matchesYear = selectedYear === 'all' || item.year.toString() === selectedYear;
      const matchesActor = !selectedActor || item.actors.toLowerCase().includes(selectedActor.toLowerCase());
      
      return matchesSearch && matchesGenre && matchesYear && matchesActor;
    });
  };

  const MovieCard = ({ item, type }: { item: any; type: 'movies' | 'series' | 'cartoons' }) => (
    <div 
      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => setSelectedMovie({ ...item, type })}
    >
      <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <Icon name="Film" size={64} className="text-primary/40" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Icon name="Calendar" size={16} />
          <span>{item.year}</span>
          <span className="mx-2">•</span>
          <span>{item.genre}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Icon name="Star" size={16} className="text-accent fill-accent" />
          <span className="font-medium">{item.rating.toFixed(1)}</span>
          <span className="text-xs">({item.totalVotes})</span>
        </div>
        <div className="text-sm text-muted-foreground flex items-start gap-2">
          <Icon name="Users" size={16} className="mt-0.5 flex-shrink-0" />
          <span>{item.actors}</span>
        </div>
      </div>
    </div>
  );

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
                  setSelectedActor('');
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
              {filterContent(moviesData).map(movie => (
                <MovieCard key={movie.id} item={movie} type="movies" />
              ))}
            </div>
            {filterContent(moviesData).length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="series">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterContent(seriesData).map(item => (
                <MovieCard key={item.id} item={item} type="series" />
              ))}
            </div>
            {filterContent(seriesData).length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cartoons">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filterContent(cartoonsData).map(item => (
                <MovieCard key={item.id} item={item} type="cartoons" />
              ))}
            </div>
            {filterContent(cartoonsData).length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Ничего не найдено</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedMovie?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedMovie && (
            <div className="space-y-6">
              <div className="h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <Icon name="Film" size={96} className="text-primary/40" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Год:</span>
                  <p className="font-medium">{selectedMovie.year}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Жанр:</span>
                  <p className="font-medium">{selectedMovie.genre}</p>
                </div>
              </div>

              <div>
                <span className="text-sm text-muted-foreground">Актёры:</span>
                <p className="font-medium mt-1">{selectedMovie.actors}</p>
              </div>

              <div className="border-t pt-6">
                <RatingSystem
                  itemId={selectedMovie.id}
                  initialRating={selectedMovie.rating}
                  userRating={selectedMovie.userRating}
                  totalVotes={selectedMovie.totalVotes}
                  onRate={(rating) => handleRate(selectedMovie.id, rating, selectedMovie.type)}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
