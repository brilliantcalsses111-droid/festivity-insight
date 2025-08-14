import { motion } from 'framer-motion';
import { MapPin, Users, AlertTriangle } from 'lucide-react';

const areaData = [
  { name: 'Main Stage', density: 95, capacity: 40000, current: 38000, status: 'critical' },
  { name: 'Food Court', density: 78, capacity: 8000, current: 6240, status: 'high' },
  { name: 'Electronic Stage', density: 68, capacity: 15000, current: 10200, status: 'moderate' },
  { name: 'Merchandise Area', density: 45, capacity: 5000, current: 2250, status: 'low' },
  { name: 'VIP Lounge', density: 60, capacity: 2000, current: 1200, status: 'moderate' },
  { name: 'Entry Gates', density: 35, capacity: 10000, current: 3500, status: 'low' },
  { name: 'Rest Areas', density: 40, capacity: 6000, current: 2400, status: 'low' },
  { name: 'Restrooms', density: 85, capacity: 3000, current: 2550, status: 'high' }
];

export const LiveCrowdHeatmap = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-yellow-500';
      case 'moderate': return 'text-primary';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive';
      case 'high': return 'bg-yellow-500';
      case 'moderate': return 'bg-primary';
      case 'low': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return AlertTriangle;
      case 'high': return AlertTriangle;
      default: return Users;
    }
  };

  return (
    <div className="w-full h-80 space-y-3 overflow-y-auto">
      {areaData.map((area, index) => {
        const StatusIcon = getStatusIcon(area.status);
        
        return (
          <motion.div
            key={area.name}
            className="flex items-center space-x-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className={`p-2 rounded-full ${
                area.status === 'critical' ? 'bg-destructive/20' :
                area.status === 'high' ? 'bg-yellow-500/20' :
                area.status === 'moderate' ? 'bg-primary/20' :
                'bg-accent/20'
              }`}>
                <StatusIcon className={`w-4 h-4 ${getStatusColor(area.status)}`} />
              </div>
              <div>
                <p className="font-medium text-foreground">{area.name}</p>
                <p className="text-sm text-muted-foreground">
                  {area.current.toLocaleString()} / {area.capacity.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 min-w-0">
              <div className="flex-1 bg-muted rounded-full h-3 min-w-[100px]">
                <motion.div
                  className={`h-3 rounded-full ${getStatusBg(area.status)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${area.density}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
              <div className="text-right min-w-[50px]">
                <p className={`font-bold ${getStatusColor(area.status)}`}>
                  {area.density}%
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {area.status}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};