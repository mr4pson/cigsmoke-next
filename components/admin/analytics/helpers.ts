import { AnalyticsBrand, AnalyticsCategory, AnalyticsProduct } from "common/interfaces/data-analytics.interfaces";

export const handleData = (
    items: AnalyticsCategory[] | AnalyticsBrand[] | AnalyticsProduct[],
    valueOption: string,
    isUser: boolean,
  ): { type: string; value: number }[] => {
    return items.map((item) => {
      if (!isUser) {
        return {
          type: item.name,
          value: item[valueOption],
        };
      }
      return {
        type: `${item.firstName} ${item.lastName}`,
        value: item[valueOption],
      };
    });
  };