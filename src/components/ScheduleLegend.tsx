import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { colors, spacing, shiftPalette, statusPalette } from '../theme/designTokens';

const txt = (overrides?: object) => ({
  fontFamily: '"Inter", sans-serif',
  ...overrides,
});

const ShiftLegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: '2px',
        bgcolor: color,
        flexShrink: 0,
      }}
    />
    <Typography sx={txt({ fontSize: 11, color: colors.textSecondary01 })}>{label}</Typography>
  </Box>
);

const StatusLegendItem: React.FC<{ color: string; label: string; count?: number }> = ({
  color,
  label,
  count,
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        bgcolor: color,
        flexShrink: 0,
      }}
    />
    <Typography sx={txt({ fontSize: 11, color: colors.textSecondary01 })}>
      {label}
      {count !== undefined && (
        <Box component="span" sx={{ fontWeight: 500, color: colors.textPrimary, ml: '2px' }}>
          {count}
        </Box>
      )}
    </Typography>
  </Box>
);

const ScheduleLegend: React.FC = () => (
  <Box
    sx={{
      height:      spacing.legendH,
      borderTop:   `1px solid ${colors.borderSubtle}`,
      bgcolor:     colors.surfaceWhite,
      px:          '20px',
      display:     'flex',
      alignItems:  'center',
      gap:          '16px',
      flexShrink:  0,
      overflowX:   'auto',
      '&::-webkit-scrollbar': { display: 'none' },
    }}
  >
    {/* Shift type legends */}
    <ShiftLegendItem color={shiftPalette.dedicated.border}  label={shiftPalette.dedicated.text} />
    <ShiftLegendItem color={shiftPalette.patrol.border}     label={shiftPalette.patrol.text} />
    <ShiftLegendItem color={shiftPalette.extraJob.border}   label={shiftPalette.extraJob.text} />
    <ShiftLegendItem color={shiftPalette.extraSheet.border} label={shiftPalette.extraSheet.text} />
    <ShiftLegendItem color={shiftPalette.dispatch.border}   label={shiftPalette.dispatch.text} />

    <Divider orientation="vertical" flexItem sx={{ borderColor: colors.borderSubtle, height: 16, my: 'auto' }} />

    {/* Status counts */}
    <StatusLegendItem color={statusPalette.completed.color}  label={statusPalette.completed.label}  count={20} />
    <StatusLegendItem color={statusPalette.inProgress.color} label={statusPalette.inProgress.label} />
    <StatusLegendItem color={statusPalette.notStarted.color} label={statusPalette.notStarted.label} />
    <StatusLegendItem color={statusPalette.unassigned.color} label={statusPalette.unassigned.label} />
    <StatusLegendItem color={statusPalette.splitted.color}   label={statusPalette.splitted.label} />
  </Box>
);

export default ScheduleLegend;
