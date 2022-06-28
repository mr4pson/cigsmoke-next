import { TableProps } from "antd";
import { DataType } from "common/interfaces/data-type.interface";

export const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};