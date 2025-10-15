// 預約編輯組件
import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  DateInput,
  TimeInput,
  NumberInput,
  required,
  Toolbar,
  SaveButton,
  DeleteButton,
  useRecordContext
} from 'react-admin';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

// 預約狀態選項
const statusChoices = [
  { id: 'pending', name: '待確認' },
  { id: 'confirmed', name: '已確認' },
  { id: 'completed', name: '已完成' },
  { id: 'cancelled', name: '已取消' },
  { id: 'no_show', name: '未出現' },
];

// 療程分類選項
const serviceCategoryChoices = [
  { id: 'bodyspa', name: '身體療程' },
  { id: 'facialspa', name: '臉部護理' },
  { id: 'minispa', name: '迷你療程' },
  { id: 'pregnancyspa', name: '孕婦專護' },
];

// 時間選項
const timeChoices = [
  { id: '09:00', name: '09:00' },
  { id: '10:00', name: '10:00' },
  { id: '11:00', name: '11:00' },
  { id: '12:00', name: '12:00' },
  { id: '13:00', name: '13:00' },
  { id: '14:00', name: '14:00' },
  { id: '15:00', name: '15:00' },
  { id: '16:00', name: '16:00' },
  { id: '17:00', name: '17:00' },
  { id: '18:00', name: '18:00' },
  { id: '19:00', name: '19:00' },
  { id: '20:00', name: '20:00' },
];

// 自定義工具欄
const AppointmentEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
    <DeleteButton mutationMode="pessimistic" />
  </Toolbar>
);

// 預約資訊展示組件
const AppointmentInfo = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          預約資訊概覽
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              預約編號
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {record.id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              建立時間
            </Typography>
            <Typography variant="body1">
              {record.createdAt ? new Date(record.createdAt).toLocaleString('zh-TW') : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              最後更新
            </Typography>
            <Typography variant="body1">
              {record.updatedAt ? new Date(record.updatedAt).toLocaleString('zh-TW') : '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              療程時長
            </Typography>
            <Typography variant="body1">
              {record.duration || '-'} 分鐘
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const AppointmentEdit = (props) => (
  <Edit {...props} title="編輯預約">
    <SimpleForm toolbar={<AppointmentEditToolbar />}>
      <AppointmentInfo />
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        客戶資訊
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <TextInput 
          source="customerName" 
          label="客戶姓名" 
          validate={required()}
          sx={{ flex: 1 }}
        />
        <TextInput 
          source="customerPhone" 
          label="聯絡電話" 
          validate={required()}
          sx={{ flex: 1 }}
        />
      </Box>
      <TextInput 
        source="customerEmail" 
        label="電子郵件" 
        type="email"
        fullWidth
      />
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        療程資訊
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <SelectInput
          source="serviceCategory"
          label="療程分類"
          choices={serviceCategoryChoices}
          validate={required()}
          sx={{ flex: 1 }}
        />
        <TextInput 
          source="serviceName" 
          label="療程名稱" 
          validate={required()}
          sx={{ flex: 1 }}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <NumberInput 
          source="servicePrice" 
          label="療程價格" 
          validate={required()}
          sx={{ flex: 1 }}
        />
        <NumberInput 
          source="duration" 
          label="療程時長(分鐘)" 
          sx={{ flex: 1 }}
        />
      </Box>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        預約時間
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <DateInput 
          source="appointmentDate" 
          label="預約日期" 
          validate={required()}
          sx={{ flex: 1 }}
        />
        <SelectInput
          source="appointmentTime"
          label="預約時間"
          choices={timeChoices}
          validate={required()}
          sx={{ flex: 1 }}
        />
      </Box>
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        預約狀態
      </Typography>
      <SelectInput
        source="status"
        label="預約狀態"
        choices={statusChoices}
        validate={required()}
      />
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        備註資訊
      </Typography>
      <TextInput 
        source="notes" 
        label="客戶備註" 
        multiline 
        rows={3}
        fullWidth
      />
      <TextInput 
        source="adminNotes" 
        label="內部備註" 
        multiline 
        rows={3}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

