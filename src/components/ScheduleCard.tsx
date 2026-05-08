import React from 'react';
import { Box, Typography } from '@mui/material';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { ScheduleCard as CardData } from '../data/scheduleData';
import { colors, shape, shiftPalette, type ShiftType } from '../theme/designTokens';

interface Props {
  card: CardData;
  shiftType?: ShiftType;
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  confirmed:  <CheckCircleIcon  sx={{ fontSize: 12, color: colors.successStrong }} />,
  pending:    <HourglassEmptyIcon sx={{ fontSize: 12, color: colors.warningStrong }} />,
  unassigned: <ErrorIcon   sx={{ fontSize: 12, color: colors.alertStrong }} />,
  overlap:    <WarningAmberIcon   sx={{ fontSize: 12, color: colors.darkOrange }} />,
};

const txt = (overrides?: object) => ({
  fontFamily: '"Inter", sans-serif',
  ...overrides,
});

const ScheduleCard: React.FC<Props> = ({ card, shiftType = 'dedicated' }) => {
  const palette = shiftPalette[shiftType];

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: palette.bg,
        borderRadius: `${shape.cardRadius}px`,
        borderLeft: `2px solid ${palette.border}`,
        border: `1px solid ${colors.borderSubtle}`,
        borderLeftWidth: 2,
        borderLeftColor: palette.border,
        overflow: 'hidden',
        px: '8px',
        pt: '6px',
        pb: '6px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'box-shadow 0.12s ease',
        '&:hover': { boxShadow: '0 1px 6px rgba(0,0,0,0.10)' },
      }}
    >
      {/* Time */}
      <Typography sx={txt({ fontSize: 10, fontWeight: 500, color: colors.textPrimary, lineHeight: '12px' })}>
        {card.time}
      </Typography>

      {/* Job / Runsheet name */}
      <Typography
        noWrap
        sx={txt({ fontSize: 10, fontWeight: 400, color: colors.textPlaceholder, lineHeight: '12px' })}
      >
        <Box component="span" sx={{ mr: '2px' }}>
          {shiftType === 'patrol' ? '🚗' : shiftType === 'dispatch' ? '🚨' : '📋'}
        </Box>
        {card.role}
      </Typography>

      {/* Employee name */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            bgcolor: card.avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 7,
            fontWeight: 700,
            color: '#fff',
            fontFamily: '"Inter", sans-serif',
            flexShrink: 0,
          }}
        >
          {card.avatarInitials}
        </Box>
        <Typography noWrap sx={txt({ fontSize: 10, color: colors.textPlaceholder, lineHeight: '12px' })}>
          {card.employeeName}
        </Typography>
      </Box>

      {/* Vehicle / ID row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <DirectionsCarOutlinedIcon sx={{ fontSize: 10, color: colors.textPlaceholder, flexShrink: 0 }} />
        <Typography noWrap sx={txt({ fontSize: 10, color: colors.textPlaceholder, lineHeight: '12px' })}>
          {card.id.toUpperCase()}
        </Typography>
      </Box>

      {/* Status dot – absolute bottom-right */}
      <Box sx={{ position: 'absolute', bottom: 5, right: 5 }}>
        {STATUS_ICON[card.status] ?? null}
      </Box>
    </Box>
  );
};

export default ScheduleCard;
