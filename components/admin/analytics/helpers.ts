import { AnalyticsBrand, AnalyticsCategory, AnalyticsProduct, DynamicData } from "common/interfaces/data-analytics.interfaces";
import { fetchDynamicAnalytics } from "redux/slicers/analyticsSlicer";

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

export const handleGetDate = (step: string, isDateFrom?: boolean): string => {
  let today: Date | string = new Date()
  let reducer = 0;

  if(isDateFrom && step === "month") {
    reducer = 1
  } else if(isDateFrom && step === "day") {
    reducer = -1
  }

  const yyyyNow = today.getFullYear() - (step === "day" ? 0 : reducer)
  const mmNow = String(today.getMonth() + 1 + reducer).padStart(2, '0')
  const ddNow = String(today.getDate()).padStart(2, '0')

  today = `${yyyyNow}-${mmNow}-${ddNow}`

  return today
}

const handleDateFormatter = (date: Date): string => {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')

  return `${yyyy}-${mm}-${dd}`
}

export const handleChangeDate = (event, setDateFrom, setDateTo): void => {
if(event) {
  console.log(event)
  let dateFrom = handleDateFormatter(event[0]._d) 
  let dateTo = handleDateFormatter(event[1]._d) 

  setDateFrom(dateFrom)
  setDateTo(dateTo)
}
  
}

export const handleDataFormatter = (data: DynamicData[]): DynamicData[] => {
  if(data) {
      const formattedData = data?.map(i => {
      const dateArr: string[] = i?.date?.split('T')[0].split('-')
      const newDateArr: string[] = []
      for(let i = dateArr?.length - 1; i >= 0; i--) {
        newDateArr.push(dateArr[i])
      }
      const date = newDateArr?.join('.') + " г."
      return {...i, date}
    })
      return formattedData
  }
  return []
}

export const handleDataSorter = (data: DynamicData[]): DynamicData[] => {
  if(data) {
    const sortedData = data?.sort((a, b) => a.amount - b.amount)
    const reducedData = sortedData?.slice(0, 10)
    return reducedData
  }
  return []
}

export const handleDynamicAnalyticsDispatch = (dispatch, dateFrom, dateTo, step) => {
  dispatch(
    fetchDynamicAnalytics({
      from: dateFrom,
      to: dateTo,
      step: step,
    }),
  );
}
