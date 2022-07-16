import { Table } from 'antd';
import { columns } from './constants';
import { DataType } from 'common/interfaces/data-type.interface';
import { Review } from 'swagger/services';

type Props = {
  reviews: Review[];
};

const ReviewsTable: React.FC<Props> = ({ reviews }) => {
  const dataSource = reviews?.map(
    ({ id, rating, comment, productId, userId, ...rest }) => ({
      key: id,
      id,
      rating,
      comment,
      productId,
      userId,
    }),
  ) as unknown as DataType[];

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ReviewsTable;
