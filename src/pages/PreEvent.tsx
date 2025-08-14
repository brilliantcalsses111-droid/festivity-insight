import { motion } from 'framer-motion';
import { Calendar, Target, TrendingUp, Users, MapPin, DollarSign, Megaphone, Star } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { ChartCard } from '@/components/ChartCard';
import { TicketSalesChart } from '@/components/TicketSalesChart';
import { TicketCategoriesChart } from '@/components/TicketCategoriesChart';
import { GeographicHeatmap } from '@/components/GeographicHeatmap';
import { MarketingChannels } from '@/components/MarketingChannels';
import { mockEvent, calculateTicketConversion } from '@/lib/mockData';

const PreEvent = () => {
  const conversionRate = calculateTicketConversion(mockEvent);
  const daysToEvent = Math.ceil((new Date('2024-08-20').getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const projectedAttendance = Math.round(mockEvent.soldTickets * 0.89); // 89% show-up rate

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Pre-Event Analytics</h1>
            <p className="text-muted-foreground">Monitor ticket sales, marketing performance, and audience insights</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-primary mb-2">
              <Calendar className="w-5 h-5" />
              <span className="text-2xl font-bold">{daysToEvent > 0 ? daysToEvent : 'Event Day!'}</span>
            </div>
            <p className="text-sm text-muted-foreground">days to event</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Tickets Sold"
          value={mockEvent.soldTickets}
          change={12.5}
          icon={Target}
          trend="up"
          delay={0.1}
        />
        <MetricCard
          title="Sales Conversion"
          value={conversionRate}
          change={3.2}
          icon={TrendingUp}
          suffix="%"
          decimals={1}
          trend="up"
          delay={0.2}
        />
        <MetricCard
          title="Projected Attendance"
          value={projectedAttendance}
          change={5.8}
          icon={Users}
          trend="up"
          delay={0.3}
        />
        <MetricCard
          title="Revenue to Date"
          value={mockEvent.revenue}
          change={15.7}
          icon={DollarSign}
          prefix="$"
          trend="up"
          delay={0.4}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Ticket Sales Trend" delay={0.5}>
          <TicketSalesChart />
        </ChartCard>
        
        <ChartCard title="Ticket Categories Breakdown" delay={0.6}>
          <TicketCategoriesChart />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Geographic Distribution" delay={0.7}>
          <GeographicHeatmap />
        </ChartCard>
        
        <ChartCard title="Marketing Channel Performance" delay={0.8}>
          <MarketingChannels />
        </ChartCard>
      </div>

      {/* Pre-Event Checklist */}
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">Pre-Event Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { task: 'Venue Setup Complete', status: 'completed', icon: MapPin },
            { task: 'Staff Briefing Scheduled', status: 'completed', icon: Users },
            { task: 'Marketing Campaign Active', status: 'in-progress', icon: Megaphone },
            { task: 'Vendor Coordination', status: 'completed', icon: Star },
            { task: 'Security Protocols Set', status: 'pending', icon: Target },
            { task: 'Emergency Plans Ready', status: 'completed', icon: Calendar }
          ].map((item, index) => (
            <motion.div
              key={item.task}
              className={`flex items-center space-x-3 p-3 rounded-lg border ${
                item.status === 'completed' ? 'bg-accent/10 border-accent/30' :
                item.status === 'in-progress' ? 'bg-primary/10 border-primary/30' :
                'bg-muted/20 border-border'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
            >
              <item.icon className={`w-5 h-5 ${
                item.status === 'completed' ? 'text-accent' :
                item.status === 'in-progress' ? 'text-primary' :
                'text-muted-foreground'
              }`} />
              <span className="flex-1 text-sm font-medium">{item.task}</span>
              <div className={`w-3 h-3 rounded-full ${
                item.status === 'completed' ? 'bg-accent' :
                item.status === 'in-progress' ? 'bg-primary animate-pulse' :
                'bg-muted-foreground'
              }`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PreEvent;