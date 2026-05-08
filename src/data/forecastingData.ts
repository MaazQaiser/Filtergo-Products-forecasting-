export type FilterSku = '20x20x02' | '14x12x12' | '16x25x01' | '20x25x02';

export interface JobForecast {
  jobLabel: string;
  filters: Record<FilterSku, number>;
}

export interface DayForecast {
  /** ISO date string, e.g. "2026-01-19" */
  date: string;
  dayLabel: string;
  jobs: JobForecast[];
}

export interface FlatRow {
  product: FilterSku;
  qty: number;
  job: string;
  dayLabel: string;
  date: string;
}

export const FILTER_SKUS: FilterSku[] = ['20x20x02', '14x12x12', '16x25x01', '20x25x02'];

export const ALL_DAYS: DayForecast[] = [
  { date: '2026-01-19', dayLabel: 'SUN Jan 19', jobs: [] },
  {
    date: '2026-01-20', dayLabel: 'MON Jan 20',
    jobs: [
      { jobLabel: '9:30a – 10:30a · Hazel Grace', filters: { '20x20x02': 2, '14x12x12': 1, '16x25x01': 1, '20x25x02': 0 } },
    ],
  },
  {
    date: '2026-01-21', dayLabel: 'TUE Jan 21',
    jobs: [
      { jobLabel: '9:30a – 10:30a · Hazel Grace', filters: { '20x20x02': 2, '14x12x12': 1, '16x25x01': 0, '20x25x02': 1 } },
    ],
  },
  {
    date: '2026-01-22', dayLabel: 'WED Jan 22',
    jobs: [
      { jobLabel: '9:30a – 10:30a · Hazel Grace', filters: { '20x20x02': 3, '14x12x12': 2, '16x25x01': 1, '20x25x02': 1 } },
      { jobLabel: '1:00p – 3:00p · Marcus Lee',   filters: { '20x20x02': 1, '14x12x12': 2, '16x25x01': 1, '20x25x02': 1 } },
    ],
  },
  { date: '2026-01-23', dayLabel: 'THU Jan 23', jobs: [] },
  {
    date: '2026-01-24', dayLabel: 'FRI Jan 24',
    jobs: [
      { jobLabel: '8:00a – 9:00a · Jordan Kim',   filters: { '20x20x02': 1, '14x12x12': 0, '16x25x01': 1, '20x25x02': 0 } },
    ],
  },
  {
    date: '2026-01-25', dayLabel: 'SAT Jan 25',
    jobs: [
      { jobLabel: '9:30a – 10:30a · Hazel Grace', filters: { '20x20x02': 2, '14x12x12': 1, '16x25x01': 1, '20x25x02': 1 } },
    ],
  },
];

/** Flatten ALL_DAYS into rows filtered by an inclusive date range */
export function getFlatRows(from: string, to: string): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const day of ALL_DAYS) {
    if (day.date < from || day.date > to) continue;
    for (const job of day.jobs) {
      for (const sku of FILTER_SKUS) {
        const qty = job.filters[sku] ?? 0;
        if (qty > 0) {
          rows.push({ product: sku, qty, job: job.jobLabel, dayLabel: day.dayLabel, date: day.date });
        }
      }
    }
  }
  return rows;
}
