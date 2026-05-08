import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { WEEK_DAYS, ROW_GROUPS } from '../data/scheduleData';
import ScheduleCard from './ScheduleCard';
import { colors, spacing } from '../theme/designTokens';

const TODAY_INDEX = 3; // WED

// Label + day columns share the same width model for perfect alignment.
const COL_MIN  = 120;   // px – minimum day-column width before horizontal scroll kicks in
const GRID_MIN = COL_MIN * 8; // 1 label + 7 day columns
const GRID_TEMPLATE_COLUMNS = 'repeat(8, minmax(0, 1fr))';

const txt = (overrides?: object) => ({
  fontFamily: '"Inter", sans-serif',
  ...overrides,
});

// ── Shared column sx helpers ─────────────────────────────────────────────────

/** Fixed label column */
const labelColSx = {
  minWidth: 0,
};

/** Fluid day column – stretches equally */
const dayColSx = {
  minWidth: 0,
};

// ── Day header cell ──────────────────────────────────────────────────────────

const DayHeaderCell: React.FC<{
  day: { short: string; date: number };
  isToday: boolean;
}> = ({ day, isToday }) => (
  <Box
    sx={{
      ...dayColSx,
      height:       spacing.headerH,
      display:      'flex',
      alignItems:   'center',
      px:           '10px',
      gap:          '6px',
      bgcolor:      isToday ? colors.successStrong : colors.surfaceWhite,
      borderBottom: `1px solid ${colors.borderSubtle}`,
      borderRight:  `1px solid ${colors.borderSubtle}`,
    }}
  >
    <Typography
      sx={txt({
        fontSize:      11,
        fontWeight:    600,
        color:         isToday ? 'rgba(255,255,255,0.75)' : colors.textSecondary03,
        letterSpacing: '0.05em',
        whiteSpace:    'nowrap',
      })}
    >
      {day.short}
    </Typography>
    <Box
      sx={{
        width:          22,
        height:         22,
        borderRadius:   '50%',
        bgcolor:        isToday ? 'rgba(255,255,255,0.18)' : 'transparent',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
      }}
    >
      <Typography
        sx={txt({
          fontSize:   13,
          fontWeight: isToday ? 700 : 500,
          color:      isToday ? colors.white : colors.textPrimary,
        })}
      >
        {day.date}
      </Typography>
    </Box>
  </Box>
);

// ── Main grid ────────────────────────────────────────────────────────────────

const CalendarGrid: React.FC = () => (
  <Box
    sx={{
      flex:     1,
      overflow: 'auto',
      bgcolor:  colors.surfaceWhite,
      // custom scrollbar styling
      '&::-webkit-scrollbar':       { height: 6, width: 6 },
      '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
      '&::-webkit-scrollbar-thumb': { bgcolor: colors.grey100, borderRadius: 3 },
    }}
  >
    {/* Inner wrapper enforces minimum width so grid scrolls instead of crushing */}
    <Box
      sx={{
        display:       'flex',
        flexDirection: 'column',
        minWidth:      GRID_MIN,
        width:         '100%',
        minHeight:     '100%',
        pl:            '32px',
        pr:            '32px',
      }}
    >
      {/* ── Sticky header row ────────────────────────────────────────────── */}
      <Box
        sx={{
          display:  'grid',
          gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
          position: 'sticky',
          top:      0,
          zIndex:   20,
          bgcolor:  colors.surfaceWhite,
        }}
      >
        {/* Empty label-column header */}
        <Box
          sx={{
            ...labelColSx,
            height:       spacing.headerH,
            bgcolor:      colors.surfaceWhite,
            borderBottom: `1px solid ${colors.borderSubtle}`,
            borderRight:  `1px solid ${colors.borderSubtle}`,
          }}
        />
        {WEEK_DAYS.map((day, i) => (
          <DayHeaderCell key={day.short} day={day} isToday={i === TODAY_INDEX} />
        ))}
      </Box>

      {/* ── Data rows ────────────────────────────────────────────────────── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        {ROW_GROUPS.map((group) => (
          <Box
            key={group.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
              flex: 1,
              minHeight: group.rowHeight,
            }}
          >
            {/* Row label */}
            <Box
              sx={{
                ...labelColSx,
                minHeight:    0,
                bgcolor:      colors.surfaceWhite,
                borderBottom: `1px solid ${colors.borderSubtle}`,
                borderRight:  `1px solid ${colors.borderSubtle}`,
                px:           '10px',
                pt:           '10px',
                display:      'flex',
                flexDirection:'column',
              }}
            >
              {group.label && (
                <Typography
                  sx={txt({
                    fontSize:   11,
                    fontWeight: 500,
                    color:      colors.textSecondary01,
                    lineHeight: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  })}
                >
                  {group.label}
                </Typography>
              )}
            </Box>

            {/* Day cells */}
            {WEEK_DAYS.map((_, dayIndex) => {
              const dayCards = group.cards[dayIndex] ?? [];
              const isToday = dayIndex === TODAY_INDEX;

              return (
                <Box
                  key={dayIndex}
                  sx={{
                    ...dayColSx,
                    minHeight:    0,
                    borderBottom: `1px solid ${colors.borderSubtle}`,
                    borderRight:  `1px solid ${colors.borderSubtle}`,
                    py:           `${spacing.cellPadding}px`,
                    px:           `${spacing.cellPadding}px`,
                    display:      'flex',
                    flexDirection:'column',
                    gap:          '4px',
                    overflowY:    'auto',
                    bgcolor:      isToday ? '#F0FFF4' : colors.surfaceWhite,
                    '&:hover .add-btn': { opacity: 1 },
                  }}
                >
                  {dayCards.map((card) => (
                    <ScheduleCard key={card.id} card={card} shiftType={card.shiftType} />
                  ))}

                  {dayCards.length === 0 && (
                    <Button
                      className="add-btn"
                      size="small"
                      startIcon={<AddIcon sx={{ fontSize: 11 }} />}
                      sx={{
                        ...txt({ fontSize: 10, color: colors.textSecondary03 }),
                        opacity:       0,
                        transition:    'opacity 0.15s',
                        px:            '4px',
                        py:            0,
                        minWidth:      0,
                        height:        18,
                        textTransform: 'none',
                        alignSelf:     'flex-start',
                        '&:hover':     { color: colors.brand, bgcolor: 'transparent' },
                      }}
                    >
                      Move shifts here
                    </Button>
                  )}
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

export default CalendarGrid;
