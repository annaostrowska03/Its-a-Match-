import { useState } from 'react';
import { User } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, Send } from 'lucide-react';

interface ReportIssueProps {
  user: User;
}

export function ReportIssue({ user }: ReportIssueProps) {
  const [issueType, setIssueType] = useState('');
  const [stationName, setStationName] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission
    const report = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      issueType,
      stationName,
      description,
      timestamp: new Date().toISOString(),
    };
    
    console.log('Report submitted:', report);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setIssueType('');
      setStationName('');
      setDescription('');
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <AlertCircle className="size-12 text-green-600 mx-auto" />
            <h3>Zgłoszenie zostało wysłane!</h3>
            <p className="text-sm text-gray-600">Administrator zweryfikuje zgłoszenie w ciągu 24 godzin.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="size-5" />
          Zgłoś problem
        </CardTitle>
        <CardDescription>
          Pomóż nam utrzymać wiarygodność danych - zgłoś błędną cenę lub zamkniętą stację
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="issueType">Typ problemu</Label>
            <select
              id="issueType"
              className="w-full p-2 border rounded-md"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              required
            >
              <option value="">Wybierz typ problemu</option>
              <option value="price">Błędna cena paliwa</option>
              <option value="closed">Zamknięta stacja</option>
              <option value="unavailable">Niedostępne paliwo</option>
              <option value="other">Inny problem</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stationName">Nazwa stacji</Label>
            <Input
              id="stationName"
              placeholder="np. Orlen - Warszawa Bemowo"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Opis problemu</Label>
            <Textarea
              id="description"
              placeholder="Opisz szczegółowo zaobserwowany problem..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            <Send className="size-4 mr-2" />
            Wyślij zgłoszenie
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
