import React, { useState } from 'react';
import { Button, Form, Input, Card, Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/slices/authSlice';
import api from '../api/api';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/signin', values);
      dispatch(setCredentials(response.data));
      Modal.success({
        title: 'Sign in successful!',
      });
    } catch (error) {
      Modal.error({
        title: 'Sign in failed!',
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
        title='Sign In'
        style={{ width: 300, border: '2px solid #000', textAlign: 'center' }}
      >
        <Avatar
          size={64}
          icon={<UserOutlined />}
          style={{ marginBottom: 16, marginLeft: 'auto', marginRight: 'auto' }}
        />
        <Form onFinish={onFinish}>
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
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <Link to='/signup'>Don't have an account? Sign Up</Link>
      </Card>
    </div>
  );
};

export default SignIn;
