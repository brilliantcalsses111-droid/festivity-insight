import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ChartCard = ({ title, children, className = '', delay = 0 }: ChartCardProps) => {
  return (
    <motion.div
      className={`festival-card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      <div className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};