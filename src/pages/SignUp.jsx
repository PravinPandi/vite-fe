import React, { useState } from 'react';
import { Button, Form, Input, Card, Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post('/auth/signup', values);
      Modal.success({
        title: 'Sign up successful!',
        onOk: () => navigate('/signin'),
      });
    } catch (error) {
      Modal.error({
        title: 'Sign up failed!',
        content: error?.response?.data?.message
          ? error.response.data.message
          : error,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card
        title='Sign Up'
        style={{ width: 300, border: '2px solid #000', textAlign: 'center' }}
      >
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ marginBottom: 16, marginLeft: 'auto', marginRight: 'auto' }}
        />
        <Form onFinish={onFinish}>
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input placeholder='Email' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <Link to='/signin'>Already have an account? Sign In</Link>
      </Card>
    </div>
  );
};

export default SignUp;
