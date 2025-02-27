import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const items = [
    { key: 'dashboard', label: <Link to='/dashboard'>Dashboard</Link> },
    { key: 'analytics', label: <Link to='/analytics'>Analytics</Link> },
  ];

  return (
    <Menu
      theme='dark'
      mode='horizontal'
      selectedKeys={[location.pathname.split('/')[1]]}
      items={items}
    />
  );
};

export default Navbar;
