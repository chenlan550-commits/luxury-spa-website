// 預約列表組件
import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  SelectField,
  EditButton,
  ShowButton,
  DeleteButton,
  Filter,
  SearchInput,
  SelectInput,
  DateInput,
  TopToolbar,
  ExportButton,
  BulkDeleteButton,
  BulkUpdateButton,
  useListContext,
  Chip
} from 'react-admin';
import { Box, Typography } from '@mui/material';

// 預約狀態選項
const statusChoices = [
  { id: 'pending', name: '待確認' },
  { id: 'confirmed', name: '已確認' },
  { id: 'completed', name: '已完成' },
  { id: 'cancelled', name: '已取消' },
  { id: 'no_show', name: '未出現' },
];

// 篩選器
const AppointmentFilter = (props) => (
  <Filter {...props}>
    <SearchInput placeholder="搜尋客戶姓名或電話" source="q" alwaysOn />
    <SelectInput
      label="預約狀態"
      source="status"
      choices={statusChoices}
      emptyText="所有狀態"
    />
    <DateInput label="預約日期" source="appointmentDate" />
    <SelectInput
      label="療程類型"
      source="serviceCategory"
      choices={[
        { id: 'bodyspa', name: '身體療程' },
        { id: 'facialspa', name: '臉部護理' },
        { id: 'minispa', name: '迷你療程' },
        { id: 'pregnancyspa', name: '孕婦專護' },
      ]}
      emptyText="所有療程"
    />
  </Filter>
);

// 自定義狀態字段
const StatusField = ({ record }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'no_show': return 'default';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    const choice = statusChoices.find(c => c.id === status);
    return choice ? choice.name : status;
  };

  return (
    <Chip
      label={getStatusLabel(record.status)}
      color={getStatusColor(record.status)}
      size="small"
    />
  );
};

// 自定義價格字段
const PriceField = ({ record }) => (
  <Typography variant="body2" color="primary" fontWeight="bold">
    NT${record.servicePrice?.toLocaleString() || 0}
  </Typography>
);

// 自定義工具欄
const AppointmentListActions = () => (
  <TopToolbar>
    <ExportButton />
  </TopToolbar>
);

// 批量操作按鈕
const AppointmentBulkActionButtons = () => (
  <>
    <BulkUpdateButton
      label="批量確認"
      data={{ status: 'confirmed' }}
      mutationMode="pessimistic"
    />
    <BulkUpdateButton
      label="批量完成"
      data={{ status: 'completed' }}
      mutationMode="pessimistic"
    />
    <BulkDeleteButton />
  </>
);

// 空狀態組件
const Empty = () => (
  <Box textAlign="center" m={1}>
    <Typography variant="h4" paragraph>
      暫無預約記錄
    </Typography>
    <Typography variant="body1">
      客戶預約後，記錄將會顯示在這裡
    </Typography>
  </Box>
);

export const AppointmentList = (props) => (
  <List
    {...props}
    filters={<AppointmentFilter />}
    actions={<AppointmentListActions />}
    empty={<Empty />}
    perPage={25}
    sort={{ field: 'createdAt', order: 'DESC' }}
  >
    <Datagrid
      bulkActionButtons={<AppointmentBulkActionButtons />}
      rowClick="show"
    >
      <TextField source="customerName" label="客戶姓名" />
      <TextField source="customerPhone" label="聯絡電話" />
      <TextField source="serviceName" label="療程名稱" />
      <PriceField source="servicePrice" label="療程價格" />
      <TextField source="appointmentDate" label="預約日期" />
      <TextField source="appointmentTime" label="預約時間" />
      <StatusField source="status" label="狀態" />
      <DateField 
        source="createdAt" 
        label="預約時間" 
        showTime 
        options={{
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }}
      />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

