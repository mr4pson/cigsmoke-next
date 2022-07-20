import { Form } from 'antd';
import { InputField } from '../../../common/enums/inputField.enum';
import _ from 'lodash';

interface Props {
  children: any;
  option: string;
}

const FormItem = ({ children, option }: Props) => {
  return (
    <Form.Item label={InputField[_.capitalize(option)]} name={option} required>
      {children}
    </Form.Item>
  );
};

export default FormItem;
