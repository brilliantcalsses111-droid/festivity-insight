import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Calendar,
  Radio,
  TrendingUp,
  Users,
  MapPin,
  Heart,
  Settings,
  Menu,
  X,
  Zap
} from 'lucide-react';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: BarChart3, path: '/' },
  { id: 'pre-event', label: 'Pre-Event', icon: Calendar, path: '/pre-event' },
  { id: 'live', label: 'Live Event', icon: Radio, path: '/live' },
  { id: 'post-event', label: 'Post-Event', icon: TrendingUp, path: '/post-event' },
  { id: 'audience', label: 'Audience', icon: Users, path: '/audience' },
  { id: 'venues', label: 'Venues', icon: MapPin, path: '/venues' },
  { id: 'sentiment', label: 'Crowd Mood', icon: Heart, path: '/sentiment' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' }
];

export const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      className={`festival-card h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-2 rounded-lg gradient-primary">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">FestivalHub</h1>
                <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
              </div>
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'gradient-primary text-white shadow-[var(--shadow-primary)]'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <item.icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Status Indicator */}
      {!isCollapsed && (
        <motion.div
          className="p-6 border-t border-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow"></div>
            <div>
              <p className="text-sm font-medium text-accent">Event Live</p>
              <p className="text-xs text-muted-foreground">Summer Music Festival</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};