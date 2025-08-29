
"use client";

import React, { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { useSidebar } from './ui/sidebar';
import { tourSteps } from '@/lib/tour';

const TOUR_STORAGE_KEY = 'actas-digitales-tour-completed';

export const ProductTour = () => {
  const [run, setRun] = useState(false);
  const { setOpen: setSidebarOpen } = useSidebar();

  useEffect(() => {
    const hasCompletedTour = localStorage.getItem(TOUR_STORAGE_KEY);
    // Automatically start the tour for first-time visitors
    if (!hasCompletedTour) {
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, step, type, action } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
      setSidebarOpen(true); // Ensure sidebar is open at the end
    }

    // Automatically open the sidebar for the first step
    if (type === 'step:before' && step.target === '#tour-step-1') {
      setSidebarOpen(true);
    }
  };

  return (
    <Joyride
      run={run}
      steps={tourSteps}
      continuous
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#ed365d',
          zIndex: 1000,
        },
        tooltip: {
          borderRadius: 'var(--radius)',
        },
        buttonClose: {
            display: 'none',
        },
      }}
      locale={{
        back: 'Atrás',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente',
        skip: 'Omitir',
      }}
    />
  );
};
