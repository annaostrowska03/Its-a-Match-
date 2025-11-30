import { useState, useEffect } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Car, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface VehicleConnectionProps {
  user: User;
  isPremium: boolean;
}

export function VehicleConnection({ user, isPremium }: VehicleConnectionProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [fuelLevel, setFuelLevel] = useState(45);
  const [autoConnectEnabled, setAutoConnectEnabled] = useState(isPremium);
  const [showLowFuelAlert, setShowLowFuelAlert] = useState(false);

  useEffect(() => {
    // Simulate fuel level decrease
    const interval = setInterval(() => {
      setFuelLevel(prev => {
        const newLevel = prev - 0.5;
        if (newLevel <= 15 && !showLowFuelAlert) {
          setShowLowFuelAlert(true);
        }
        return Math.max(0, newLevel);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [showLowFuelAlert]);

  useEffect(() => {
    // Auto-connect for premium users
    if (isPremium && autoConnectEnabled && !isConnected) {
      // Simulate auto-connection when user is near vehicle
      const timeout = setTimeout(() => {
        setIsConnected(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isPremium, autoConnectEnabled, isConnected]);

  const handleConnect = () => {
    setIsConnected(!isConnected);
  };

  const handleRefuel = () => {
    setFuelLevel(100);
    setShowLowFuelAlert(false);
  };

  const getFuelLevelColor = () => {
    if (fuelLevel <= 15) return 'text-red-600 bg-red-100';
    if (fuelLevel <= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="size-5" />
            Połączenie z pojazdem
          </CardTitle>
          <CardDescription>
            {isPremium 
              ? 'Automatyczne połączenie dostępne dla użytkowników Premium' 
              : 'Połącz aplikację z samochodem, aby otrzymać rekomendacje w czasie rzeczywistym'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {isConnected ? (
                <Wifi className="size-5 text-green-600" />
              ) : (
                <WifiOff className="size-5 text-gray-400" />
              )}
              <div>
                <p>Status połączenia</p>
                <p className="text-sm text-gray-600">
                  {isConnected ? 'Połączono z pojazdem' : 'Brak połączenia'}
                </p>
              </div>
            </div>
            <Badge variant={isConnected ? 'default' : 'outline'}>
              {isConnected ? 'Aktywne' : 'Nieaktywne'}
            </Badge>
          </div>

          {isPremium && (
            <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div>
                <p className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-amber-600" />
                  Automatyczne połączenie
                </p>
                <p className="text-sm text-gray-600">Połącz automatycznie gdy jesteś w pobliżu</p>
              </div>
              <input
                type="checkbox"
                checked={autoConnectEnabled}
                onChange={(e) => setAutoConnectEnabled(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          )}

          <Button 
            onClick={handleConnect} 
            className="w-full"
            variant={isConnected ? 'outline' : 'default'}
          >
            {isConnected ? (
              <>
                <WifiOff className="size-4 mr-2" />
                Rozłącz pojazd
              </>
            ) : (
              <>
                <Wifi className="size-4 mr-2" />
                Połącz z pojazdem
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Dane pojazdu na żywo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`p-4 rounded-lg ${getFuelLevelColor()}`}>
              <div className="flex items-center justify-between mb-2">
                <p>Poziom paliwa</p>
                <p className="text-2xl">{fuelLevel.toFixed(1)}%</p>
              </div>
              <div className="w-full bg-white/50 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${fuelLevel}%`,
                    backgroundColor: fuelLevel <= 15 ? '#dc2626' : fuelLevel <= 30 ? '#ca8a04' : '#16a34a'
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Przebieg</p>
                <p className="text-xl">42,847 km</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Średnie spalanie</p>
                <p className="text-xl">6.5 L/100km</p>
              </div>
            </div>

            {/* Demo button to refuel */}
            <Button variant="outline" onClick={handleRefuel} className="w-full">
              Symuluj tankowanie (Reset do 100%)
            </Button>
          </CardContent>
        </Card>
      )}

      {showLowFuelAlert && (
        <Card className="border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-6 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-red-900">Niski poziom paliwa!</h3>
                <p className="text-sm text-red-700 mt-1">
                  Poziom paliwa spadł poniżej 15%. System automatycznie wygeneruje rekomendacje najbliższych stacji.
                </p>
                <Button 
                  size="sm" 
                  className="mt-3 bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    // Trigger route generation
                    alert('Generowanie rekomendacji najbliższych stacji...');
                    setShowLowFuelAlert(false);
                  }}
                >
                  Pokaż najbliższe stacje
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
