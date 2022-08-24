import { Form, Input, Select, Switch } from 'antd';
import { Color, Image } from 'swagger/services';
import { ManageProductFields } from './ManageProductsFields.enum';
import styles from './products.module.scss';
import CloseSVG from '../../../assets/close_black.svg';
import MultipleImageUpload from '../generalComponents/MultipleImageUpload';

const { Option } = Select;

type Props = {
  colors: Color[];
  index: number;
  setVariants: any;
  imagesList: Image[];
};
const ProductVariant: React.FC<Props> = ({
  colors,
  index,
  setVariants,
  imagesList,
}) => {
  const handleRemove = (index) => () => {
    setVariants((prev) => {
      const array = [...prev];
      array.splice(index, 1);

      return array;
    });
  };

  return (
    <div className={styles['product-variant']}>
      <h2 className={styles['product-variant__title']}>Вариант №{index + 1}</h2>
      <button
        type={'button'}
        className={styles['product-variant__remove']}
        onClick={handleRemove(index)}
      >
        <CloseSVG />
      </button>
      <Form.Item name={`id[${index}]`} hidden>
        <Input required={true} />
      </Form.Item>
      {/* ----------------------PRICE---------------------- */}
      <Form.Item name={`${ManageProductFields.Price}[${index}]`} required>
        <Input
          required={true}
          type={'number'}
          placeholder="Введите стоимость продукта"
        />
      </Form.Item>
      {/* ----------------------OLD PRICE---------------------- */}
      <Form.Item name={`${ManageProductFields.OldPrice}[${index}]`} required>
        <Input
          type={'number'}
          placeholder="Введите устаревшую стоимость продукта"
        />
      </Form.Item>
      {/* ----------------------AVAILABLE---------------------- */}
      <Form.Item
        label="Доступность"
        name={`${ManageProductFields.Available}[${index}]`}
        valuePropName="checked"
        required
      >
        <Switch />
      </Form.Item>
      {/* ----------------------COLORS---------------------- */}
      <Form.Item
        label="Цвет"
        name={`${ManageProductFields.Color}[${index}]`}
        required
      >
        <Select
          allowClear
          style={{ width: '100%' }}
          placeholder={`Пожалуйста, выберите цвета`}
        >
          {colors?.map((item) => (
            <Option key={item.id} value={item.id}>{`${item.name}`}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name={`${ManageProductFields.Images}[${index}]`} required>
        <MultipleImageUpload
          fileList={imagesList}
          isProduct={true}
          index={index}
        />
      </Form.Item>
    </div>
  );
};

export default ProductVariant;
