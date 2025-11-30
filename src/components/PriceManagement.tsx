import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { DollarSign, Save, TrendingUp, TrendingDown } from 'lucide-react';

interface PriceManagementProps {
  user: User;
}

export function PriceManagement({ user }: PriceManagementProps) {
  const [prices, setPrices] = useState({
    pb95: '6.49',
    pb98: '7.12',
    diesel: '6.38',
    lpg: '3.15',
  });

  const [availability, setAvailability] = useState({
    pb95: true,
    pb98: true,
    diesel: true,
    lpg: true,
  });

  const handlePriceChange = (fuelType: string, value: string) => {
    setPrices({ ...prices, [fuelType]: value });
  };

  const handleAvailabilityChange = (fuelType: string) => {
    setAvailability({ ...availability, [fuelType]: !availability[fuelType] });
  };

  const handleSave = () => {
    const priceData = {
      stationId: user.id,
      stationName: user.name,
      prices,
      availability,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Prices updated:', priceData);
    alert('Ceny zostały zaktualizowane!');
  };

  const fuelTypes = [
    { key: 'pb95', name: 'Benzyna 95', avgPrice: 6.52, trend: 'down' },
    { key: 'pb98', name: 'Benzyna 98', avgPrice: 7.18, trend: 'up' },
    { key: 'diesel', name: 'Diesel', avgPrice: 6.41, trend: 'down' },
    { key: 'lpg', name: 'LPG', avgPrice: 3.18, trend: 'up' },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="size-5" />
            Aktualizuj ceny paliwa
          </CardTitle>
          <CardDescription>
            Wprowadź aktualne ceny w Twojej stacji, aby być uwzględnionym w rekomendacjach
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {fuelTypes.map((fuel) => (
            <div key={fuel.key} className="bg-white p-4 rounded-lg border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor={fuel.key}>{fuel.name}</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">Średnia: {fuel.avgPrice} zł/L</span>
                    {fuel.trend === 'up' ? (
                      <TrendingUp className="size-4 text-red-500" />
                    ) : (
                      <TrendingDown className="size-4 text-green-500" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`available-${fuel.key}`}
                    checked={availability[fuel.key as keyof typeof availability]}
                    onChange={() => handleAvailabilityChange(fuel.key)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`available-${fuel.key}`} className="text-sm">
                    Dostępne
                  </label>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  id={fuel.key}
                  type="number"
                  step="0.01"
                  value={prices[fuel.key as keyof typeof prices]}
                  onChange={(e) => handlePriceChange(fuel.key, e.target.value)}
                  disabled={!availability[fuel.key as keyof typeof availability]}
                  placeholder="0.00"
                />
                <span>zł/L</span>
              </div>
            </div>
          ))}

          <Button onClick={handleSave} className="w-full">
            <Save className="size-4 mr-2" />
            Zapisz ceny
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statystyki Twojej stacji</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl">1,247</p>
              <p className="text-sm text-gray-600">Wyświetlenia w tym miesiącu</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl">4.5</p>
              <p className="text-sm text-gray-600">Średnia ocena</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
