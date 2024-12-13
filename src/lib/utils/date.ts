export const getCurrentWeek = (date: Date = new Date()) => {
  const baseDate = new Date("2023-12-13"); // Week 15, Wednesday
  const diffTime = Math.abs(date.getTime() - baseDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weekDiff = Math.floor(diffDays / 7);
  return 15 + weekDiff;
};

export const getWeekDay = (date: Date = new Date()) => {
  return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
};