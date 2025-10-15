// React Admin 主應用程式
import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
import { FirebaseDataProvider } from './FirebaseDataProvider';
import { FirebaseAuthProvider } from './FirebaseAuthProvider';

// 導入自定義組件
import { AppointmentList } from './components/AppointmentList';
import { AppointmentEdit } from './components/AppointmentEdit';
import { AppointmentShow } from './components/AppointmentShow';
import { CustomerList } from './components/CustomerList';
import { CustomerEdit } from './components/CustomerEdit';
import { CustomerShow } from './components/CustomerShow';
import { Dashboard } from './components/Dashboard';

// 導入圖標
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';

// 自定義主題
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f97316', // Orange-500 (與網站主色調一致)
    },
    secondary: {
      main: '#0f172a', // Slate-900
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// 數據提供者
const dataProvider = FirebaseDataProvider();

// 認證提供者
const authProvider = FirebaseAuthProvider();

const AdminApp = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    theme={theme}
    title="奢華精油SPA - 管理後台"
  >
    <Resource
      name="appointments"
      list={AppointmentList}
      edit={AppointmentEdit}
      show={AppointmentShow}
      icon={EventIcon}
      options={{ label: '預約管理' }}
    />
    <Resource
      name="customers"
      list={CustomerList}
      edit={CustomerEdit}
      show={CustomerShow}
      icon={PeopleIcon}
      options={{ label: '客戶管理' }}
    />
  </Admin>
);

export default AdminApp;

