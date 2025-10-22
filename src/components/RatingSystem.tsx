import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RatingSystemProps {
  itemId: number;
  initialRating: number;
  userRating?: number;
  totalVotes: number;
  onRate: (rating: number) => void;
}

const RatingSystem = ({ itemId, initialRating, userRating, totalVotes, onRate }: RatingSystemProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [showVoteMessage, setShowVoteMessage] = useState(false);

  const handleStarClick = (rating: number) => {
    onRate(rating);
    setShowVoteMessage(true);
    setTimeout(() => setShowVoteMessage(false), 2000);
  };

  const displayRating = hoveredStar || userRating || 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Icon name="Star" size={20} className="text-accent fill-accent" />
          <span className="font-semibold text-lg text-foreground">{initialRating.toFixed(1)}</span>
        </div>
        <span className="text-sm text-muted-foreground">({totalVotes} оценок)</span>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">
          {userRating ? 'Ваша оценка:' : 'Оцените:'}
        </p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(null)}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <Icon
                name="Star"
                size={24}
                className={cn(
                  "transition-colors",
                  star <= displayRating
                    ? "text-accent fill-accent"
                    : "text-muted-foreground/30"
                )}
              />
            </button>
          ))}
          {displayRating > 0 && (
            <span className="ml-2 text-sm font-medium text-foreground">{displayRating}</span>
          )}
        </div>
      </div>

      {showVoteMessage && (
        <div className="text-sm text-accent animate-fade-in">
          ✓ Ваша оценка сохранена
        </div>
      )}
    </div>
  );
};

export default RatingSystem;
