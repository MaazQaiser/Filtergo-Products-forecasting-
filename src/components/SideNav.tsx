import React, { useState } from 'react';
import { Box, Tooltip } from '@mui/material';
import filtergoWordmark from '../assets/filtergo-wordmark.svg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { colors, shape, spacing } from '../theme/designTokens';

interface NavItem {
  icon: React.ReactNode;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: <HomeOutlinedIcon sx={{ fontSize: 18 }} />,                  label: 'Dashboard' },
  { icon: <PublicOutlinedIcon sx={{ fontSize: 18 }} />,                label: 'Signal map' },
  { icon: <AccountTreeOutlinedIcon sx={{ fontSize: 18 }} />,           label: 'Shifts' },
  { icon: <PlaceOutlinedIcon sx={{ fontSize: 18 }} />,                 label: 'Sites' },
  { icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 18 }} />,         label: 'Schedule' },
  { icon: <DeviceHubOutlinedIcon sx={{ fontSize: 18 }} />,             label: 'Roster split' },
  { icon: <PeopleOutlinedIcon sx={{ fontSize: 18 }} />,                label: 'Users' },
  { icon: <PaidOutlinedIcon sx={{ fontSize: 18 }} />,                  label: 'Payroll' },
  { icon: <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />,           label: 'Invoices' },
  { icon: <BarChartOutlinedIcon sx={{ fontSize: 18 }} />,              label: 'Insights' },
  { icon: <ApartmentOutlinedIcon sx={{ fontSize: 18 }} />,             label: 'Leaderboard' },
  { icon: <SensorsOutlinedIcon sx={{ fontSize: 18 }} />,               label: 'Devices' },
  { icon: <DirectionsCarOutlinedIcon sx={{ fontSize: 18 }} />,         label: 'Fleet' },
  { icon: <AssignmentOutlinedIcon sx={{ fontSize: 18 }} />,            label: 'Documents' },
];

const NavBtn: React.FC<{
  item: NavItem;
  active: boolean;
  hasAlert?: boolean;
  onClick: () => void;
}> = ({ item, active, hasAlert, onClick }) => (
  <Tooltip title={item.label} placement="right" arrow>
    <Box
      onClick={onClick}
      sx={{
        position: 'relative',
        width: 44,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: `${shape.navItemRadius}px`,
        cursor: 'pointer',
        color: active ? colors.surfaceWhite : 'rgba(255,255,255,0.88)',
        bgcolor: active ? colors.successStrong : 'transparent',
        transition: 'background-color 0.15s ease, color 0.15s ease',
        '&:hover': {
          bgcolor: active ? colors.successStrong : 'rgba(255,255,255,0.08)',
          color:   active ? colors.surfaceWhite : colors.textOnColor,
        },
      }}
    >
      {item.icon}
      {hasAlert && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: colors.alertStrong,
            border: `1.5px solid ${colors.surfaceGreyStrong2}`,
          }}
        />
      )}
    </Box>
  </Tooltip>
);

const SideNav: React.FC = () => {
  const [active, setActive] = useState(4);

  return (
    <Box
      sx={{
        position: 'relative',
        width: spacing.navWidth,
        minHeight: '100vh',
        bgcolor: colors.surfaceGreyStrong2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: '8px',
        py: '16px',
        flexShrink: 0,
        zIndex: 200,
      }}
    >
      {/* Wordmark / Logo */}
      <Box sx={{ width: 72, height: 54, mb: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', px: '10px' }}>
        <Box
          component="img"
          src={filtergoWordmark}
          alt="Filtergo"
          sx={{ width: 58, height: 18, display: 'block' }}
        />
      </Box>

      {/* Nav items */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {NAV_ITEMS.map((item, i) => (
          <NavBtn
            key={item.label}
            item={item}
            active={i === active}
            hasAlert={i === 6}
            onClick={() => setActive(i)}
          />
        ))}
      </Box>

      {/* Settings */}
      <Tooltip title="Settings" placement="right" arrow>
        <Box
          sx={{
            width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: `${shape.navItemRadius}px`,
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.88)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', color: colors.textOnColor },
          }}
        >
          <SettingsOutlinedIcon sx={{ fontSize: 18 }} />
        </Box>
      </Tooltip>

      {/* Collapse rail control */}
      <Box
        sx={{
          position: 'absolute',
          right: -14,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 28,
          height: 28,
          borderRadius: '50%',
          bgcolor: colors.surfaceGreyStrong2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.textOnColor,
          cursor: 'pointer',
          border: `1px solid ${colors.surfaceGreyStrong1}`,
        }}
      >
        <KeyboardDoubleArrowRightOutlinedIcon sx={{ fontSize: 16 }} />
      </Box>
    </Box>
  );
};

export default SideNav;
