import type { ShiftType } from '../theme/designTokens';

export type ShiftStatus = 'confirmed' | 'pending' | 'unassigned' | 'overlap';

export interface ScheduleCard {
  id: string;
  employeeName: string;
  role: string;
  time: string;
  status: ShiftStatus;
  avatarInitials: string;
  avatarColor: string;
  shiftType: ShiftType;
}

export interface RowGroup {
  id: string;
  label: string;
  rowHeight: number;
  cards: Record<number, ScheduleCard[]>;
}

export const WEEK_DAYS = [
  { short: 'SUN', date: 19 },
  { short: 'MON', date: 20 },
  { short: 'TUE', date: 21 },
  { short: 'WED', date: 22 },
  { short: 'THU', date: 23 },
  { short: 'FRI', date: 24 },
  { short: 'SAT', date: 25 },
] as const;

const c = (
  id: string,
  name: string,
  role: string,
  time: string,
  status: ShiftStatus,
  initials: string,
  color: string,
  shiftType: ShiftType,
): ScheduleCard => ({ id, employeeName: name, role, time, status, avatarInitials: initials, avatarColor: color, shiftType });

export const ROW_GROUPS: RowGroup[] = [
  {
    id: 'patrol', label: 'Filter replacement Routes', rowHeight: 122,
    cards: {
      1: [c('p1', 'Hazel Grace', 'Orlando Day Time Runsheet', '9:30a - 10:30a', 'confirmed',  'HG', '#29964A', 'patrol')],
      2: [c('p2', 'Hazel Grace', 'Orlando Day Time Runsheet', '9:30a - 10:30a', 'confirmed',  'HG', '#29964A', 'patrol')],
      3: [c('p3', 'Hazel Grace', 'Orlando Day Time Runsheet', '9:30a - 10:30a', 'confirmed',  'HG', '#29964A', 'patrol')],
      6: [c('p6', 'Hazel Grace', 'Orlando Day Time Runsheet', '9:30a - 10:30a', 'pending',    'HG', '#29964A', 'ot')],
    },
  },
  {
    id: 'unassigned', label: 'Unassigned Location(s)', rowHeight: 100,
    cards: {
      0: [c('u1', 'Unassigned', 'Zorinski Lake · Shift 1-A', '9:30a - 11:30p', 'unassigned', '?',  '#6A6A70', 'dispatch')],
      2: [c('u2', 'Unassigned', 'Zorinski Lake · Shift 1-A', '9:30a - 11:30p', 'unassigned', '?',  '#6A6A70', 'dispatch')],
      3: [c('u3', 'Unassigned', 'Zorinski Lake · Shift 1-A', '9:30a - 11:30p', 'unassigned', '?',  '#6A6A70', 'dispatch')],
      6: [c('u4', 'Unassigned', 'Zorinski Lake · Shift 1-A', '9:30a - 11:30p', 'unassigned', '?',  '#6A6A70', 'dispatch')],
    },
  },
];
