import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Spin } from 'antd';
import { checkIfSaveButtonDisabled } from 'common/helpers/checkIfSaveButtonDisabled.helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Page, paths } from 'routes/constants';
import { createNewCategory, fetchCategories } from '../../../redux/slicers/categoriesSlicer';
import styles from './createCategory.module.scss';

const { Option } = Select;

const ManageCategory = () => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [parent, setParent] = useState('')

  const [form] = Form.useForm();
  const router = useRouter()

  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.categoriesList)
  const isLoading = useAppSelector(state => state.categories.loading)
  const isSaveLoading = useAppSelector(state => state.categories.saveLoading)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleParentChange = event => {
    console.log(event)
    setParent(event)
  }

  const handleCanselButton = () => {
    router.push(paths[Page.CATEGORIES])
  }

  const handleConfirmNewCategory = async() => {
    const isSaved: any = await dispatch(createNewCategory({
      name,
      url,
      parent
    }))
    if(!isSaved.error) {
      router.push(paths[Page.CATEGORIES])
    }
  }

  return (
    <>
      <div className={styles.createCategoryHeader}>
        <h1 className={styles.createCategoryHeader__title}>Создание новой категории</h1>
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
        required={!name}
        tooltip="Имя будет присвоено новой категории"
        >
          <Input
          value={name}
          onChange={handleNameChange}
          placeholder="Введите имя" 
          />
        </Form.Item>
        <Form.Item
          label="URL"
          required={!url}
          tooltip={{ title: 'Введите URL новой категории', icon: <InfoCircleOutlined /> }}
        >
          <Input
          value={url} 
          onChange={handleUrlChange}
          placeholder="Введите URL" 
          />
        </Form.Item>
        <Form.Item
          label="Родительская категория (не обязательно)"
          tooltip={{ title: 'Выберите родительскую категорию из списка существующих', icon: <InfoCircleOutlined /> }}
        >

          <Select 
          value={parent}
          defaultValue="Не выбрано" 
          onChange={handleParentChange}
          >
            <Option value="">Не выбрано</Option>
            {categories?.map(category => <Option key={category.id} value={`${category.id}`}>ID: {category.id}, имя: {category.name}</Option>)}
          </Select>

        </Form.Item>
        <Form.Item className={styles.createCategoryForm__buttonsStack}>
          <Button 
          type="primary" 
          className={styles.createCategoryForm__buttonsStack__submitButton}
          onClick={handleConfirmNewCategory}
          // disabled={!name || !url}
          disabled={checkIfSaveButtonDisabled(name, url)}
          loading={isSaveLoading}
          >Создать</Button>
          <Button 
          type="primary"
          onClick={handleCanselButton}
          >Вернуться назад</Button>
        </Form.Item>
      </Form>}
    </>
  );
}

export default ManageCategory