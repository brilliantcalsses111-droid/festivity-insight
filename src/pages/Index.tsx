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
import { 
  mockEvent, 
  calculateTicketConversion, 
  calculateCheckInRate,
  mockGeographicData 
} from '@/lib/mockData';
import dashboardHero from '@/assets/dashboard-hero.jpg';

const Index = () => {
  const conversionRate = calculateTicketConversion(mockEvent);
  const checkInRate = calculateCheckInRate(mockEvent);
  const topLocations = mockGeographicData.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden rounded-2xl h-48"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="relative z-10 flex items-center h-full px-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {mockEvent.name}
              </h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>August 20, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <span className="text-accent font-medium">Live Event</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Attendees"
          value={mockEvent.checkedIn}
          change={8.2}
          icon={Users}
          trend="up"
          delay={0.1}
        />
        <MetricCard
          title="Revenue Generated"
          value={mockEvent.revenue}
          change={12.5}
          icon={DollarSign}
          prefix="$"
          trend="up"
          delay={0.2}
        />
        <MetricCard
          title="Tickets Sold"
          value={mockEvent.soldTickets}
          change={5.7}
          icon={Ticket}
          trend="up"
          delay={0.3}
        />
        <MetricCard
          title="VIP Attendees"
          value={mockEvent.vipCount}
          change={-2.1}
          icon={Crown}
          trend="down"
          delay={0.4}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Ticket Conversion Rate"
          value={conversionRate}
          change={3.2}
          icon={TrendingUp}
          suffix="%"
          decimals={1}
          trend="up"
          delay={0.5}
        />
        <MetricCard
          title="Check-in Rate"
          value={checkInRate}
          change={1.8}
          icon={UserCheck}
          suffix="%"
          decimals={1}
          trend="up"
          delay={0.6}
        />
        <MetricCard
          title="Top Market"
          value={topLocations[0]?.tickets || 0}
          icon={MapPin}
          trend="neutral"
          delay={0.7}
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ticket Sales Trend */}
        <ChartCard title="Ticket Sales Trend" delay={0.8}>
          <TicketSalesChart />
        </ChartCard>

        {/* Crowd Mood Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <CrowdMoodMeter />
        </motion.div>
      </div>

      {/* Vendor Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <VendorRanking />
      </motion.div>

      {/* Geographic Insights */}
      <ChartCard title="Top Markets" delay={1.1}>
        <div className="space-y-4">
          {topLocations.map((location, index) => (
            <motion.div
              key={`${location.country}-${location.city}`}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-foreground">{location.city}</p>
                  <p className="text-sm text-muted-foreground">{location.country}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{location.tickets.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">tickets</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>

      {/* What-If Simulator Preview */}
      <motion.div
        className="festival-card p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
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
    </div>
  );
};

export default Index;