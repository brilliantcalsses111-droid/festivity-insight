import { motion } from 'framer-motion';
import { Star, Leaf, TrendingUp } from 'lucide-react';
import { mockVendorData } from '@/lib/mockData';

export const VendorRanking = () => {
  const sortedVendors = [...mockVendorData].sort((a, b) => b.sales - a.sales);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-500';
      case 1: return 'text-gray-400';
      case 2: return 'text-orange-500';
      default: return 'text-muted-foreground';
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  return (
    <div className="festival-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Top Vendors</h3>
      
      <div className="space-y-4">
        {sortedVendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            className="flex items-center space-x-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Rank */}
            <div className={`text-lg font-bold w-8 ${getRankColor(index)}`}>
              {getRankIcon(index)}
            </div>

            {/* Vendor Info */}
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{vendor.name}</h4>
              <p className="text-sm text-muted-foreground">{vendor.category}</p>
            </div>

            {/* Metrics */}
            <div className="flex items-center space-x-4 text-sm">
              {/* Sales */}
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="font-medium">{formatCurrency(vendor.sales)}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{vendor.rating}</span>
              </div>

              {/* Green Score */}
              <div className="flex items-center space-x-1">
                <Leaf className="w-4 h-4 text-accent" />
                <span className="font-medium">{vendor.greenScore}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="mt-6 p-4 rounded-lg gradient-primary text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Total Vendor Revenue</p>
            <p className="text-xl font-bold">
              {formatCurrency(mockVendorData.reduce((sum, vendor) => sum + vendor.sales, 0))}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Average Green Score</p>
            <p className="text-xl font-bold">
              {Math.round(mockVendorData.reduce((sum, vendor) => sum + vendor.greenScore, 0) / mockVendorData.length)}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};