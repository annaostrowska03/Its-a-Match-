import { useState } from 'react';
import { User } from '../App';
import { PremiumRouteInput } from './PremiumRouteInput';
import { UserPreferences } from './UserPreferences';
import { ReportIssue } from './ReportIssue';
import { StationReviews } from './StationReviews';
import { VehicleConnection } from './VehicleConnection';
import { LogOut, Navigation, Settings, AlertCircle, Star, Crown, Car } from 'lucide-react';
import { Badge } from './ui/badge';

interface PremiumDashboardProps {
  user: User;
  onLogout: () => void;
  updatePreferences: (preferences: User['preferences']) => void;
  logo: string;
}

export function PremiumDashboard({ user, onLogout, updatePreferences, logo }: PremiumDashboardProps) {
  const [activeTab, setActiveTab] = useState('route');

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
      <header className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={logo} alt="IT'S A MATCH" className="h-12" />
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <p className="text-sm">{user.name}</p>
                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500">
                    <Crown className="size-3 mr-1" />
                    Premium
                  </Badge>
                </div>
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
        <Card className="border-amber-200">
          <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
            <CardTitle className="flex items-center gap-2">
              <Crown className="size-5 text-amber-600" />
              Panel Premium
            </CardTitle>
            <CardDescription>Zaawansowane funkcje planowania trasy</CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
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
                <PremiumRouteInput user={user} />
              </TabsContent>

              <TabsContent value="vehicle" className="mt-6">
                <VehicleConnection user={user} isPremium={true} />
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <UserPreferences user={user} updatePreferences={updatePreferences} isPremium={true} />
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