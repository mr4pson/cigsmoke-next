import { deleteCheckout, fetchCheckouts } from 'redux/slicers/checkoutsSlicer';
import { AppDispatch } from 'redux/store';
import { Page, paths } from 'routes/constants';
import { NextRouter } from 'next/router';
<<<<<<< HEAD

 const handleDeleteCheckout = (id: string, dispatch: AppDispatch, setVisible: any, offset: number) => async () => {
  const isSaved: any = await dispatch(deleteCheckout(id));
  if (!isSaved.error) {
    dispatch(fetchCheckouts({
        offset: String(offset),
        limit: '20'
      }));
    setVisible(prev => !prev);
  }
};



=======
const handleDeleteCheckout =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteCheckout(id));
    if (!isSaved.error) {
      dispatch(
        fetchCheckouts({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

>>>>>>> a3b870ac267315925a1e7a45966114e5a6529ddf
const handleRedirectCheckout = (id: string, router: NextRouter) => () => {
  router.push(`${paths[Page.ADMIN_CHECKOUTS]}/${id}`);
};

const getFormatedDate = (date: any) => {
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

  return `${deliveryDueIntial.getDate()} ${
    months[deliveryDueIntial.getMonth() + 1]
  }`;
};

export { handleRedirectCheckout, handleDeleteCheckout, getFormatedDate };
