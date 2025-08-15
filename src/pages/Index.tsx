import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  Ticket, 
  UserCheck, 
  Crown, 
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { ChartCard } from '@/components/ChartCard';
import { TicketSalesChart } from '@/components/TicketSalesChart';
import { CrowdMoodMeter } from '@/components/CrowdMoodMeter';
import { VendorRanking } from '@/components/VendorRanking';
import { DashboardCardManager } from '@/components/DashboardCardManager';
import { OnboardingTour } from '@/components/OnboardingTour';
import { InteractiveFilters, FilterState } from '@/components/InteractiveFilters';
import { FeedbackSystem } from '@/components/FeedbackSystem';
import { AIChatbot } from '@/components/AIChatbot';
import { EnhancedTooltip } from '@/components/EnhancedTooltip';
import { 
  mockEvent, 
  calculateTicketConversion, 
  calculateCheckInRate,
  mockGeographicData 
} from '@/lib/mockData';
import dashboardHero from '@/assets/dashboard-hero.jpg';

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: null, to: null },
    location: [],
    ticketType: [],
    eventType: []
  });

  const conversionRate = calculateTicketConversion(mockEvent);
  const checkInRate = calculateCheckInRate(mockEvent);
  const topLocations = mockGeographicData.slice(0, 3);

  // Define dashboard cards for the card manager
  const dashboardCards = [
    {
      id: 'hero',
      title: 'Event Overview',
      component: (
        <div className="relative overflow-hidden rounded-lg h-32">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${dashboardHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <div className="relative z-10 flex items-center h-full px-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">{mockEvent.name}</h3>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>August 20, 2024</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent font-medium">Live Event</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      defaultSize: { w: 6, h: 2 },
      minW: 4,
      minH: 2
    },
    {
      id: 'metrics',
      title: 'Key Metrics',
      component: (
        <div className="grid grid-cols-2 gap-3" data-tour="metric-cards">
          <EnhancedTooltip
            title="Total Attendees"
            description="Number of people who have checked in to your event. This includes all ticket types and gives you real-time attendance data."
            value={mockEvent.checkedIn.toLocaleString()}
            trend="up"
          >
            <MetricCard
              title="Attendees"
              value={mockEvent.checkedIn}
              change={8.2}
              icon={Users}
              trend="up"
              delay={0}
            />
          </EnhancedTooltip>
          <EnhancedTooltip
            title="Revenue Generated"
            description="Total revenue from ticket sales across all categories. This updates in real-time as new purchases are made."
            value={`$${mockEvent.revenue.toLocaleString()}`}
            trend="up"
          >
            <MetricCard
              title="Revenue"
              value={mockEvent.revenue}
              change={12.5}
              icon={DollarSign}
              prefix="$"
              trend="up"
              delay={0}
            />
          </EnhancedTooltip>
          <EnhancedTooltip
            title="Tickets Sold"
            description="Total number of tickets sold across all categories including early bird, general admission, VIP, and group tickets."
            value={mockEvent.soldTickets.toLocaleString()}
            trend="up"
          >
            <MetricCard
              title="Tickets"
              value={mockEvent.soldTickets}
              change={5.7}
              icon={Ticket}
              trend="up"
              delay={0}
            />
          </EnhancedTooltip>
          <EnhancedTooltip
            title="VIP Attendees"
            description="Number of VIP ticket holders who have checked in. VIP attendees typically have higher engagement and spending patterns."
            value={mockEvent.vipCount.toLocaleString()}
            trend="down"
          >
            <MetricCard
              title="VIP"
              value={mockEvent.vipCount}
              change={-2.1}
              icon={Crown}
              trend="down"
              delay={0}
            />
          </EnhancedTooltip>
        </div>
      ),
      defaultSize: { w: 6, h: 3 },
      minW: 4,
      minH: 3
    },
    {
      id: 'conversion-metrics',
      title: 'Conversion Metrics',
      component: (
        <div className="grid grid-cols-3 gap-3">
          <EnhancedTooltip
            title="Ticket Conversion Rate"
            description="Percentage of website visitors who completed a ticket purchase. Higher rates indicate effective marketing and user experience."
            value={`${conversionRate.toFixed(1)}%`}
            trend="up"
          >
            <MetricCard
              title="Conversion"
              value={conversionRate}
              change={3.2}
              icon={TrendingUp}
              suffix="%"
              decimals={1}
              trend="up"
              delay={0}
            />
          </EnhancedTooltip>
          <EnhancedTooltip
            title="Check-in Rate"
            description="Percentage of ticket holders who have actually attended the event. This helps measure no-show rates and actual attendance."
            value={`${checkInRate.toFixed(1)}%`}
            trend="up"
          >
            <MetricCard
              title="Check-in"
              value={checkInRate}
              change={1.8}
              icon={UserCheck}
              suffix="%"
              decimals={1}
              trend="up"
              delay={0}
            />
          </EnhancedTooltip>
          <EnhancedTooltip
            title="Top Market"
            description="Your highest performing geographic market based on ticket sales volume."
            value={`${topLocations[0]?.tickets.toLocaleString()} tickets`}
            trend="neutral"
          >
            <MetricCard
              title="Top Market"
              value={topLocations[0]?.tickets || 0}
              icon={MapPin}
              trend="neutral"
              delay={0}
            />
          </EnhancedTooltip>
        </div>
      ),
      defaultSize: { w: 6, h: 2 },
      minW: 6,
      minH: 2
    },
    {
      id: 'ticket-sales-chart',
      title: 'Ticket Sales Trend',
      component: <TicketSalesChart />,
      defaultSize: { w: 6, h: 4 },
      minW: 4,
      minH: 3
    },
    {
      id: 'crowd-mood',
      title: 'Crowd Mood Meter',
      component: <CrowdMoodMeter />,
      defaultSize: { w: 6, h: 4 },
      minW: 4,
      minH: 3
    },
    {
      id: 'vendor-ranking',
      title: 'Vendor Performance',
      component: <VendorRanking />,
      defaultSize: { w: 12, h: 3 },
      minW: 8,
      minH: 3
    },
    {
      id: 'top-markets',
      title: 'Top Markets',
      component: (
        <div className="space-y-3">
          {topLocations.map((location, index) => (
            <motion.div
              key={`${location.country}-${location.city}`}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xs">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{location.city}</p>
                  <p className="text-xs text-muted-foreground">{location.country}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground text-sm">{location.tickets.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">tickets</p>
              </div>
            </motion.div>
          ))}
        </div>
      ),
      defaultSize: { w: 4, h: 3 },
      minW: 3,
      minH: 3
    }
  ];

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Here you would typically update your data based on filters
    console.log('Filters updated:', newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Onboarding Tour */}
      <OnboardingTour />
      
      {/* Interactive Filters */}
      <InteractiveFilters onFiltersChange={handleFiltersChange} />

      {/* Dashboard Card Manager */}
      <DashboardCardManager cards={dashboardCards} />

      {/* What-If Simulator Preview */}
      <motion.div
        className="festival-card p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-4">What-If Simulator</h3>
        <p className="text-muted-foreground mb-6">
          Predict attendance changes based on marketing budget adjustments
        </p>
        <motion.button
          className="px-8 py-3 gradient-primary text-white rounded-lg font-medium hover:shadow-[var(--shadow-primary)] transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Launch Simulator
        </motion.button>
      </motion.div>

      {/* Feedback System */}
      <FeedbackSystem />

      {/* AI Chatbot */}
      <AIChatbot onFilterChange={handleFiltersChange} />
    </div>
  );
};

export default Index;