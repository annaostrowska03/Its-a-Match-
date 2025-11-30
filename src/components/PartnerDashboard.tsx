import { useState } from 'react';
import { User, Station } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { StationsManagement } from './StationsManagement';
import { SpecialOffers } from './SpecialOffers';
import { LogOut, Building2, Tag } from 'lucide-react';

interface PartnerDashboardProps {
  user: User;
  onLogout: () => void;
  updateStations: (stations: Station[]) => void;
  logo: string;
}

export function PartnerDashboard({ user, onLogout, updateStations, logo }: PartnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('stations');

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
                <p className="text-xs text-gray-500">Partner ({user.stations?.length || 0} stacji)</p>
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
            <CardTitle className="flex items-center gap-2">
              <Building2 className="size-5" />
              Panel Partnera
            </CardTitle>
            <CardDescription>Zarządzaj swoimi stacjami i ofertami</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="stations">
                  <Building2 className="size-4 mr-2" />
                  Moje stacje
                </TabsTrigger>
                <TabsTrigger value="offers">
                  <Tag className="size-4 mr-2" />
                  Specjalne oferty
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stations" className="mt-6">
                <StationsManagement user={user} updateStations={updateStations} />
              </TabsContent>

              <TabsContent value="offers" className="mt-6">
                <SpecialOffers user={user} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
