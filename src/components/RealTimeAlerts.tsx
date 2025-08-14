import { motion } from 'framer-motion';
import { AlertTriangle, Users, Wifi, Clock, CheckCircle, Info } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Main Stage Near Capacity',
    message: 'Main stage area at 95% capacity. Consider crowd control measures.',
    timestamp: '2 minutes ago',
    icon: AlertTriangle
  },
  {
    id: 2,
    type: 'warning',
    title: 'Food Court Congestion',
    message: 'Long queues detected at food vendors. Deploy additional staff.',
    timestamp: '5 minutes ago',
    icon: Users
  },
  {
    id: 3,
    type: 'info',
    title: 'Network Performance',
    message: 'WiFi usage at 80%. All systems operating normally.',
    timestamp: '8 minutes ago',
    icon: Wifi
  },
  {
    id: 4,
    type: 'success',
    title: 'Emergency Drill Complete',
    message: 'Safety protocols tested successfully. All clear.',
    timestamp: '15 minutes ago',
    icon: CheckCircle
  },
  {
    id: 5,
    type: 'info',
    title: 'Schedule Update',
    message: 'Electronic stage set extended by 15 minutes due to crowd demand.',
    timestamp: '22 minutes ago',
    icon: Clock
  }
];

export const RealTimeAlerts = () => {
  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-destructive/10 border-destructive/30',
          icon: 'text-destructive',
          dot: 'bg-destructive'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10 border-yellow-500/30',
          icon: 'text-yellow-500',
          dot: 'bg-yellow-500'
        };
      case 'success':
        return {
          bg: 'bg-accent/10 border-accent/30',
          icon: 'text-accent',
          dot: 'bg-accent'
        };
      default:
        return {
          bg: 'bg-primary/10 border-primary/30',
          icon: 'text-primary',
          dot: 'bg-primary'
        };
    }
  };

  return (
    <div className="festival-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Real-Time Alerts</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-muted-foreground">Live Updates</span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts.map((alert, index) => {
          const styles = getAlertStyles(alert.type);
          
          return (
            <motion.div
              key={alert.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border ${styles.bg}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`p-2 rounded-full bg-background/50`}>
                <alert.icon className={`w-4 h-4 ${styles.icon}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground">{alert.title}</h4>
                  <div className={`w-2 h-2 rounded-full ${styles.dot} ${
                    alert.type === 'critical' ? 'animate-pulse' : ''
                  }`} />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  {(alert.type === 'critical' || alert.type === 'warning') && (
                    <motion.button
                      className="text-xs px-2 py-1 rounded bg-background/50 hover:bg-background/80 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Take Action
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-destructive">2</p>
            <p className="text-xs text-muted-foreground">Critical</p>
          </div>
          <div>
            <p className="text-xl font-bold text-yellow-500">1</p>
            <p className="text-xs text-muted-foreground">Warning</p>
          </div>
          <div>
            <p className="text-xl font-bold text-primary">2</p>
            <p className="text-xs text-muted-foreground">Info</p>
          </div>
          <div>
            <p className="text-xl font-bold text-accent">1</p>
            <p className="text-xs text-muted-foreground">Success</p>
          </div>
        </div>
      </div>
    </div>
  );
};