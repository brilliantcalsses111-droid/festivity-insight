import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EnhancedTooltipProps {
  title: string;
  description: string;
  value?: string | number;
  trend?: 'up' | 'down' | 'neutral';
  children: React.ReactNode;
}

export const EnhancedTooltip: React.FC<EnhancedTooltipProps> = ({
  title,
  description,
  value,
  trend,
  children
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-accent';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIndicator = () => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-help">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-sm">{title}</h4>
            </div>
            
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
            
            {value && (
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs font-medium">Current Value:</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-bold">{value}</span>
                  {trend && (
                    <span className={`text-xs ${getTrendColor()}`}>
                      {getTrendIndicator()}
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};