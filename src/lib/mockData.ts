// Mock data for the Festival Analytics Hub

export interface EventData {
  id: string;
  name: string;
  date: string;
  status: 'pre-event' | 'live' | 'post-event';
  totalTickets: number;
  soldTickets: number;
  checkedIn: number;
  revenue: number;
  vipCount: number;
}

export interface TicketSalesData {
  date: string;
  sales: number;
  revenue: number;
}

export interface GeographicData {
  country: string;
  city: string;
  tickets: number;
  lat: number;
  lng: number;
}

export interface SentimentData {
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  platform: 'twitter' | 'instagram' | 'facebook';
  content: string;
}

export interface VendorData {
  id: string;
  name: string;
  category: string;
  sales: number;
  rating: number;
  greenScore: number;
}

// Mock event data
export const mockEvent: EventData = {
  id: 'summer-fest-2024',
  name: 'Summer Music Festival 2024',
  date: '2024-08-20',
  status: 'live',
  totalTickets: 50000,
  soldTickets: 47500,
  checkedIn: 42300,
  revenue: 2375000,
  vipCount: 1250
};

// Mock ticket sales trend (last 30 days)
export const mockTicketSales: TicketSalesData[] = [
  { date: '2024-07-15', sales: 450, revenue: 22500 },
  { date: '2024-07-16', sales: 620, revenue: 31000 },
  { date: '2024-07-17', sales: 380, revenue: 19000 },
  { date: '2024-07-18', sales: 890, revenue: 44500 },
  { date: '2024-07-19', sales: 1200, revenue: 60000 },
  { date: '2024-07-20', sales: 1450, revenue: 72500 },
  { date: '2024-07-21', sales: 980, revenue: 49000 },
  { date: '2024-07-22', sales: 1650, revenue: 82500 },
  { date: '2024-07-23', sales: 2100, revenue: 105000 },
  { date: '2024-07-24', sales: 1850, revenue: 92500 },
  { date: '2024-07-25', sales: 2300, revenue: 115000 },
  { date: '2024-07-26', sales: 2800, revenue: 140000 },
  { date: '2024-07-27', sales: 3200, revenue: 160000 },
  { date: '2024-07-28', sales: 2900, revenue: 145000 },
  { date: '2024-07-29', sales: 3500, revenue: 175000 },
  { date: '2024-07-30', sales: 4200, revenue: 210000 }
];

// Mock geographic data
export const mockGeographicData: GeographicData[] = [
  { country: 'USA', city: 'Los Angeles', tickets: 12500, lat: 34.0522, lng: -118.2437 },
  { country: 'USA', city: 'New York', tickets: 8900, lat: 40.7128, lng: -74.0060 },
  { country: 'USA', city: 'San Francisco', tickets: 6700, lat: 37.7749, lng: -122.4194 },
  { country: 'USA', city: 'Austin', tickets: 5400, lat: 30.2672, lng: -97.7431 },
  { country: 'Canada', city: 'Toronto', tickets: 3200, lat: 43.6532, lng: -79.3832 },
  { country: 'UK', city: 'London', tickets: 2800, lat: 51.5074, lng: -0.1278 },
  { country: 'Germany', city: 'Berlin', tickets: 2100, lat: 52.5200, lng: 13.4050 },
  { country: 'Australia', city: 'Sydney', tickets: 1900, lat: -33.8688, lng: 151.2093 }
];

// Mock sentiment data
export const mockSentimentData: SentimentData[] = [
  { timestamp: '2024-08-14T10:30:00Z', sentiment: 'positive', score: 0.8, platform: 'twitter', content: 'So excited for Summer Fest!' },
  { timestamp: '2024-08-14T10:45:00Z', sentiment: 'positive', score: 0.9, platform: 'instagram', content: 'Best lineup ever! 🎵' },
  { timestamp: '2024-08-14T11:00:00Z', sentiment: 'neutral', score: 0.5, platform: 'facebook', content: 'Anyone know parking info?' },
  { timestamp: '2024-08-14T11:15:00Z', sentiment: 'positive', score: 0.7, platform: 'twitter', content: 'Great sound quality at main stage' },
  { timestamp: '2024-08-14T11:30:00Z', sentiment: 'negative', score: 0.3, platform: 'twitter', content: 'Long lines at food vendors' },
  { timestamp: '2024-08-14T11:45:00Z', sentiment: 'positive', score: 0.8, platform: 'instagram', content: 'Amazing vibes! #SummerFest2024' }
];

// Mock vendor data
export const mockVendorData: VendorData[] = [
  { id: 'vendor-1', name: 'Gourmet Burgers Co.', category: 'Food', sales: 45000, rating: 4.8, greenScore: 85 },
  { id: 'vendor-2', name: 'Craft Beer Station', category: 'Beverages', sales: 38000, rating: 4.6, greenScore: 78 },
  { id: 'vendor-3', name: 'Eco-Friendly Merch', category: 'Merchandise', sales: 32000, rating: 4.9, greenScore: 95 },
  { id: 'vendor-4', name: 'Street Tacos Plus', category: 'Food', sales: 29000, rating: 4.7, greenScore: 82 },
  { id: 'vendor-5', name: 'Festival Fashion', category: 'Merchandise', sales: 25000, rating: 4.4, greenScore: 65 },
  { id: 'vendor-6', name: 'Fresh Juice Bar', category: 'Beverages', sales: 22000, rating: 4.5, greenScore: 90 }
];

// Calculated metrics
export const calculateCrowdMood = (sentiments: SentimentData[]): number => {
  const total = sentiments.reduce((sum, item) => sum + item.score, 0);
  return total / sentiments.length;
};

export const calculateTicketConversion = (event: EventData): number => {
  return (event.soldTickets / event.totalTickets) * 100;
};

export const calculateCheckInRate = (event: EventData): number => {
  return (event.checkedIn / event.soldTickets) * 100;
};