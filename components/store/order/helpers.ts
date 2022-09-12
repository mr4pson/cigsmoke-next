const timeCheck = (orderDate: any) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const currentDate = new Date().getTime();
  const dateOnDB = new Date(orderDate).getTime() + oneDay;
  return currentDate >= dateOnDB;
};
<<<<<<< HEAD
const getFormatedDate = (date:any) => {
=======
const getFormatedDate = (date: any) => {
>>>>>>> a3b870ac267315925a1e7a45966114e5a6529ddf
  const months = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря',
  };

  let deliveryDueIntial = new Date(date);
  deliveryDueIntial.setDate(deliveryDueIntial.getDate() + 5);

<<<<<<< HEAD
  return `${deliveryDueIntial.getDate()} ${months[deliveryDueIntial.getMonth() + 1]
    }`;
=======
  return `${deliveryDueIntial.getDate()} ${
    months[deliveryDueIntial.getMonth() + 1]
  }`;
>>>>>>> a3b870ac267315925a1e7a45966114e5a6529ddf
};
export { timeCheck, getFormatedDate };
