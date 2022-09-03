import {
  changeShowOnMain,
  deleteReview,
  fetchReviews,
} from 'redux/slicers/reviewsSlicer';
import { AppDispatch } from 'redux/store';

import { Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Review } from 'swagger/services';
import ActionButtons from '../generalComponents/ActionButtons';

const handleDeleteReview =
  (id: string, dispatch: AppDispatch, setVisible: any, offset: number) =>
  async () => {
    const isSaved: any = await dispatch(deleteReview(id));
    if (!isSaved.error) {
      dispatch(
        fetchReviews({
          offset: String(offset),
          limit: '20',
        }),
      );
      setVisible((prev) => !prev);
    }
  };

const handleShowOnMainChange =
  (review: Review, dispatch: AppDispatch) => (showOnMain: boolean) => {
    dispatch(changeShowOnMain({ review, showOnMain }));
  };

const getColumns = (dispatch: AppDispatch): ColumnsType<Review> => {
  return [
    {
      title: 'Id',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Рейтинг',
      dataIndex: 'rating',
      width: '10%',
    },
    {
      title: 'Комментарий',
      dataIndex: 'text',
      width: '30%',
    },
    {
      title: 'Продукт',
      dataIndex: 'product',
      width: '25%',
    },
    {
      title: 'Показать на главной',
      dataIndex: 'showOnMain',
      width: '25%',
      render: (_, record) => {
        return (
          <>
            <Switch
              defaultChecked={record.showOnMain}
              onChange={handleShowOnMainChange(record, dispatch)}
            />
          </>
        );
      },
    },
    {
      title: 'Почта пользователя',
      dataIndex: 'email',
      width: '15%',
      render: (_, record) => {
        return (
          <>
            {record.user?.firstName} {record.user?.lastName}
          </>
        );
      },
    },
    {
      title: 'Действия',
      render: (_, record) => {
        return (
          <ActionButtons
            id={record.id as string}
            handleDelete={handleDeleteReview}
            option={'reviews'}
            title="комментарий"
          />
        );
      },
      width: '10%',
    },
  ];
};

export { getColumns, handleDeleteReview, handleShowOnMainChange };
