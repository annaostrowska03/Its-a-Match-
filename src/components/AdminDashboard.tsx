import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UserReports } from './UserReports';
import { UserManagement } from './UserManagement';
import { LogOut, BarChart3, Users, Shield } from 'lucide-react';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  logo: string;
}

export function AdminDashboard({ user, onLogout, logo }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('reports');

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
                <p className="text-xs text-gray-500">Administrator</p>
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
              <Shield className="size-5" />
              Panel Administratora
            </CardTitle>
            <CardDescription>Zarządzaj użytkownikami i generuj raporty</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reports">
                  <BarChart3 className="size-4 mr-2" />
                  Raporty
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="size-4 mr-2" />
                  Użytkownicy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reports" className="mt-6">
                <UserReports />
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <UserManagement />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
