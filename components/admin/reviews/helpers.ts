import { deleteReview, fetchReviews } from 'redux/slicers/reviewsSlicer';
import { AppDispatch } from 'redux/store';

export const handleDeleteReview = (id: string, dispatch: AppDispatch, setVisible: any) => async () => {
  const isSaved: any = await dispatch(deleteReview(id));
  if (!isSaved.error) {
    dispatch(fetchReviews());
    setVisible(prev => !prev);
  }
};