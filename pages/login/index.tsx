import React from 'react';
import styles from './login.module.scss';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className={styles['login-form']}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h1 className={styles['login-form__title']}>Авторизация</h1>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите логин!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className={styles['site-form__item-icon']} />}
          type="email"
          placeholder="Логин"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className={styles['site-form__item-icon']} />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <a className={styles['login-form__forgot']} href="">
          Забыли пароль
        </a>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles['login-form__button']}
        >
          Войти
        </Button>
        Или <a href="">Зарегистрироваться!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
