import { useState, useEffect } from 'react';
import { User, Station } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Building2, Plus, Edit, Trash2, Save, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from './ui/badge';

interface StationsManagementProps {
  user: User;
  updateStations: (stations: Station[]) => void;
}

export function StationsManagement({ user, updateStations }: StationsManagementProps) {
  const [stations, setStations] = useState<Station[]>(user.stations || []);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPrices, setEditingPrices] = useState(false);
  const [newStation, setNewStation] = useState({
    name: '',
    address: '',
    city: '',
  });

  useEffect(() => {
    if (stations.length > 0 && !selectedStation) {
      setSelectedStation(stations[0]);
    }
  }, [stations, selectedStation]);

  const handleAddStation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const station: Station = {
      id: Math.random().toString(36).substr(2, 9),
      name: newStation.name,
      address: newStation.address,
      city: newStation.city,
      prices: {
        pb95: '6.49',
        pb98: '7.12',
        diesel: '6.38',
        lpg: '3.15',
      },
      availability: {
        pb95: true,
        pb98: true,
        diesel: true,
        lpg: true,
      },
    };
    
    const updatedStations = [...stations, station];
    setStations(updatedStations);
    updateStations(updatedStations);
    setSelectedStation(station);
    setNewStation({ name: '', address: '', city: '' });
    setShowAddForm(false);
  };

  const handleDeleteStation = (stationId: string) => {
    const updatedStations = stations.filter(s => s.id !== stationId);
    setStations(updatedStations);
    updateStations(updatedStations);
    if (selectedStation?.id === stationId) {
      setSelectedStation(updatedStations[0] || null);
    }
  };

  const handlePriceChange = (fuelType: string, value: string) => {
    if (!selectedStation) return;
    
    // Price validation
    const price = parseFloat(value);
    if (value && (price < 0 || price > 20)) {
      alert('Błąd: Cena musi być w przedziale 0-20 zł/L');
      return;
    }
    
    const updatedStation = {
      ...selectedStation,
      prices: {
        ...selectedStation.prices,
        [fuelType]: value,
      },
    };
    
    setSelectedStation(updatedStation);
  };

  const handleAvailabilityChange = (fuelType: string) => {
    if (!selectedStation) return;
    
    const updatedStation = {
      ...selectedStation,
      availability: {
        ...selectedStation.availability,
        [fuelType]: !selectedStation.availability[fuelType as keyof typeof selectedStation.availability],
      },
    };
    
    setSelectedStation(updatedStation);
  };

  const handleSavePrices = () => {
    if (!selectedStation) return;
    
    const updatedStations = stations.map(s => 
      s.id === selectedStation.id ? selectedStation : s
    );
    
    setStations(updatedStations);
    updateStations(updatedStations);
    setEditingPrices(false);
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="size-5" />
                Zarządzanie stacjami
              </CardTitle>
              <CardDescription>
                Dodaj i zarządzaj swoimi stacjami paliw
              </CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="size-4 mr-2" />
              Dodaj stację
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <form onSubmit={handleAddStation} className="bg-white p-4 rounded-lg border space-y-4">
              <h3>Nowa stacja</h3>
              
              <div className="space-y-2">
                <Label htmlFor="station-name">Nazwa stacji</Label>
                <Input
                  id="station-name"
                  placeholder="np. Orlen - Warszawa Bemowo"
                  value={newStation.name}
                  onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="station-address">Adres</Label>
                <Input
                  id="station-address"
                  placeholder="ul. Powstańców Śląskich 126"
                  value={newStation.address}
                  onChange={(e) => setNewStation({ ...newStation, address: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="station-city">Miasto</Label>
                <Input
                  id="station-city"
                  placeholder="Warszawa"
                  value={newStation.city}
                  onChange={(e) => setNewStation({ ...newStation, city: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Dodaj stację</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Anuluj
                </Button>
              </div>
            </form>
          )}

          {stations.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg">
              <Building2 className="size-12 mx-auto mb-2 text-gray-300" />
              <p>Brak stacji</p>
              <p className="text-sm">Kliknij "Dodaj stację", aby dodać swoją pierwszą stację</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-4 space-y-3">
              <h3 className="flex items-center gap-2">
                Twoje stacje ({stations.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stations.map((station) => (
                  <div
                    key={station.id}
                    className={`border p-3 rounded-lg cursor-pointer transition-all ${
                      selectedStation?.id === station.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedStation(station)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p>{station.name}</p>
                        <p className="text-sm text-gray-600">{station.address}</p>
                        <p className="text-sm text-gray-600">{station.city}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteStation(station.id);
                        }}
                      >
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedStation && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedStation.name}</CardTitle>
                <CardDescription>
                  {selectedStation.address}, {selectedStation.city}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {editingPrices ? (
                  <>
                    <Button onClick={handleSavePrices}>
                      <Save className="size-4 mr-2" />
                      Zapisz
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPrices(false)}>
                      Anuluj
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setEditingPrices(true)}>
                    <Edit className="size-4 mr-2" />
                    Edytuj ceny
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {fuelTypes.map((fuel) => (
              <div key={fuel.key} className="bg-gray-50 p-4 rounded-lg border space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>{fuel.name}</Label>
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
                      id={`available-${fuel.key}-${selectedStation.id}`}
                      checked={selectedStation.availability[fuel.key as keyof typeof selectedStation.availability]}
                      onChange={() => handleAvailabilityChange(fuel.key)}
                      disabled={!editingPrices}
                      className="w-4 h-4"
                    />
                    <label htmlFor={`available-${fuel.key}-${selectedStation.id}`} className="text-sm">
                      Dostępne
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    step="0.01"
                    value={selectedStation.prices[fuel.key as keyof typeof selectedStation.prices] || ''}
                    onChange={(e) => handlePriceChange(fuel.key, e.target.value)}
                    disabled={!editingPrices || !selectedStation.availability[fuel.key as keyof typeof selectedStation.availability]}
                    placeholder="0.00"
                  />
                  <span>zł/L</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {stations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Statystyki wszystkich stacji</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl">{stations.length}</p>
                <p className="text-sm text-gray-600">Liczba stacji</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl">1,247</p>
                <p className="text-sm text-gray-600">Wyświetlenia</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl">4.5</p>
                <p className="text-sm text-gray-600">Średnia ocena</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl">89</p>
                <p className="text-sm text-gray-600">Opinie</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}