import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sun, Moon } from 'lucide-react';
import { useTheme, Theme, Mode } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Helper function to get gradient end colors for Discord themes  
const getGradientEndColor = (themeName: string): string => {
  switch (themeName) {
    case 'discord-dark': return 'hsl(220, 13%, 18%)'; // #23272A equivalent
    case 'discord-violet': return 'hsl(271, 100%, 64%)'; // #9945FF equivalent  
    case 'discord-pastel': return 'hsl(200, 100%, 73%)'; // #77CCFF equivalent
    case 'discord-neon': return 'hsl(60, 100%, 50%)'; // #FFFF00 equivalent
    default: return 'hsl(220, 13%, 18%)';
  }
};

const themes: { name: Theme; color: string; label: string; description: string }[] = [
  { name: 'default', color: 'hsl(260, 73%, 62%)', label: 'Festival Purple', description: 'Classic festival vibes with deep purple accents' },
  { name: 'green', color: 'hsl(142, 76%, 36%)', label: 'Forest Green', description: 'Natural and earthy with vibrant green highlights' },
  { name: 'blue', color: 'hsl(210, 100%, 65%)', label: 'Ocean Blue', description: 'Cool and calming with ocean-inspired blues' },
  { name: 'purple', color: 'hsl(280, 73%, 62%)', label: 'Royal Purple', description: 'Elegant and sophisticated purple tones' },
  { name: 'orange', color: 'hsl(25, 95%, 53%)', label: 'Sunset Orange', description: 'Warm and energetic with sunset colors' },
  { name: 'red', color: 'hsl(0, 84%, 60%)', label: 'Cherry Red', description: 'Bold and passionate with cherry red accents' },
  { name: 'pink', color: 'hsl(330, 81%, 60%)', label: 'Cotton Candy', description: 'Sweet and playful with pink highlights' },
  { name: 'yellow', color: 'hsl(45, 93%, 47%)', label: 'Golden Sun', description: 'Bright and cheerful with golden yellow tones' },
  { name: 'discord-dark', color: 'hsl(227, 58%, 65%)', label: 'Discord Dark', description: 'Subdued atmospheric feel reminiscent of Discord dark mode' },
  { name: 'discord-violet', color: 'hsl(235, 85%, 64%)', label: 'Discord Violet', description: 'Bold and vibrant with Discord brand colors' },
  { name: 'discord-pastel', color: 'hsl(330, 100%, 70%)', label: 'Pastel Rainbow', description: 'Soft and dreamy with pastel rainbow gradients' },
  { name: 'discord-neon', color: 'hsl(300, 100%, 50%)', label: 'Neon Rainbow', description: 'Electric and bold with neon rainbow effects' },
];

const modes: { name: Mode; icon: React.ComponentType<any>; label: string }[] = [
  { name: 'light', icon: Sun, label: 'Light Mode' },
  { name: 'dark', icon: Moon, label: 'Dark Mode' },
];

export const ThemeSelector: React.FC = () => {
  const { theme, mode, setTheme, setMode } = useTheme();

  return (
    <div className="space-y-6">
      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Appearance Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {modes.map((modeOption) => (
              <Button
                key={modeOption.name}
                variant={mode === modeOption.name ? "default" : "outline"}
                onClick={() => setMode(modeOption.name)}
                className="flex items-center gap-2"
              >
                <modeOption.icon className="w-4 h-4" />
                {modeOption.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Theme Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Color Themes</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose your preferred color scheme for the dashboard
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <motion.div
                key={themeOption.name}
                className="relative cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(themeOption.name)}
              >
                <div
                  className="w-20 h-16 rounded-lg border-4 border-border flex items-center justify-center transition-all duration-200 hover:border-primary relative overflow-hidden"
                  style={{ 
                    backgroundColor: themeOption.color,
                    background: themeOption.name.startsWith('discord-') 
                      ? `linear-gradient(135deg, ${themeOption.color}, ${getGradientEndColor(themeOption.name)})`
                      : themeOption.color
                  }}
                >
                  {theme === themeOption.name && (
                    <Check className="w-6 h-6 text-white relative z-10" />
                  )}
                </div>
                <div className="text-center mt-2">
                  <p className="text-xs font-medium text-foreground">
                    {themeOption.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {themeOption.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="festival-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sample Dashboard Card</h3>
              <Button size="sm" className="gradient-primary">
                Action
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="metric-card p-4">
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold text-primary">1,234</p>
              </div>
              <div className="metric-card p-4">
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-secondary">$45,678</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};