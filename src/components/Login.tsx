import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User, UserRole } from '../App';

interface LoginProps {
  onLogin: (user: User) => void;
  logo: string;
}

export function Login({ onLogin, logo }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Mock login validation - in production this would validate against backend
    if (password.length < 6) {
      setError('Błędne hasło lub login. Sprawdź dane i spróbuj ponownie.');
      return;
    }
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role: 'user',
    };
    onLogin(user);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
    };
    onLogin(user);
  };

  const handleDemoLogin = (demoRole: UserRole) => {
    const demoUsers = {
      user: { id: '1', email: 'user@demo.pl', name: 'Jan Kowalski', role: 'user' as UserRole },
      premium: { 
        id: '2', 
        email: 'premium@demo.pl', 
        name: 'Anna Nowak', 
        role: 'premium' as UserRole,
        preferences: {
          fuelType: 'pb95',
          routeType: 'fastest',
          maxResults: 3,
          vehicleType: 'sedan',
          fuelConsumption: '6.5',
          tankCapacity: '50',
        }
      },
      partner: { 
        id: '3', 
        email: 'partner@demo.pl', 
        name: 'Stacja Orlen', 
        role: 'partner' as UserRole,
        stations: [
          {
            id: 'st1',
            name: 'Orlen - Warszawa Bemowo',
            address: 'ul. Powstańców Śląskich 126',
            city: 'Warszawa',
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
          },
          {
            id: 'st2',
            name: 'Orlen - Warszawa Mokotów',
            address: 'ul. Puławska 234',
            city: 'Warszawa',
            prices: {
              pb95: '6.52',
              pb98: '7.15',
              diesel: '6.41',
              lpg: '3.18',
            },
            availability: {
              pb95: true,
              pb98: true,
              diesel: true,
              lpg: false,
            },
          },
        ]
      },
      admin: { id: '4', email: 'admin@demo.pl', name: 'Administrator', role: 'admin' as UserRole },
    };
    onLogin(demoUsers[demoRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="IT'S A MATCH" className="w-full max-w-sm mx-auto mb-4" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Witaj w IT'S A MATCH</CardTitle>
            <CardDescription>Zaloguj się lub zarejestruj, aby kontynuować</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Logowanie</TabsTrigger>
                <TabsTrigger value="register">Rejestracja</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="twoj@email.pl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Hasło</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Zaloguj się</Button>
                </form>

                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-3">Szybkie logowanie demo:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDemoLogin('user')}>
                      Użytkownik
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDemoLogin('premium')}>
                      Premium
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDemoLogin('partner')}>
                      Partner
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDemoLogin('admin')}>
                      Admin
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Imię i nazwisko</Label>
                    <Input
                      id="reg-name"
                      type="text"
                      placeholder="Jan Kowalski"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="twoj@email.pl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Hasło</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Typ konta</Label>
                    <select
                      id="role"
                      className="w-full p-2 border rounded-md"
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                    >
                      <option value="user">Użytkownik</option>
                      <option value="premium">Premium</option>
                      <option value="partner">Partner (Stacja)</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">Zarejestruj się</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}