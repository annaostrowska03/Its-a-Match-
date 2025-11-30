import { useState } from 'react';
import { User } from '../App';
import { RouteInput } from './RouteInput';
import { UserPreferences } from './UserPreferences';
import { ReportIssue } from './ReportIssue';
import { StationReviews } from './StationReviews';
import { VehicleConnection } from './VehicleConnection';
import { LogOut, Navigation, Settings, AlertCircle, Star, Car } from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  updatePreferences: (preferences: User['preferences']) => void;
  logo: string;
}

export function Dashboard({ user, onLogout, updatePreferences, logo }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('route');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={logo} alt="IT'S A MATCH" className="h-12" />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">Użytkownik</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="size-4 mr-2" />
                Wyloguj
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Panel Użytkownika</CardTitle>
            <CardDescription>Zarządzaj swoją trasą i preferencjami</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="route">
                  <Navigation className="size-4 mr-2" />
                  Trasa
                </TabsTrigger>
                <TabsTrigger value="vehicle">
                  <Car className="size-4 mr-2" />
                  Pojazd
                </TabsTrigger>
                <TabsTrigger value="preferences">
                  <Settings className="size-4 mr-2" />
                  Preferencje
                </TabsTrigger>
                <TabsTrigger value="report">
                  <AlertCircle className="size-4 mr-2" />
                  Zgłoś błąd
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  <Star className="size-4 mr-2" />
                  Oceny
                </TabsTrigger>
              </TabsList>

              <TabsContent value="route" className="mt-6">
                <RouteInput user={user} />
              </TabsContent>

              <TabsContent value="vehicle" className="mt-6">
                <VehicleConnection user={user} isPremium={false} />
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <UserPreferences user={user} updatePreferences={updatePreferences} isPremium={false} />
              </TabsContent>

              <TabsContent value="report" className="mt-6">
                <ReportIssue user={user} />
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <StationReviews user={user} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}