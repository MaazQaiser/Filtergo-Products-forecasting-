import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  ButtonGroup,
  IconButton,
  Divider,
  Avatar,
  Tab,
  Tabs,
} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { colors } from '../theme/designTokens';
import ForecastingDrawer from './ForecastingDrawer';

type ViewMode = 'Day' | 'Week' | 'Month';

const TopHeader: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [view, setView] = useState<ViewMode>('Week');
  const [forecastOpen, setForecastOpen] = useState(false);

  const txt = (overrides?: object) => ({
    fontFamily: '"Inter", sans-serif',
    ...overrides,
  });

  const badgeSx = {
    bgcolor: colors.green50,
    color: colors.green600,
    borderRadius: '16px',
    px: 1,
    py: '2px',
    height: 24,
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  };

  return (
    <Box sx={{ bgcolor: colors.surfaceWhite, borderBottom: `1px solid ${colors.borderSubtle}`, flexShrink: 0 }}>
      {/* Row 1 */}
      <Box
        sx={{
          height: 60,
          px: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colors.borderSubtle}`,
          gap: '16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarMonthOutlinedIcon sx={{ fontSize: 16, color: colors.textSecondary01 }} />
          <Typography sx={txt({ fontSize: 14, fontWeight: 400, color: colors.textSecondary01, lineHeight: '20px' })}>
            Schedule
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, minWidth: 0, ml: 'auto', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={badgeSx}>
              <Typography sx={txt({ fontSize: 12, fontWeight: 500, lineHeight: '18px' })}>US Central Time</Typography>
            </Box>
            <Box sx={badgeSx}>
              <Typography sx={txt({ fontSize: 12, fontWeight: 500, lineHeight: '18px' })}>ID: 1234</Typography>
            </Box>
            <Button
              variant="outlined"
              endIcon={<ExpandMoreIcon sx={{ fontSize: 14 }} />}
              sx={{
                textTransform: 'none',
                height: 36,
                px: '14px',
                borderColor: colors.borderSubtle,
                color: colors.textSecondary01,
                fontSize: 12,
                fontWeight: 500,
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                minWidth: '224px',
              }}
            >
              #709 Columbus, Georgia
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            <IconButton size="small" sx={{ color: colors.textSecondary01 }}>
              <NotificationsOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton size="small" sx={{ color: colors.textSecondary01 }}>
              <ChatOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, cursor: 'pointer' }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: colors.brandSubtle, color: colors.brand, fontSize: 14, fontWeight: 500 }}>
              MS
            </Avatar>
            <Box>
              <Typography sx={txt({ fontSize: 14, fontWeight: 500, color: colors.textSecondary01, lineHeight: '20px' })}>
                Mike Smith
              </Typography>
              <Typography sx={txt({ fontSize: 12, color: colors.textSecondary03, lineHeight: '18px' })}>
                Franchise Owner
              </Typography>
            </Box>
            <ExpandMoreIcon sx={{ fontSize: 14, color: colors.textSecondary03, mt: '-10px' }} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          px: 0,
          pt: 1,
          pb: 1,
          ml: '32px',
          mr: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'end',
            columnGap: 1,
            borderBottom: `1px solid ${colors.borderSubtle}`,
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              width: '100%',
              minWidth: 0,
              minHeight: 28,
              '& .MuiTabs-list': {
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                columnGap: '12px',
              },
              '& .MuiTab-root': {
                minWidth: 'fit-content',
                width: 'fit-content',
                marginRight: 0,
                paddingLeft: 0,
                paddingRight: 0,
              },
              '& .MuiTabs-indicator': { backgroundColor: colors.green600, height: 2 },
            }}
          >
            {['Overview', 'Sites', 'Location', 'Officer'].map((t) => (
              <Tab
                key={t}
                label={t}
                disableRipple
                sx={{
                  minHeight: 28,
                  py: 0,
                  px: 0,
                  mr: 0,
                  width: 'fit-content',
                  minWidth: 'fit-content',
                  fontSize: 12,
                  fontWeight: 400,
                  color: colors.textPlaceholder,
                  '&.Mui-selected': { color: colors.green600, fontWeight: 400 },
                }}
              />
            ))}
          </Tabs>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: '2px', justifySelf: 'end' }}>
            <Button
              variant="text"
              size="small"
              onClick={() => setForecastOpen(true)}
              startIcon={<TrendingUpIcon sx={{ fontSize: 14 }} />}
              sx={{
                color: colors.textSecondary01,
                fontSize: 12,
                fontWeight: 500,
                height: 32,
                borderRadius: '8px',
                textTransform: 'none',
              }}
            >
              Forecasting
            </Button>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: colors.borderSubtle,
                my: '4px',
                mx: 0.5,
              }}
            />
            <Button
              variant="text"
              size="small"
              startIcon={<AddIcon sx={{ fontSize: 14 }} />}
              endIcon={<ExpandMoreIcon sx={{ fontSize: 14 }} />}
              sx={{
                color: colors.green600,
                fontSize: 12,
                fontWeight: 500,
                height: 32,
                borderRadius: '8px',
              }}
            >
              Create
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
            <Button
              size="small"
              startIcon={<SearchIcon sx={{ fontSize: 14 }} />}
              endIcon={<ExpandMoreIcon sx={{ fontSize: 13 }} />}
              sx={{
                color: colors.textSecondary01,
                borderRadius: '8px',
                fontSize: 12,
                height: 32,
                px: 1,
                bgcolor: colors.surfaceWhite,
                fontWeight: 500,
              }}
            >
              Sites
            </Button>
            {['Shifts', 'Officer', 'Status'].map((f) => (
            <Button
              key={f}
              size="small"
              endIcon={<ExpandMoreIcon sx={{ fontSize: 13 }} />}
              sx={{
                color: colors.textSecondary01,
                borderRadius: '8px',
                fontSize: 12,
                height: 32,
                px: 1,
                bgcolor: colors.surfaceWhite,
                fontWeight: 500,
              }}
            >
              {f}
            </Button>
          ))}
            <Button
              size="small"
              startIcon={<TuneIcon sx={{ fontSize: 14, color: colors.green600 }} />}
              sx={{
                color: colors.green600,
                fontSize: 12,
                fontWeight: 500,
                height: 32,
                px: 1,
              }}
            >
              Filters
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ChevronLeftIcon sx={{ fontSize: 14 }} />}
              endIcon={<ChevronRightIcon sx={{ fontSize: 14 }} />}
              sx={{
                borderColor: colors.borderSubtle,
                borderRadius: '8px',
                color: colors.textPrimary,
                textTransform: 'none',
                fontSize: 12,
                fontWeight: 500,
                height: 32,
                px: 1.25,
              }}
            >
              Jan 19 - Jan 25, 2026
            </Button>

          <ButtonGroup
            size="small"
            sx={{
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '& .MuiButtonGroup-grouped': {
                border: 'none !important',
                minWidth: 0,
                borderRadius: '8px',
              },
            }}
          >
            {(['Day', 'Week', 'Month'] as ViewMode[]).map((v) => (
              <Button
                key={v}
                onClick={() => setView(v)}
                sx={{
                  fontSize: 12,
                  height: 28,
                  width: 76,
                  minWidth: 76,
                  px: v === 'Day' || v === 'Month' ? 3 : 1.5,
                  bgcolor: view === v ? colors.green600 : colors.surfaceWhite,
                  color: view === v ? colors.textOnColor : colors.textSecondary01,
                  fontWeight: view === v ? 500 : 400,
                  borderRadius: '8px',
                  '&:hover': { bgcolor: view === v ? colors.green600 : colors.surfaceGreySubtle },
                }}
              >
                {v}
              </Button>
            ))}
          </ButtonGroup>
          </Box>
        </Box>
      </Box>
      <ForecastingDrawer open={forecastOpen} onClose={() => setForecastOpen(false)} />
    </Box>
  );
};

export default TopHeader;
