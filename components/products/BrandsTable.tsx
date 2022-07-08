import { Table } from 'antd';
import { columns } from './constants';
// import { handleTableChange } from './helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { Product } from 'swagger/services';
import { handleTableChange } from './helpers';

type Props = {
  products: Product[];
};

const ProductsTable: React.FC<Props> = ({ products }) => {
  const dataSource = products?.map(
    ({ 
      id, 
      name, 
      price,
      desc,
      available,
      colors,
      category,
      images,
      brand,
      url, 
      ...rest }) => ({
      key: id,
      id,
      name,
      price,
      desc,
      available,
      colors,
      category,
      images,
      brand,
      url,
    }),
  ) as unknown as DataType[];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={handleTableChange}
      />
    </>
  );
};

export default ProductsTable;