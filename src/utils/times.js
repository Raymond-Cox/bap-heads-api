export const CRONS = {
  // "At minute 0 past every hour."
  // https://crontab.guru/#0_*/1_*_*_*
  hourly: '0 */1 * * *',
  // every 5th minute
  // https://crontab.guru/#*/5_*_*_*_*
  fiveMinutes: '*/5 * * * *',
}
