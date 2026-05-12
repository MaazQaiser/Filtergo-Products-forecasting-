import React, { useState, useMemo } from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Button,
  Collapse,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { getFlatRows, FILTER_SKUS, ALL_DAYS } from '../data/forecastingData';
import { colors } from '../theme/designTokens';

interface Props {
  open: boolean;
  onClose: () => void;
}

const txt = (overrides?: object) => ({
  fontFamily: '"Inter", sans-serif',
  ...overrides,
});

const DRAWER_ID = 'forecasting-drawer-print-root';
const DEFAULT_FROM = dayjs('2026-01-19');
const DEFAULT_TO   = dayjs('2026-01-25');


const ForecastingDrawer: React.FC<Props> = ({ open, onClose }) => {
  const [from, setFrom] = useState<Dayjs>(DEFAULT_FROM);
  const [to,   setTo]   = useState<Dayjs>(DEFAULT_TO);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen,   setToOpen]   = useState(false);

  const openFrom  = () => { setFromOpen(true);  setToOpen(false);  };
  const openTo    = () => { setFromOpen(false); setToOpen(true);   };
  const closeAll  = () => { setFromOpen(false); setToOpen(false);  };
  const [detailOpen, setDetailOpen] = useState(false);

  const fromStr = from.format('YYYY-MM-DD');
  const toStr   = to.format('YYYY-MM-DD');

  const rows = useMemo(() => getFlatRows(fromStr, toStr), [fromStr, toStr]);

  const jobCount = useMemo(() => {
    let count = 0;
    for (const day of ALL_DAYS) {
      if (day.date >= fromStr && day.date <= toStr) count += day.jobs.length;
    }
    return count;
  }, [fromStr, toStr]);

  const totalsByProduct = useMemo(() =>
    FILTER_SKUS.reduce<Record<string, number>>((acc, sku) => {
      acc[sku] = rows.filter(r => r.product === sku).reduce((s, r) => s + r.qty, 0);
      return acc;
    }, {}),
    [rows],
  );

  const grouped = useMemo(() => {
    const g: { dayLabel: string; date: string; rows: typeof rows }[] = [];
    for (const row of rows) {
      const last = g[g.length - 1];
      if (last && last.dayLabel === row.dayLabel) {
        last.rows.push(row);
      } else {
        g.push({ dayLabel: row.dayLabel, date: row.date, rows: [row] });
      }
    }
    return g;
  }, [rows]);

  const handleDownloadPDF = () => {
    const style = document.createElement('style');
    style.id = '__forecast-print-style';
    style.innerHTML = `
      @media print {
        body > * { display: none !important; }
        #${DRAWER_ID} { display: block !important; position: static !important; box-shadow: none !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          id: DRAWER_ID,
          sx: {
            width: 680,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Inter", sans-serif',
            bgcolor: colors.surfaceWhite,
          },
        },
      }}
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: '32px',
          pt: '22px',
          pb: '18px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colors.borderSubtle}`,
          flexShrink: 0,
        }}
      >
        <Box>
          <Typography sx={txt({ fontSize: 20, fontWeight: 700, color: colors.textPrimary, lineHeight: '28px' })}>
            Supplies Forecasting
          </Typography>
          <Typography sx={txt({ fontSize: 13, color: colors.textSecondary03, lineHeight: '20px', mt: '4px' })}>
            This is the supplies forecasting for upcoming jobs
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: colors.textSecondary03, mt: '4px' }}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* ── Scrollable body (date range + breakdown) ─────────────────────── */}
      <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

      {/* ── Date range ───────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: '24px',
          pt: '18px',
          pb: '18px',
          borderBottom: `1px solid ${colors.borderSubtle}`,
          flexShrink: 0,
        }}
      >
        {/* Section title */}
        <Typography sx={txt({ fontSize: 13, fontWeight: 600, color: colors.textSecondary03, mb: '14px' })}>
          Select duration for supplies forecasting
        </Typography>

        {/* Single unified date range field */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            onClick={() => { if (!fromOpen && !toOpen) openFrom(); }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: '8px',
              bgcolor: colors.surfaceWhite,
              height: 40,
              px: '12px',
              cursor: 'pointer',
              '&:focus-within': { borderColor: colors.green600, boxShadow: `0 0 0 2px ${colors.green600}22` },
            }}
          >
            {/* Centered date group */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
            <Box
              onClick={(e) => { e.stopPropagation(); openFrom(); }}
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
            <DatePicker
              value={from}
              open={fromOpen}
              onOpen={openFrom}
              onClose={closeAll}
              onChange={(val) => {
                if (val) { setFrom(val); openTo(); }
              }}
              maxDate={to}
              slotProps={{
                textField: {
                  variant: 'standard',
                  sx: {
                    width: 82,
                    cursor: 'pointer',
                    pointerEvents: 'none',
                    '& .MuiPickersSectionList-root, & input': {
                      fontSize: '14px',
                      fontFamily: '"Inter", sans-serif',
                      color: colors.textPrimary,
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                    },
                    '& .MuiPickersInputBase-root::before, & .MuiPickersInputBase-root::after': {
                      display: 'none',
                    },
                    '& .MuiInputBase-root:before, & .MuiInputBase-root:after': {
                      display: 'none',
                    },
                  },
                },
                openPickerButton: { sx: { display: 'none' } },
              }}
            />
            </Box>
            <Typography sx={txt({ fontSize: 12, color: colors.textSecondary03, flexShrink: 0 })}>–</Typography>
            <Box
              onClick={(e) => { e.stopPropagation(); openTo(); }}
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
            <DatePicker
              value={to}
              open={toOpen}
              onOpen={openTo}
              onClose={closeAll}
              onChange={(val) => {
                if (val) { setTo(val); closeAll(); }
              }}
              minDate={from}
              slotProps={{
                textField: {
                  variant: 'standard',
                  sx: {
                    width: 86,
                    cursor: 'pointer',
                    pointerEvents: 'none',
                    '& .MuiPickersSectionList-root, & input': {
                      fontSize: '14px',
                      fontFamily: '"Inter", sans-serif',
                      color: colors.textPrimary,
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                    },
                    '& .MuiPickersInputBase-root::before, & .MuiPickersInputBase-root::after': {
                      display: 'none',
                    },
                    '& .MuiInputBase-root:before, & .MuiInputBase-root:after': {
                      display: 'none',
                    },
                  },
                },
                openPickerButton: { sx: { display: 'none' } },
              }}
            />
            </Box>
            </Box>{/* end date group */}
            <IconButton size="small" onClick={(e) => { e.stopPropagation(); openFrom(); }} sx={{ p: '4px', color: colors.textSecondary03 }}>
              <CalendarTodayIcon sx={{ fontSize: 15 }} />
            </IconButton>
          </Box>
        </LocalizationProvider>
        {/* Job count — directly under date inputs */}
        <Typography sx={txt({ fontSize: 13, color: colors.textSecondary03, mt: '10px' })}>
          <Box component="span" sx={{ fontWeight: 600, color: colors.textPrimary }}>{jobCount}</Box>
          {' '}{jobCount === 1 ? 'job' : 'jobs'} in selected period
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: `1px solid ${colors.borderSubtle}`, mt: '14px', mb: '16px' }} />

        {/* You need — column-aligned numbered list */}
        <Typography sx={txt({ fontSize: 14, color: colors.textSecondary01, lineHeight: '20px', mb: '10px' })}>
          To execute jobs in this duration you need:
        </Typography>
        {/* Summary row */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            alignItems: 'center',
            height: 80,
            borderTop: `1px solid ${colors.borderSubtle}`,
            borderBottom: `1px solid ${colors.borderSubtle}`,
            bgcolor: colors.surfaceWhite,
          }}
        >
          {FILTER_SKUS.map((sku) => (
            <Box
              key={sku}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: '4px',
                height: '100%',
                px: '16px',
                position: 'relative',
                '&:not(:last-of-type)::after': {
                  content: '""',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  bgcolor: colors.borderSubtle,
                },
              }}
            >
              <Box sx={{ minWidth: 0, textAlign: 'left' }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={txt({ fontSize: 14, fontWeight: 500, color: colors.textPrimary, lineHeight: '20px' })} noWrap>
                    {sku}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'left', flexShrink: 0 }}>
                <Typography sx={txt({ fontSize: 14, fontWeight: 500, color: colors.green600, lineHeight: '20px' })}>
                  {totalsByProduct[sku] ?? 0}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Detail breakdown accordion toggle */}
        <Box
          onClick={() => setDetailOpen(v => !v)}
          sx={{
            mt: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            userSelect: 'none',
            color: colors.green600,
            '&:hover': { opacity: 0.75 },
          }}
        >
          <Typography sx={txt({ fontSize: 12, fontWeight: 600, color: colors.green600 })}>
            Detail breakdown
          </Typography>
          {detailOpen
            ? <ExpandLessIcon sx={{ fontSize: 16, color: colors.green600 }} />
            : <ExpandMoreIcon sx={{ fontSize: 16, color: colors.green600 }} />
          }
        </Box>
      </Box>

      {/* ── Collapsible detail breakdown ─────────────────────────────────── */}
      <Collapse in={detailOpen} sx={{ flexShrink: 0 }}>
        {/* Table column header */}
        <Box
          sx={{
            px: '32px',
            py: '10px',
            display: 'grid',
            gridTemplateColumns: '180px 70px 1fr',
          bgcolor: colors.surfaceWhite,
          borderBottom: `1px solid ${colors.borderSubtle}`,
          position: 'sticky',
            top: 0,
            zIndex: 2,
          }}
        >
          {['Product', 'Qty', 'Job'].map((h) => (
            <Typography
              key={h}
              sx={txt({
                fontSize: 11,
                fontWeight: 600,
                color: colors.textSecondary03,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              })}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {rows.length === 0 ? (
          <Box sx={{ px: '82px', py: '32px', textAlign: 'center' }}>
            <Typography sx={txt({ fontSize: 13, color: colors.textPlaceholder })}>
              No jobs found for the selected date range.
            </Typography>
          </Box>
        ) : (
          grouped.map((group) => {
            const dayJobCount = new Set(group.rows.map(r => r.job)).size;
            return (
              <Box key={group.dayLabel}>
                {/* Day row header — plain text, no badge */}
                <Box
                  sx={{
                    px: '32px',
                    py: '9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: '#F8F8F9',
                    borderBottom: `1px solid ${colors.borderSubtle}`,
                    borderTop: `1px solid ${colors.borderSubtle}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Typography sx={txt({ fontSize: 12, fontWeight: 700, color: colors.textPrimary, textTransform: 'uppercase', letterSpacing: '0.05em' })}>
                      {group.dayLabel}
                    </Typography>
                    <Typography sx={txt({ fontSize: 12, color: colors.textSecondary03, fontWeight: 400 })}>
                      · {dayJobCount} {dayJobCount === 1 ? 'job' : 'jobs'}
                    </Typography>
                  </Box>
                </Box>

                {/* Product rows */}
                {group.rows.map((row, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: '32px',
                      py: '10px',
                      display: 'grid',
                      gridTemplateColumns: '180px 70px 1fr',
                      alignItems: 'center',
                      borderBottom: `1px solid ${colors.borderSubtle}`,
                      bgcolor: colors.surfaceWhite,
                      '&:hover': { bgcolor: '#FAFAFA' },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: '9px',
                        py: '3px',
                        bgcolor: colors.green50,
                        borderRadius: '5px',
                        border: `1px solid ${colors.successBorder}`,
                        width: 'fit-content',
                      }}
                    >
                      <Typography sx={txt({ fontSize: 11, fontWeight: 700, color: colors.green600, letterSpacing: '0.03em' })}>
                        {row.product}
                      </Typography>
                    </Box>
                    <Typography sx={txt({ fontSize: 14, fontWeight: 700, color: colors.textPrimary })}>
                      {row.qty}
                    </Typography>
                    <Typography sx={txt({ fontSize: 12, color: colors.textSecondary01 })} noWrap>
                      {row.job}
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          })
        )}
      </Collapse>

      </Box>{/* end scrollable body */}

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: '32px',
          py: '16px',
          borderTop: `1px solid ${colors.borderSubtle}`,
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Button
          variant="outlined"
          startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
          onClick={handleDownloadPDF}
          sx={{
            alignSelf: 'flex-start',
            borderColor: colors.borderSubtle,
            color: colors.textSecondary01,
            fontSize: 13,
            fontWeight: 500,
            height: 40,
            px: '20px',
            borderRadius: '8px',
            textTransform: 'none',
            fontFamily: '"Inter", sans-serif',
            '&:hover': {
              borderColor: colors.green600,
              color: colors.green600,
              bgcolor: colors.green50,
            },
          }}
        >
          Download PDF
        </Button>
      </Box>
    </Drawer>
  );
};

export default ForecastingDrawer;
