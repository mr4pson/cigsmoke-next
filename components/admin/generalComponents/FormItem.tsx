import { Form } from 'antd';
import { InputField } from '../../../common/enums/inputField.enum';
import _ from 'lodash';

interface Props {
  children: any;
  option: string;
  valuePropName?: string;
  initialValue?: any;
}

const FormItem = ({ children, option, valuePropName, initialValue }: Props) => {
  return (
    <Form.Item
      valuePropName={valuePropName}
      label={InputField[_.capitalize(option)]}
      name={option}
      initialValue={initialValue}
      fieldKey={option}
      required
    >
      {children}
    </Form.Item>
  );
};

export default FormItem;
