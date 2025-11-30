import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MapPin, Car, Fuel, Navigation, TrendingUp, Crown } from 'lucide-react';
import { Badge } from './ui/badge';

interface PremiumRouteInputProps {
  user: User;
}

export function PremiumRouteInput({ user }: PremiumRouteInputProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState(user.preferences?.vehicleType || '');
  const [fuelConsumption, setFuelConsumption] = useState(user.preferences?.fuelConsumption || '');
  const [tankCapacity, setTankCapacity] = useState(user.preferences?.tankCapacity || '');
  const [currentFuel, setCurrentFuel] = useState('');
  const [routes, setRoutes] = useState<any[]>([]);

  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock multiple route calculations for premium users
    const mockRoutes = [
      {
        id: 1,
        type: 'Najszybsza',
        distance: 342,
        duration: 240,
        fuelNeeded: 27.4,
        totalCost: 177.83,
        recommendedStation: {
          name: 'Orlen - Warszawa Bemowo',
          address: 'ul. Powstańców Śląskich 126',
          price: 6.49,
          distance: 156,
          savings: 15.80,
          rating: 4.5,
        },
      },
      {
        id: 2,
        type: 'Najtańsza',
        distance: 358,
        duration: 255,
        fuelNeeded: 28.6,
        totalCost: 168.52,
        recommendedStation: {
          name: 'Circle K - Łódź Centrum',
          address: 'ul. Piotrkowska 102',
          price: 5.89,
          distance: 142,
          savings: 24.40,
          rating: 4.3,
        },
      },
      {
        id: 3,
        type: 'Najkrótsza',
        distance: 335,
        duration: 248,
        fuelNeeded: 26.8,
        totalCost: 174.18,
        recommendedStation: {
          name: 'Shell - Toruń Wschód',
          address: 'ul. Grudziądzka 45',
          price: 6.50,
          distance: 168,
          savings: 12.50,
          rating: 4.7,
        },
      },
    ];
    
    setRoutes(mockRoutes);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-lg border border-amber-200">
        <div className="flex items-center gap-2">
          <Crown className="size-5 text-amber-600" />
          <p className="text-sm">Jako użytkownik Premium masz dostęp do wielu wariantów trasy!</p>
        </div>
      </div>

      <form onSubmit={handleCalculateRoute} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin">Punkt początkowy</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input
                id="origin"
                placeholder="Warszawa, Krakowskie Przedmieście"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="destination">Punkt docelowy</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 size-4 text-gray-400" />
              <Input
                id="destination"
                placeholder="Gdańsk, Długi Targ"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>

        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="size-5" />
              Parametry pojazdu
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicleType">Typ pojazdu</Label>
              <select
                id="vehicleType"
                className="w-full p-2 border rounded-md"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
              >
                <option value="">Wybierz typ</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="van">Van</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelConsumption">Spalanie (l/100km)</Label>
              <Input
                id="fuelConsumption"
                type="number"
                step="0.1"
                placeholder="6.5"
                value={fuelConsumption}
                onChange={(e) => setFuelConsumption(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tankCapacity">Pojemność baku (l)</Label>
              <Input
                id="tankCapacity"
                type="number"
                placeholder="50"
                value={tankCapacity}
                onChange={(e) => setTankCapacity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentFuel">Aktualny stan paliwa (%)</Label>
              <Input
                id="currentFuel"
                type="number"
                min="0"
                max="100"
                placeholder="50"
                value={currentFuel}
                onChange={(e) => setCurrentFuel(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
          <Navigation className="size-4 mr-2" />
          Oblicz warianty trasy
        </Button>
      </form>

      {routes.length > 0 && (
        <div className="space-y-4">
          <h3 className="flex items-center gap-2">
            <Crown className="size-5 text-amber-600" />
            Dostępne warianty tras
          </h3>
          
          {routes.map((route) => (
            <Card key={route.id} className="border-amber-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Fuel className="size-5" />
                    {route.type}
                  </CardTitle>
                  <Badge variant="outline" className="border-amber-300">
                    {route.totalCost.toFixed(2)} zł całkowity koszt
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl">{route.distance} km</p>
                    <p className="text-sm text-gray-600">Dystans</p>
                  </div>
                  <div>
                    <p className="text-2xl">{Math.floor(route.duration / 60)}h {route.duration % 60}min</p>
                    <p className="text-sm text-gray-600">Czas</p>
                  </div>
                  <div>
                    <p className="text-2xl">{route.fuelNeeded} L</p>
                    <p className="text-sm text-gray-600">Paliwo</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="flex items-center gap-2">
                        <Fuel className="size-4" />
                        {route.recommendedStation.name}
                      </p>
                      <p className="text-sm text-gray-600">{route.recommendedStation.address}</p>
                      <p className="text-sm text-gray-600">Po {route.recommendedStation.distance} km</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < Math.floor(route.recommendedStation.rating) ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({route.recommendedStation.rating})</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl">{route.recommendedStation.price} zł/L</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <TrendingUp className="size-3" />
                        Oszczędzasz {route.recommendedStation.savings} zł
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                  onClick={() => {
                    const stationAddress = encodeURIComponent(route.recommendedStation.address);
                    const startAddress = encodeURIComponent(origin);
                    const endAddress = encodeURIComponent(destination);
                    window.open(`https://www.google.com/maps/dir/${startAddress}/${stationAddress}/${endAddress}`, '_blank');
                  }}
                >
                  <Navigation className="size-4 mr-2" />
                  Nawiguj do stacji
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}