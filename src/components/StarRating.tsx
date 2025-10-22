import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  movieId: number;
  currentRating: number;
  totalVotes: number;
  userRating?: number;
  onRate: (movieId: number, rating: number) => void;
}

const StarRating = ({ movieId, currentRating, totalVotes, userRating, onRate }: StarRatingProps) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (rating: number) => {
    onRate(movieId, rating);
  };

  const displayRating = isHovering && hoveredRating > 0 ? hoveredRating : currentRating;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div 
          className="flex gap-1"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoveredRating(0);
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHoveredRating(star)}
              className="transition-transform hover:scale-110 focus:outline-none"
              aria-label={`Оценить ${star} звёзд`}
            >
              <Icon
                name="Star"
                size={24}
                className={cn(
                  "transition-colors",
                  star <= displayRating
                    ? "text-accent fill-accent"
                    : "text-muted-foreground"
                )}
              />
            </button>
          ))}
        </div>
        <div className="text-sm font-medium text-foreground">
          {displayRating.toFixed(1)}
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon name="Users" size={14} />
        <span>{totalVotes} {totalVotes === 1 ? 'оценка' : totalVotes < 5 ? 'оценки' : 'оценок'}</span>
        {userRating && (
          <>
            <span className="mx-1">•</span>
            <span className="text-accent">Ваша оценка: {userRating}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default StarRating;
