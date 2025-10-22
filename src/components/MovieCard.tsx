import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Movie {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating: number;
  image: string;
  actors: string[];
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-border">
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center gap-1 font-semibold text-sm">
          <Icon name="Star" size={14} />
          {movie.rating}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.genre}</span>
        </div>
        {movie.actors.length > 0 && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {movie.actors.join(", ")}
          </p>
        )}
      </div>
    </Card>
  );
};

export default MovieCard;
