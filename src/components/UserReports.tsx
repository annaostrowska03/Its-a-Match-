import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { Label } from './ui/label';

export function UserReports() {
  const [reportType, setReportType] = useState('traffic');
  const [dateRange, setDateRange] = useState('month');

  const handleGenerateReport = () => {
    // Mock report generation
    alert(`Generowanie raportu: ${reportType} za okres: ${dateRange}`);
  };

  const mockData = {
    traffic: {
      totalUsers: 15847,
      premiumUsers: 3241,
      partners: 124,
      avgSessionTime: '8:32',
    },
    revenue: {
      totalRevenue: 'PLN 45,230',
      premiumSubscriptions: 'PLN 32,410',
      partnerFees: 'PLN 12,820',
    },
    stations: {
      totalStations: 124,
      activeStations: 118,
      avgRating: 4.3,
      totalReviews: 2847,
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5" />
            Generowanie raportów
          </CardTitle>
          <CardDescription>
            Twórz szczegółowe raporty dla właścicieli stacji paliw
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Typ raportu</Label>
              <select
                id="reportType"
                className="w-full p-2 border rounded-md"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="traffic">Ruch użytkowników</option>
                <option value="demographics">Demografia użytkowników</option>
                <option value="routes">Najpopularniejsze trasy</option>
                <option value="stations">Statystyki stacji</option>
                <option value="revenue">Przychody</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Okres</Label>
              <select
                id="dateRange"
                className="w-full p-2 border rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="week">Ostatni tydzień</option>
                <option value="month">Ostatni miesiąc</option>
                <option value="quarter">Ostatni kwartał</option>
                <option value="year">Ostatni rok</option>
                <option value="custom">Niestandardowy</option>
              </select>
            </div>
          </div>

          <Button onClick={handleGenerateReport} className="w-full">
            <Download className="size-4 mr-2" />
            Generuj raport (PDF)
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Użytkownicy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Łącznie:</span>
              <span>{mockData.traffic.totalUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Premium:</span>
              <span>{mockData.traffic.premiumUsers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Partnerzy:</span>
              <span>{mockData.traffic.partners}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Śr. czas sesji:</span>
              <span>{mockData.traffic.avgSessionTime}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Przychody</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Łącznie:</span>
              <span>{mockData.revenue.totalRevenue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Premium:</span>
              <span>{mockData.revenue.premiumSubscriptions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Opłaty partnera:</span>
              <span>{mockData.revenue.partnerFees}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stacje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Łącznie:</span>
              <span>{mockData.stations.totalStations}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Aktywne:</span>
              <span>{mockData.stations.activeStations}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Śr. ocena:</span>
              <span>{mockData.stations.avgRating}/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Opinie:</span>
              <span>{mockData.stations.totalReviews}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ostatnie raporty</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'Ruch użytkowników - Listopad 2025', date: '2025-11-30', size: '2.4 MB' },
              { name: 'Statystyki stacji - Q3 2025', date: '2025-10-15', size: '4.1 MB' },
              { name: 'Demografia użytkowników - Wrzesień 2025', date: '2025-09-30', size: '1.8 MB' },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="size-4 text-gray-400" />
                  <div>
                    <p className="text-sm">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.date} • {report.size}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
