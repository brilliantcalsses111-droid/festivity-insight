import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Eye, EyeOff, Settings, Grip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface DashboardCard {
  id: string;
  title: string;
  component: React.ReactNode;
  minW?: number;
  minH?: number;
  defaultSize?: { w: number; h: number };
}

interface DashboardCardManagerProps {
  cards: DashboardCard[];
  className?: string;
}

export const DashboardCardManager: React.FC<DashboardCardManagerProps> = ({ 
  cards, 
  className = '' 
}) => {
  const [layout, setLayout] = useState<any[]>([]);
  const [hiddenCards, setHiddenCards] = useState<Set<string>>(new Set());
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Initialize layout and user preferences
  useEffect(() => {
    const savedLayout = localStorage.getItem('dashboard-layout');
    const savedHiddenCards = localStorage.getItem('dashboard-hidden-cards');
    const isReturningUser = localStorage.getItem('dashboard-visited');
    
    if (!isReturningUser) {
      setIsFirstVisit(true);
      localStorage.setItem('dashboard-visited', 'true');
    }

    if (savedLayout) {
      setLayout(JSON.parse(savedLayout));
    } else {
      // Generate default layout
      const defaultLayout = cards.map((card, index) => ({
        i: card.id,
        x: (index % 3) * 4,
        y: Math.floor(index / 3) * 3,
        w: card.defaultSize?.w || 4,
        h: card.defaultSize?.h || 3,
        minW: card.minW || 2,
        minH: card.minH || 2,
      }));
      setLayout(defaultLayout);
    }

    if (savedHiddenCards) {
      setHiddenCards(new Set(JSON.parse(savedHiddenCards)));
    }
  }, [cards]);

  // Save layout and preferences
  const savePreferences = () => {
    localStorage.setItem('dashboard-layout', JSON.stringify(layout));
    localStorage.setItem('dashboard-hidden-cards', JSON.stringify([...hiddenCards]));
  };

  useEffect(() => {
    savePreferences();
  }, [layout, hiddenCards]);

  const onLayoutChange = (newLayout: any[]) => {
    setLayout(newLayout);
  };

  const toggleCardVisibility = (cardId: string) => {
    const newHiddenCards = new Set(hiddenCards);
    if (newHiddenCards.has(cardId)) {
      newHiddenCards.delete(cardId);
    } else {
      newHiddenCards.add(cardId);
    }
    setHiddenCards(newHiddenCards);
  };

  const resetLayout = () => {
    const defaultLayout = cards.map((card, index) => ({
      i: card.id,
      x: (index % 3) * 4,
      y: Math.floor(index / 3) * 3,
      w: card.defaultSize?.w || 4,
      h: card.defaultSize?.h || 3,
      minW: card.minW || 2,
      minH: card.minH || 2,
    }));
    setLayout(defaultLayout);
    setHiddenCards(new Set());
  };

  const visibleCards = cards.filter(card => !hiddenCards.has(card.id));
  const visibleLayout = layout.filter(item => !hiddenCards.has(item.i));

  // Simplified view for first-time users
  const getSimplifiedCards = () => {
    return cards.slice(0, 4); // Show only top 4 cards for new users
  };

  const displayCards = isFirstVisit ? getSimplifiedCards() : visibleCards;
  const ResponsiveGridLayout = WidthProvider(Responsive);

  return (
    <div className={`space-y-4 ${className}`} data-tour="dashboard-controls">
      {/* Dashboard Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>{isEditMode ? 'Save Layout' : 'Customize'}</span>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Cards</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Dashboard Cards</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {cards.map((card) => (
                  <div key={card.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{card.title}</span>
                    <Switch
                      checked={!hiddenCards.has(card.id)}
                      onCheckedChange={() => toggleCardVisibility(card.id)}
                    />
                  </div>
                ))}
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={resetLayout}>
                    Reset Layout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isFirstVisit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg"
          >
            <p className="text-sm text-primary font-medium">
              ✨ Simplified view for new users
            </p>
          </motion.div>
        )}
      </div>

      {/* Grid Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: visibleLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        onLayoutChange={onLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
      >
        {displayCards.map((card) => (
          <div key={card.id} className="relative">
            <motion.div
              className={`h-full ${isEditMode ? 'cursor-move' : ''}`}
              whileHover={isEditMode ? { scale: 1.02 } : {}}
              transition={{ duration: 0.2 }}
            >
              {isEditMode && (
                <div className="absolute top-2 right-2 z-10 bg-background/80 backdrop-blur-sm rounded p-1">
                  <Grip className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="h-full pt-0">
                  {card.component}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ))}
      </ResponsiveGridLayout>

      {isEditMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-background/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg"
        >
          <p className="text-sm text-muted-foreground">
            Drag to move • Resize handles on corners • Toggle cards visibility
          </p>
        </motion.div>
      )}
    </div>
  );
};