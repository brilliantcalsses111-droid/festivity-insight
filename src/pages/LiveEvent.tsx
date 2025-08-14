import { motion } from 'framer-motion';
import { Radio, Users, Activity, MapPin, Clock, Wifi, AlertTriangle, TrendingUp } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { ChartCard } from '@/components/ChartCard';
import { CrowdMoodMeter } from '@/components/CrowdMoodMeter';
import { LiveCheckInsChart } from '@/components/LiveCheckInsChart';
import { SessionPopularity } from '@/components/SessionPopularity';
import { LiveCrowdHeatmap } from '@/components/LiveCrowdHeatmap';
import { RealTimeAlerts } from '@/components/RealTimeAlerts';
import { mockEvent, calculateCheckInRate } from '@/lib/mockData';

const LiveEvent = () => {
  const checkInRate = calculateCheckInRate(mockEvent);
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="space-y-8">
      {/* Live Status Header */}
      <motion.div
        className="festival-card p-6 border border-accent/30 bg-accent/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-accent/20">
              <Radio className="w-8 h-8 text-accent animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Live Event Dashboard</h1>
              <p className="text-muted-foreground">Real-time monitoring and analytics</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-accent mb-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <span className="text-lg font-bold">LIVE</span>
            </div>
            <p className="text-sm text-muted-foreground">{currentTime}</p>
          </div>
        </div>
      </motion.div>

      {/* Real-Time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Current Attendees"
          value={mockEvent.checkedIn}
          change={2.3}
          icon={Users}
          trend="up"
          delay={0.1}
        />
        <MetricCard
          title="Check-in Rate"
          value={checkInRate}
          change={0.8}
          icon={Activity}
          suffix="%"
          decimals={1}
          trend="up"
          delay={0.2}
        />
        <MetricCard
          title="Active Sessions"
          value={8}
          change={12.5}
          icon={MapPin}
          trend="up"
          delay={0.3}
        />
        <MetricCard
          title="Network Status"
          value={98.7}
          change={-0.2}
          icon={Wifi}
          suffix="%"
          decimals={1}
          trend="neutral"
          delay={0.4}
        />
      </div>

      {/* Real-Time Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <RealTimeAlerts />
      </motion.div>

      {/* Live Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Live Check-ins" delay={0.6}>
          <LiveCheckInsChart />
        </ChartCard>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <CrowdMoodMeter />
        </motion.div>
      </div>

      {/* Live Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Session Popularity" delay={0.8}>
          <SessionPopularity />
        </ChartCard>
        
        <ChartCard title="Crowd Distribution" delay={0.9}>
          <LiveCrowdHeatmap />
        </ChartCard>
      </div>

      {/* Live Performance Indicators */}
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-6">System Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { metric: 'Server Response', value: '127ms', status: 'good', icon: Activity },
            { metric: 'Database Load', value: '34%', status: 'good', icon: TrendingUp },
            { metric: 'Active Connections', value: '12.4K', status: 'warning', icon: Wifi }
          ].map((item, index) => (
            <motion.div
              key={item.metric}
              className={`flex items-center space-x-4 p-4 rounded-lg border ${
                item.status === 'good' ? 'bg-accent/10 border-accent/30' :
                item.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-destructive/10 border-destructive/30'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + index * 0.1 }}
            >
              <div className={`p-2 rounded-full ${
                item.status === 'good' ? 'bg-accent/20' :
                item.status === 'warning' ? 'bg-yellow-500/20' :
                'bg-destructive/20'
              }`}>
                <item.icon className={`w-5 h-5 ${
                  item.status === 'good' ? 'text-accent' :
                  item.status === 'warning' ? 'text-yellow-500' :
                  'text-destructive'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{item.metric}</p>
                <p className="text-xl font-bold text-foreground">{item.value}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                item.status === 'good' ? 'bg-accent' :
                item.status === 'warning' ? 'bg-yellow-500 animate-pulse' :
                'bg-destructive'
              }`} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LiveEvent;