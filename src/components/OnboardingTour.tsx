import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS, EVENTS } from 'react-joyride';
import { useTheme } from './ThemeProvider';

interface OnboardingTourProps {
  onComplete?: () => void;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  const [runTour, setRunTour] = useState(false);
  const { mode } = useTheme();

  const steps = [
    {
      target: '[data-tour="theme-selector"]',
      content: 'Welcome to Festivity Insight! Start by choosing your preferred theme and appearance mode here.',
      placement: 'bottom' as const,
    },
    {
      target: '[data-tour="metric-cards"]',
      content: 'These metric cards show your key performance indicators. You can customize, hide, or rearrange them.',
      placement: 'bottom' as const,
    },
    {
      target: '[data-tour="charts"]',
      content: 'Interactive charts provide detailed insights. Click on chart elements to drill down into specific data.',
      placement: 'top' as const,
    },
    {
      target: '[data-tour="filters"]',
      content: 'Use these filters to customize your data view by date range, location, or ticket type.',
      placement: 'bottom' as const,
    },
    {
      target: '[data-tour="dashboard-controls"]',
      content: 'Customize your dashboard layout here. Drag and drop cards, resize them, or hide cards you don\'t need.',
      placement: 'bottom' as const,
    },
    {
      target: '[data-tour="ai-chat"]',
      content: 'Need help? Click here to chat with our AI assistant for insights about your data and dashboard tips.',
      placement: 'left' as const,
    },
    {
      target: '[data-tour="sidebar"]',
      content: 'Navigate between different sections of your analytics dashboard using this sidebar.',
      placement: 'right' as const,
    },
  ];

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('onboarding-tour-completed');
    if (!hasSeenTour) {
      setTimeout(() => setRunTour(true), 1000); // Delay to ensure DOM is ready
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem('onboarding-tour-completed', 'true');
      onComplete?.();
    }
  };

  const tourStyles = {
    options: {
      primaryColor: 'hsl(var(--primary))',
      backgroundColor: mode === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--background))',
      textColor: 'hsl(var(--foreground))',
      overlayColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)',
      arrowColor: mode === 'dark' ? 'hsl(var(--card))' : 'hsl(var(--background))',
      zIndex: 10000,
    },
    tooltip: {
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'inherit',
    },
    buttonNext: {
      background: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      borderRadius: '6px',
      border: 'none',
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: '500',
    },
    buttonBack: {
      color: 'hsl(var(--muted-foreground))',
      marginRight: '8px',
      border: 'none',
      background: 'transparent',
      fontSize: '14px',
    },
    buttonSkip: {
      color: 'hsl(var(--muted-foreground))',
      border: 'none',
      background: 'transparent',
      fontSize: '14px',
    },
    buttonClose: {
      color: 'hsl(var(--muted-foreground))',
      border: 'none',
      background: 'transparent',
      fontSize: '18px',
      padding: '0',
      width: '24px',
      height: '24px',
    },
  };

  return (
    <Joyride
      steps={steps}
      run={runTour}
      callback={handleJoyrideCallback}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      styles={tourStyles}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Got it!',
        next: 'Next',
        skip: 'Skip Tour',
      }}
      floaterProps={{
        disableAnimation: false,
      }}
    />
  );
};