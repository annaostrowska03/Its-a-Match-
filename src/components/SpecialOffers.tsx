import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tag, Plus, Trash2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface SpecialOffersProps {
  user: User;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  target: string;
  validUntil: string;
}

export function SpecialOffers({ user }: SpecialOffersProps) {
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      title: 'Rabat 0.20 zł/L na paliwo',
      description: 'Tankuj minimum 40L i otrzymaj rabat',
      discount: '0.20',
      target: 'all',
      validUntil: '2025-12-31',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discount: '',
    target: 'all',
    validUntil: '',
  });

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newOffer.discount || parseFloat(newOffer.discount) <= 0) {
      alert('Błąd: Pole rabatu musi być uzupełnione wartością większą niż 0');
      return;
    }
    
    if (!newOffer.validUntil) {
      alert('Błąd: Musisz określić datę zakończenia oferty');
      return;
    }
    
    const offer: Offer = {
      id: Math.random().toString(36).substr(2, 9),
      ...newOffer,
    };
    
    setOffers([...offers, offer]);
    setNewOffer({
      title: '',
      description: '',
      discount: '',
      target: 'all',
      validUntil: '',
    });
    setShowForm(false);
  };

  const handleDeleteOffer = (id: string) => {
    setOffers(offers.filter(offer => offer.id !== id));
  };

  const getTargetLabel = (target: string) => {
    switch (target) {
      case 'all':
        return 'Wszyscy użytkownicy';
      case 'premium':
        return 'Tylko Premium';
      case 'electric':
        return 'Pojazdy elektryczne';
      case 'diesel':
        return 'Pojazdy diesel';
      default:
        return target;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Tag className="size-5" />
                Specjalne oferty
              </CardTitle>
              <CardDescription>
                Twórz oferty dla użytkowników, aby zwiększyć konwersję
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="size-4 mr-2" />
              Dodaj ofertę
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showForm && (
            <form onSubmit={handleAddOffer} className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tytuł oferty</Label>
                <Input
                  id="title"
                  placeholder="np. Rabat 0.20 zł/L na paliwo"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Opis</Label>
                <Textarea
                  id="description"
                  placeholder="Opisz szczegóły oferty..."
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">Rabat (zł/L)</Label>
                  <Input
                    id="discount"
                    type="number"
                    step="0.01"
                    placeholder="0.20"
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validUntil">Ważne do</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={newOffer.validUntil}
                    onChange={(e) => setNewOffer({ ...newOffer, validUntil: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target">Grupa docelowa</Label>
                <select
                  id="target"
                  className="w-full p-2 border rounded-md"
                  value={newOffer.target}
                  onChange={(e) => setNewOffer({ ...newOffer, target: e.target.value })}
                >
                  <option value="all">Wszyscy użytkownicy</option>
                  <option value="premium">Tylko użytkownicy Premium</option>
                  <option value="electric">Pojazdy elektryczne</option>
                  <option value="diesel">Pojazdy diesel</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Dodaj ofertę</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Anuluj
                </Button>
              </div>
            </form>
          )}

          {offers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Tag className="size-12 mx-auto mb-2 text-gray-300" />
              <p>Brak aktywnych ofert</p>
              <p className="text-sm">Kliknij "Dodaj ofertę", aby stworzyć pierwszą promocję</p>
            </div>
          ) : (
            <div className="space-y-3">
              {offers.map((offer) => (
                <div key={offer.id} className="border p-4 rounded-lg bg-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4>{offer.title}</h4>
                        <Badge variant="outline">{getTargetLabel(offer.target)}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span className="text-green-600">-{offer.discount} zł/L</span>
                        <span className="text-gray-500">Ważne do: {offer.validUntil}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteOffer(offer.id)}
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statystyki ofert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl">{offers.length}</p>
              <p className="text-sm text-gray-600">Aktywne oferty</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl">342</p>
              <p className="text-sm text-gray-600">Wyświetlenia</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl">28</p>
              <p className="text-sm text-gray-600">Wykorzystane</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}