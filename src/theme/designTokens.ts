/**
 * Design tokens extracted directly from Figma file: Filter-Go (T9Blj6fylfJN72yrAEzGn5)
 * Source: get_variable_defs on node 1575:21641
 * These are the source-of-truth values — all components must reference these, never hardcode colors.
 */

// ─── Color Palette ────────────────────────────────────────────────────────────

export const colors = {
  // Brand
  brand:              '#146DFF',
  brandSubtle:        '#E5F6FF',
  brandBorder:        '#146DFF',

  // Greens
  green50:            '#EAF6EE',
  green600:           '#29964A',
  successStrong:      '#31A150',
  successSubtle:      '#EFF8EF',
  successBorder:      '#2E964B',

  // Greys
  grey100:            '#E6E6E7',
  grey500:            '#707175',
  grey800:            '#444446',
  grey950:            '#262527',

  // Surfaces
  surfaceWhite:       '#FFFFFF',
  surfaceGreySubtle:  '#F5F5F6',
  surfaceGreyStrong1: '#6A6A70',
  surfaceGreyStrong2: '#262527',

  // Warning / Orange
  warningStrong:      '#F4780B',
  warningSubtle:      '#FEF0C7',
  warningBorder:      '#DC6803',
  darkOrange:         '#F77619',
  orange900:          '#7E2F10',

  // Alert / Red
  alertStrong:        '#E43F32',

  // Purple / Assign
  purple500:          '#A142F5',
  chipPurpleLight:    '#F6ECFE',

  // Text
  textPrimary:        '#262527',
  textSecondary01:    '#444446',
  textSecondary03:    '#86868B',
  textPlaceholder:    '#6A6A70',
  textPlaceholderFld: '#CCCCCC',
  textOnColor:        '#FFFFFF',
  textBrand:          '#146DFF',

  // Border
  borderSubtle:       '#E6E6E7',
  borderStrong02:     '#6A6A70',

  // General
  white:              '#FFFFFF',
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const typography = {
  fontFamily: '"Inter", "Roboto", "Helvetica Neue", sans-serif',

  subtitleMedium: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: 0,
  },
  subtitleSmall: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  overline: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 10,
    fontWeight: 500,
    lineHeight: '14px',
    letterSpacing: 0,
  },
  textXsMedium: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: 0,
  },
  // Card-level (compact schedule cells)
  cardTime: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 10,
    fontWeight: 500,
    lineHeight: '12px',
  },
  cardBody: {
    fontFamily: '"Inter", sans-serif',
    fontSize: 10,
    fontWeight: 400,
    lineHeight: '12px',
  },
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

export const spacing = {
  cardPaddingH: 8,
  cardPaddingV: 6,
  cellPadding:  8,
  navWidth:     76,
  labelWidth:   162,
  colWidth:     162.5,
  headerH:      40,
  topBarH:      48,
  tabBarH:      40,
  filterBarH:   44,
  legendH:      36,
} as const;

// ─── Shape ────────────────────────────────────────────────────────────────────

export const shape = {
  cardRadius:   4,
  chipRadius:   4,
  buttonRadius: 6,
  navItemRadius:8,
  avatarRadius: 200,
} as const;

// ─── Shift-type card palette ──────────────────────────────────────────────────
// Each shift type maps to: bg, leftBorder, dotColor, labelColor

export const shiftPalette = {
  dedicated:  { bg: '#EFF8EF', border: '#29964A', dot: '#31A150', label: '#2E964B', text: 'Dedicated' },
  patrol:     { bg: '#E5F6FF', border: '#146DFF', dot: '#146DFF', label: '#146DFF', text: 'Patrol' },
  extraJob:   { bg: '#FEF0C7', border: '#F4780B', dot: '#F4780B', label: '#DC6803', text: 'Extra Job' },
  extraSheet: { bg: '#EAF6EE', border: '#29964A', dot: '#29964A', label: '#29964A', text: 'Extra Runsheet' },
  dispatch:   { bg: '#F6ECFE', border: '#A142F5', dot: '#A142F5', label: '#A142F5', text: 'Dispatch' },
  unassigned: { bg: '#F5F5F6', border: '#6A6A70', dot: '#86868B', label: '#6A6A70', text: 'Unassigned' },
  ot:         { bg: '#FEF0C7', border: '#F77619', dot: '#F77619', label: '#F77619', text: 'OT' },
} as const;

export type ShiftType = keyof typeof shiftPalette;

// ─── Status indicator palette ─────────────────────────────────────────────────

export const statusPalette = {
  completed:   { color: '#31A150', label: 'Completed' },
  inProgress:  { color: '#146DFF', label: 'In progress' },
  notStarted:  { color: '#86868B', label: 'Not started' },
  unassigned:  { color: '#E43F32', label: 'Unassigned' },
  splitted:    { color: '#A142F5', label: 'Splitted' },
} as const;
