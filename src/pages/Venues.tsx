import { motion } from 'framer-motion';
import { MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { MetricCard } from '@/components/MetricCard';
import { ChartCard } from '@/components/ChartCard';
import { LiveCrowdHeatmap } from '@/components/LiveCrowdHeatmap';

const Venues = () => {
  return (
    <div className="space-y-8">
      <motion.div
        className="festival-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Venue Analytics</h1>
        <p className="text-muted-foreground">Real-time venue capacity and crowd distribution</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Venues" value={8} icon={MapPin} delay={0.1} />
        <MetricCard title="At Capacity" value={2} icon={AlertTriangle} trend="up" delay={0.2} />
        <MetricCard title="Average Occupancy" value={73.5} suffix="%" icon={Users} delay={0.3} />
        <MetricCard title="Safe Venues" value={6} icon={CheckCircle} trend="up" delay={0.4} />
      </div>

      <ChartCard title="Live Crowd Distribution">
        <LiveCrowdHeatmap />
      </ChartCard>
    </div>
  );
};

export default Venues;