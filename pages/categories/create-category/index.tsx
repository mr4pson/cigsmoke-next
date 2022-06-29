import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useState } from "react"
import styles from "./createCategory.module.scss"
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { createNewCategory, disableError } from '../../../redux/slicers/categoriesSlicer'
import { Select } from 'antd';
import { useErrorNotidication } from '../useErrorNotification';

const { Option } = Select;

type RequiredMark = boolean | 'optional';

const EditCategory = () => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [parent, setParent] = useState('')

  const [form] = Form.useForm();
  const history = useRouter()

  const dispatch = useAppDispatch()
  const categories = useAppSelector(state => state.categories.categoriesList)
  const postError = useAppSelector(state => state.categories.error)

  const errorEffect = useErrorNotidication()

  errorEffect()

  // const openNotification = () => {
  //   const args = {
  //       message: 'Ошибка сервера',
  //       description: postError,
  //       duration: 5,
  //       icon: <ExclamationOutlined className={styles.exclamationIcon}/>,
  //       onClose: () => {
  //         console.log('Closed')
  //         dispatch(disableError())
  //       }
  //   };
  //     notification.open(args);
  // }

  // useEffect(() => {
  //   console.log(postError)
  //   postError && openNotification()
  // }, [postError])

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
    history.push('/categories')
  }

  const handleConfirmNewCategory = () => {
    dispatch(createNewCategory({
      name,
      url,
      parent
    }))
    setName('')
    setUrl('')
    setParent('')
  }

  return (
    <>
      <div className={styles.createCategoryHeader}>
        <h1 className={styles.createCategoryHeader__title}>Создание новой категории</h1>
      </div>
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
        disabled={!name || !url}
        >Подтвердить</Button>
        <Button 
        type="primary"
        onClick={handleCanselButton}
        >Вернуться назад</Button>
      </Form.Item>
    </Form>
    </>
  );
}

export default EditCategory