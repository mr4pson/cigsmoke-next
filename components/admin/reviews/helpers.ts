import { deleteReview, fetchReviews } from 'redux/slicers/reviewsSlicer';
import { AppDispatch } from 'redux/store';

export const handleDeleteReview = (id: string, dispatch: AppDispatch, setVisible: any, offset: number) => async () => {
  const isSaved: any = await dispatch(deleteReview(id));
  if (!isSaved.error) {
    dispatch(fetchReviews({
                offset: String(offset),
                limit: '20',
              }));
    setVisible(prev => !prev);
  }
};