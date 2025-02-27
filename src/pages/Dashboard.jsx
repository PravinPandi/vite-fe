import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Input, message, Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/slices/userSlice';
import axios from 'axios';
import api from '../api/api';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const showModal = (user) => {
    setCurrentUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await api.patch(`/users/${currentUser.id}`, values);
      message.success('User updated successfully');
      dispatch(fetchUsers());
      setIsModalVisible(false);
      setCurrentUser(null);
    } catch (error) {
      message.error('Failed to update user');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      message.success('User deleted successfully');
      dispatch(fetchUsers());
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' }, // Added name field
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type='primary' onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Input.Search
        placeholder='Search users'
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        dataSource={users || []}
        columns={columns}
        loading={loading || false}
        rowKey='id'
      />
      <Modal
        title='Edit User'
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please input the name!' }]} // Added name field
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            rules={[{ required: true, message: 'Please input the email!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
