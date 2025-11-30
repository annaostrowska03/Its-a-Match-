import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Users, Search, Ban, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'blocked';
  joinDate: string;
  violations: number;
}

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<ManagedUser[]>([
    { id: '1', name: 'Jan Kowalski', email: 'jan@example.pl', role: 'user', status: 'active', joinDate: '2025-01-15', violations: 0 },
    { id: '2', name: 'Anna Nowak', email: 'anna@example.pl', role: 'premium', status: 'active', joinDate: '2025-02-20', violations: 0 },
    { id: '3', name: 'Piotr Wiśniewski', email: 'piotr@example.pl', role: 'user', status: 'blocked', joinDate: '2025-03-10', violations: 3 },
    { id: '4', name: 'Stacja Orlen Warszawa', email: 'orlen-wa@example.pl', role: 'partner', status: 'active', joinDate: '2025-04-05', violations: 0 },
    { id: '5', name: 'Maria Kowalczyk', email: 'maria@example.pl', role: 'premium', status: 'active', joinDate: '2025-05-12', violations: 0 },
  ]);

  const handleToggleStatus = (userId: string) => {
    const user = users.find(u => u.id === userId);
    
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === 'active' ? 'blocked' : 'active';
        
        // Log audit trail
        const auditLog = {
          action: newStatus === 'blocked' ? 'BLOCK' : 'UNBLOCK',
          adminId: 'admin-4', // Current admin ID
          userId: u.id,
          userName: u.name,
          timestamp: new Date().toISOString(),
          reason: newStatus === 'blocked' ? 'Naruszenie regulaminu' : 'Odblokowanie konta',
        };
        
        console.log('AUDIT LOG:', auditLog);
        
        // If blocking a partner, deactivate their offers
        if (u.role === 'partner' && newStatus === 'blocked') {
          console.log(`Dezaktywacja wszystkich ofert dla partnera: ${u.name}`);
        }
        
        return {
          ...u,
          status: newStatus,
        };
      }
      return u;
    }));
    
    alert(`Użytkownik ${user?.name} został ${user?.status === 'active' ? 'zablokowany' : 'odblokowany'}. Akcja została zapisana w dzienniku audytu.`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const variants: Record<string, string> = {
      admin: 'destructive',
      premium: 'default',
      partner: 'secondary',
      user: 'outline',
    };
    return variants[role] || 'outline';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Zarządzanie użytkownikami
          </CardTitle>
          <CardDescription>
            Blokuj użytkowników i partnerów niezgodnych z polityką firmy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 size-4 text-gray-400" />
            <Input
              placeholder="Szukaj użytkownika po nazwie lub emailu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p>{user.name}</p>
                    <Badge variant={getRoleBadge(user.role) as any}>
                      {user.role === 'user' ? 'Użytkownik' :
                       user.role === 'premium' ? 'Premium' :
                       user.role === 'partner' ? 'Partner' : 'Admin'}
                    </Badge>
                    {user.status === 'blocked' && (
                      <Badge variant="destructive">Zablokowany</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <div className="flex gap-4 mt-1 text-xs text-gray-500">
                    <span>Dołączył: {user.joinDate}</span>
                    {user.violations > 0 && (
                      <span className="text-red-600">Naruszenia: {user.violations}</span>
                    )}
                  </div>
                </div>
                
                <Button
                  variant={user.status === 'active' ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => handleToggleStatus(user.id)}
                >
                  {user.status === 'active' ? (
                    <>
                      <Ban className="size-4 mr-2" />
                      Zablokuj
                    </>
                  ) : (
                    <>
                      <CheckCircle className="size-4 mr-2" />
                      Odblokuj
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl">{users.filter(u => u.status === 'active').length}</p>
              <p className="text-sm text-gray-600">Aktywni użytkownicy</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl">{users.filter(u => u.status === 'blocked').length}</p>
              <p className="text-sm text-gray-600">Zablokowani</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl">{users.filter(u => u.violations > 0).length}</p>
              <p className="text-sm text-gray-600">Z naruszeniami</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl">{users.filter(u => u.role === 'partner').length}</p>
              <p className="text-sm text-gray-600">Partnerzy</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}