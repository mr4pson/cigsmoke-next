import { Button, Form, Input, Select, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import styles from './categories.module.scss';
import { InfoCircleOutlined } from '@ant-design/icons';
import { 
    handleNameChange, 
    handleUrlChange, 
    handleParentChange, 
    handleCanselButton, 
} from "../../common/helpers"
import { useRouter } from "next/router";
import { checkIfSaveButtonDisabled } from "common/helpers/checkIfSaveButtonDisabled.helper";

const { Option } = Select;

type Props = {
    title: string, 
    handleConfirm: any
}

const ManageCategoriesLayouts = ({
    title, 
    handleConfirm
}: Props) => {

    const dispatch = useAppDispatch()
    const chosenCategory = useAppSelector(state => state.chosenCategory.category)
    const categories = useAppSelector(state => state.categories.categoriesList)
    const isLoading = useAppSelector(state => state.categories.loading)
    const isSaveLoading = useAppSelector(state => state.categories.saveLoading)

    const router = useRouter()

    const [form] = Form.useForm();

    return (
    <>
      <div className={styles.createCategoryHeader}>
        <h1 className={styles.createCategoryHeader__title}>{title}</h1>
      </div>
      {isLoading ? <Spin className="spinner" size="large" /> :
      <Form
        form={form}
        layout="vertical"
        initialValues={{ requiredMarkValue: "opt" }}
        requiredMark={true}
        className={styles.createCategoryForm}
      >
        <Form.Item 
        label="Имя" 
        required={!chosenCategory?.name}
        tooltip="Введите имя"
        >
          <Input
          value={chosenCategory?.name}
          onChange={(event) => handleNameChange(event, dispatch)}
          placeholder="Введите имя" 
          />
        </Form.Item>
        <Form.Item
          label="URL"
          required={!chosenCategory?.url}
          tooltip={{ title: "Введите URL", icon: <InfoCircleOutlined /> }}
        >
          <Input
          value={chosenCategory?.url} 
          onChange={(event) => handleUrlChange(event, dispatch)}
          placeholder="Введите URL" 
          />
        </Form.Item>
        <Form.Item
          label="Выберите родительскую категорию"
          tooltip={{ title: 'Выберите родительскую категорию из списка существующих', icon: <InfoCircleOutlined /> }}
        >

          <Select 
          value={chosenCategory?.parent.id}
          defaultValue="Не выбрано" 
          onChange={(event) => handleParentChange(event, dispatch)}
          >
            <Option value="">Не выбрано</Option>
            {categories?.map(category => <Option key={category.id} value={`${category.id}`}>ID: {category.id}, имя: {category.name}</Option>)}
          </Select>

        </Form.Item>
        <Form.Item className={styles.createCategoryForm__buttonsStack}>
          <Button 
          type="primary" 
          className={styles.createCategoryForm__buttonsStack__submitButton}
          onClick={() => handleConfirm(router, dispatch, chosenCategory)}
          disabled={checkIfSaveButtonDisabled(chosenCategory?.name, chosenCategory?.url)}
          loading={isSaveLoading}
          >Создать</Button>
          <Button 
          type="primary"
          onClick={() => handleCanselButton(router)}
          >Вернуться назад</Button>
        </Form.Item>
      </Form>}
    </>
  );
}

export default ManageCategoriesLayouts