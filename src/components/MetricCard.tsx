import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface MetricCardProps {
  title: string;
  value: number;
  change?: number;
  icon: LucideIcon;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
}

export const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  prefix = '',
  suffix = '',
  decimals = 0,
  trend = 'neutral',
  delay = 0
}: MetricCardProps) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-accent';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <motion.div
      className="metric-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <span className="text-sm font-medium">{getTrendIcon()}</span>
            <span className="text-sm font-medium">{change > 0 ? '+' : ''}{change.toFixed(1)}%</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <AnimatedCounter
          end={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          className="text-3xl font-bold text-foreground"
        />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </motion.div>
  );
};