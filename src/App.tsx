import React from 'react';
import { Box } from '@mui/material';
import SideNav from './components/SideNav';
import TopHeader from './components/TopHeader';
import CalendarGrid from './components/CalendarGrid';
import ScheduleLegend from './components/ScheduleLegend';

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Left navigation */}
      <SideNav />

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <TopHeader />
        <CalendarGrid />
        <ScheduleLegend />
      </Box>
    </Box>
  );
};

export default App;
