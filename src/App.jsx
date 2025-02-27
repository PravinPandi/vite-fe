import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import { useSelector } from 'react-redux';

const { Content } = Layout;

const App = () => {
  const { token } = useSelector((state) => state.auth); // Get authentication status from Redux store

  return (
    <Router>
      <Layout>
        {token && <Navbar />} {/* Show Navbar only if authenticated */}
        <Content style={{ padding: '24px' }}>
          <Routes>
            {/* Public Routes (accessible only if not authenticated) */}
            {!token && (
              <>
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
              </>
            )}

            {/* Private Routes (accessible only if authenticated) */}
            {token && (
              <>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/analytics' element={<Analytics />} />
              </>
            )}

            {/* Redirect to SignIn if not authenticated, or Dashboard if authenticated */}
            <Route
              path='/'
              element={
                token ? <Navigate to='/dashboard' /> : <Navigate to='/signin' />
              }
            />

            {/* Catch-all route for invalid paths */}
            <Route
              path='*'
              element={
                token ? <Navigate to='/dashboard' /> : <Navigate to='/signin' />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
