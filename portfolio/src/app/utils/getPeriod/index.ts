const getPeriod = (startDate: Date, endDate: Date | null, presentLabel: string): string => {
  const startYear = startDate.getFullYear();
  const endYear = endDate ? endDate.getFullYear() : presentLabel;

  return `${startYear} — ${endYear}`;
};

export { getPeriod };
