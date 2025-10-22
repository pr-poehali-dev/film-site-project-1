import { useMemo } from "react";
import MovieCard from "@/components/MovieCard";

interface MovieGridProps {
  activeSection: "movies" | "series" | "cartoons";
  selectedGenre: string;
  selectedYear: string;
  searchQuery: string;
}

interface Movie {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating: number;
  image: string;
  actors: string[];
  section: "movies" | "series" | "cartoons";
}

const mockMovies: Movie[] = [
  { id: 1, title: "Интерстеллар", year: "2014", genre: "Фантастика", rating: 8.6, image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1", actors: ["Мэттью МакКонахи", "Энн Хэтэуэй"], section: "movies" },
  { id: 2, title: "Начало", year: "2010", genre: "Фантастика", rating: 8.8, image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26", actors: ["Леонардо ДиКаприо", "Том Харди"], section: "movies" },
  { id: 3, title: "Тёмный рыцарь", year: "2008", genre: "Боевик", rating: 9.0, image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb", actors: ["Кристиан Бэйл", "Хит Леджер"], section: "movies" },
  { id: 4, title: "Во все тяжкие", year: "2008", genre: "Драма", rating: 9.5, image: "https://images.unsplash.com/photo-1594908900066-3f47337549d8", actors: ["Брайан Крэнстон", "Аарон Пол"], section: "series" },
  { id: 5, title: "Очень странные дела", year: "2016", genre: "Фантастика", rating: 8.7, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba", actors: ["Милли Бобби Браун", "Финн Вулфхард"], section: "series" },
  { id: 6, title: "Игра престолов", year: "2011", genre: "Драма", rating: 9.3, image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff", actors: ["Эмилия Кларк", "Кит Харингтон"], section: "series" },
  { id: 7, title: "Головоломка", year: "2015", genre: "Приключения", rating: 8.1, image: "https://images.unsplash.com/photo-1516641051054-9df6a1aad654", actors: [], section: "cartoons" },
  { id: 8, title: "Зверополис", year: "2016", genre: "Комедия", rating: 8.0, image: "https://images.unsplash.com/photo-1574267432644-f610cab7dc2d", actors: [], section: "cartoons" },
  { id: 9, title: "Унесённые призраками", year: "2001", genre: "Приключения", rating: 8.6, image: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64", actors: [], section: "cartoons" },
  { id: 10, title: "Побег из Шоушенка", year: "1994", genre: "Драма", rating: 9.3, image: "https://images.unsplash.com/photo-1574267432644-f610cab7dc2d", actors: ["Тим Роббинс", "Морган Фриман"], section: "movies" },
  { id: 11, title: "Криминальное чтivo", year: "1994", genre: "Драма", rating: 8.9, image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b", actors: ["Джон Траволта", "Сэмюэл Л. Джексон"], section: "movies" },
  { id: 12, title: "Форрест Гамп", year: "1994", genre: "Драма", rating: 8.8, image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba", actors: ["Том Хэнкс"], section: "movies" },
];

const MovieGrid = ({ activeSection, selectedGenre, selectedYear, searchQuery }: MovieGridProps) => {
  const filteredMovies = useMemo(() => {
    return mockMovies.filter((movie) => {
      const matchesSection = movie.section === activeSection;
      const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre;
      const matchesYear = selectedYear === "all" || movie.year === selectedYear;
      const matchesSearch = 
        searchQuery === "" ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.actors.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSection && matchesGenre && matchesYear && matchesSearch;
    });
  }, [activeSection, selectedGenre, selectedYear, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground">
          Найдено: {filteredMovies.length}
        </h3>
      </div>
      
      {filteredMovies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            По вашему запросу ничего не найдено
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
