import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { PremiumDashboard } from './components/PremiumDashboard';
import { PartnerDashboard } from './components/PartnerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import logo from "figma:asset/a477ea89024104a97ca15e012d60c99a62b2f1a8.png";

export type UserRole = 'user' | 'premium' | 'partner' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  preferences?: {
    fuelType?: string;
    routeType?: string;
    maxResults?: number;
    vehicleType?: string;
    fuelConsumption?: string;
    tankCapacity?: string;
  };
  stations?: Station[];
}

export interface Station {
  id: string;
  name: string;
  address: string;
  city: string;
  prices: {
    pb95?: string;
    pb98?: string;
    diesel?: string;
    lpg?: string;
  };
  availability: {
    pb95: boolean;
    pb98: boolean;
    diesel: boolean;
    lpg: boolean;
  };
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setShowLogin(false);
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setShowLogin(true);
  };

  const updateUserPreferences = (preferences: User['preferences']) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, preferences };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const updateUserStations = (stations: Station[]) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, stations };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  if (showLogin) {
    return <Login onLogin={handleLogin} logo={logo} />;
  }

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} logo={logo} />;
      case 'partner':
        return <PartnerDashboard user={currentUser} onLogout={handleLogout} updateStations={updateUserStations} logo={logo} />;
      case 'premium':
        return <PremiumDashboard user={currentUser} onLogout={handleLogout} updatePreferences={updateUserPreferences} logo={logo} />;
      default:
        return <Dashboard user={currentUser} onLogout={handleLogout} updatePreferences={updateUserPreferences} logo={logo} />;
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderDashboard()}</div>;
}