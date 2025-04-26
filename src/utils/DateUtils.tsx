import { DateFilter } from "@enums/index";

export const getStartAndEndDate = (filter: string) => {
  const now = new Date();
  let startDate: Date;
  let endDate: Date = now;

  switch (filter) {
    case DateFilter.LAST_7_DAYS:
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
      break;
    case DateFilter.LAST_30_DAYS:
      startDate = new Date();
      startDate.setDate(now.getDate() - 30);
      break;
    case DateFilter.THIS_MONTH:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case DateFilter.THIS_YEAR:
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date();
      break;
  }

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};
