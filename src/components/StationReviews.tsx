import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Star, Send } from 'lucide-react';

interface StationReviewsProps {
  user: User;
}

export function StationReviews({ user }: StationReviewsProps) {
  const [stationName, setStationName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission
    const review = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      stationName,
      rating,
      comment,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Review submitted:', review);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setStationName('');
      setRating(0);
      setComment('');
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <Star className="size-12 text-green-600 mx-auto" />
            <h3>Dziękujemy za opinię!</h3>
            <p className="text-sm text-gray-600">Twoja ocena pomoże innym kierowcom w wyborze najlepszej stacji.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="size-5" />
            Dodaj ocenę stacji
          </CardTitle>
          <CardDescription>
            Podziel się swoim doświadczeniem, aby pomóc innym kierowcom
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stationName">Nazwa stacji</Label>
              <Input
                id="stationName"
                placeholder="np. Orlen - Warszawa Bemowo"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Ocena</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="text-3xl focus:outline-none transition-colors"
                  >
                    <span className={star <= (hoveredRating || rating) ? 'text-yellow-500' : 'text-gray-300'}>
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Komentarz</Label>
              <Textarea
                id="comment"
                placeholder="Opisz swoje doświadczenia ze stacją..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={rating === 0}>
              <Send className="size-4 mr-2" />
              Wyślij opinię
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ostatnie oceny społeczności</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: 'Shell - Kraków Centrum', rating: 4.5, reviewer: 'Piotr K.', comment: 'Czysto, szybka obsługa', date: '2 dni temu' },
            { name: 'Orlen - Gdańsk Port', rating: 5, reviewer: 'Maria W.', comment: 'Najlepsze ceny w okolicy!', date: '5 dni temu' },
            { name: 'BP - Poznań Zachód', rating: 3.5, reviewer: 'Tomasz N.', comment: 'OK, ale mogłoby być taniej', date: '1 tydzień temu' },
          ].map((review, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start justify-between">
                <div>
                  <p>{review.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.floor(review.rating) ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({review.rating})</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>{review.reviewer}</p>
                  <p>{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
