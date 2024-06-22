export const CRONS = {
  // "At minute 0 past every hour."
  // https://crontab.guru/#0_*/1_*_*_*
  hourly: '0 */1 * * *',
  // “At 00:00.”
  // https://crontab.guru/#0_0_*_*_*
  daily: '0 0 * * *',
  // “At 00:05 on Sunday.”
  // https://crontab.guru/#5_0_*_*_0
  weekly: '5 0 * * 0',
}
