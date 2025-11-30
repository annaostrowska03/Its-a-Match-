import { useState, useEffect } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Save } from 'lucide-react';

interface UserPreferencesProps {
  user: User;
  updatePreferences: (preferences: User['preferences']) => void;
  isPremium: boolean;
}

export function UserPreferences({ user, updatePreferences, isPremium }: UserPreferencesProps) {
  const [fuelType, setFuelType] = useState(user.preferences?.fuelType || '');
  const [routeType, setRouteType] = useState(user.preferences?.routeType || 'fastest');
  const [maxResults, setMaxResults] = useState(user.preferences?.maxResults || 3);
  const [vehicleType, setVehicleType] = useState(user.preferences?.vehicleType || '');
  const [fuelConsumption, setFuelConsumption] = useState(user.preferences?.fuelConsumption || '');
  const [tankCapacity, setTankCapacity] = useState(user.preferences?.tankCapacity || '');

  const handleSave = () => {
    // Validation
    if (fuelConsumption && (parseFloat(fuelConsumption) < 0 || parseFloat(fuelConsumption) > 50)) {
      alert('Błąd walidacji: Spalanie musi być wartością od 0 do 50 l/100km');
      return;
    }
    
    if (tankCapacity && (parseFloat(tankCapacity) < 0 || parseFloat(tankCapacity) > 200)) {
      alert('Błąd walidacji: Pojemność baku musi być wartością od 0 do 200 litrów');
      return;
    }
    
    updatePreferences({
      fuelType,
      routeType: isPremium ? routeType : undefined,
      maxResults: isPremium ? maxResults : undefined,
      vehicleType,
      fuelConsumption,
      tankCapacity,
    });
    alert('Preferencje zostały zapisane!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Podstawowe preferencje</CardTitle>
          <CardDescription>Ustawienia dostępne dla wszystkich użytkowników</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fuelType">Rodzaj paliwa</Label>
            <select
              id="fuelType"
              className="w-full p-2 border rounded-md"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="">Wybierz rodzaj paliwa</option>
              <option value="pb95">Benzyna 95</option>
              <option value="pb98">Benzyna 98</option>
              <option value="diesel">Diesel</option>
              <option value="lpg">LPG</option>
              <option value="electric">Elektryczny</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {isPremium && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle>Dodatkowe preferencje Premium</CardTitle>
            <CardDescription>Zaawansowane ustawienia dla użytkowników Premium</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="routeType">Typ trasy</Label>
              <select
                id="routeType"
                className="w-full p-2 border rounded-md"
                value={routeType}
                onChange={(e) => setRouteType(e.target.value)}
              >
                <option value="fastest">Najszybsza</option>
                <option value="shortest">Najkrótsza</option>
                <option value="cheapest">Najtańsza</option>
                <option value="scenic">Malownicza</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxResults">Liczba wyników tras</Label>
              <select
                id="maxResults"
                className="w-full p-2 border rounded-md"
                value={maxResults}
                onChange={(e) => setMaxResults(Number(e.target.value))}
              >
                <option value="3">3 warianty</option>
                <option value="5">5 wariantów</option>
                <option value="7">7 wariantów</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicleType">Typ pojazdu</Label>
              <select
                id="vehicleType"
                className="w-full p-2 border rounded-md"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Wybierz typ pojazdu</option>
                <option value="car">Samochód osobisty</option>
                <option value="truck">Ciężarówka</option>
                <option value="motorcycle">Motocykl</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelConsumption">Spalanie paliwa (l/100km)</Label>
              <input
                id="fuelConsumption"
                className="w-full p-2 border rounded-md"
                type="number"
                value={fuelConsumption}
                onChange={(e) => setFuelConsumption(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tankCapacity">Pojemność zbiornika (l)</Label>
              <input
                id="tankCapacity"
                className="w-full p-2 border rounded-md"
                type="number"
                value={tankCapacity}
                onChange={(e) => setTankCapacity(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Button onClick={handleSave} className="w-full">
        <Save className="size-4 mr-2" />
        Zapisz preferencje
      </Button>
    </div>
  );
}