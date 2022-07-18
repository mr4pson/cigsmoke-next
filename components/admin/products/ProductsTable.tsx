import { Table } from 'antd';
import { columns } from './constants';
// import { handleTableChange } from './helpers';
import { DataType } from 'common/interfaces/data-type.interface';
import { Product } from 'swagger/services';
import { handleTableChange } from './helpers';
import { ColumnsType } from 'antd/lib/table';

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
      tags,
      url,
      ...rest
    }) => ({
      key: id,
      id,
      name,
      price,
      desc,
      available,
      colors,
      category: `id: ${category?.id}, имя: ${category?.name}`,
      images: (images as string)?.split(','),
      brand: `id: ${brand?.id}, имя: ${brand?.name}`,
      tags,
      url,
    }),
  ) as unknown as DataType[];

  return (
    <>
      <Table
        columns={columns as ColumnsType<DataType>}
        dataSource={dataSource}
        onChange={handleTableChange}
      />
    </>
  );
};

export default ProductsTable;
