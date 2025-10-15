// 預約詳情顯示組件
import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  RichTextField,
  EditButton,
  DeleteButton,
  TopToolbar,
  useRecordContext
} from 'react-admin';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  Divider,
  Paper
} from '@mui/material';
import {
  Person as PersonIcon,
  Event as EventIcon,
  Spa as SpaIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Notes as NotesIcon
} from '@mui/icons-material';

// 自定義狀態顯示
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
    switch (status) {
      case 'pending': return '待確認';
      case 'confirmed': return '已確認';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      case 'no_show': return '未出現';
      default: return status;
    }
  };

  return (
    <Chip
      label={getStatusLabel(record.status)}
      color={getStatusColor(record.status)}
      size="medium"
      sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}
    />
  );
};

// 自定義工具欄
const AppointmentShowActions = () => (
  <TopToolbar>
    <EditButton />
    <DeleteButton />
  </TopToolbar>
);

// 客戶資訊卡片
const CustomerInfoCard = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">客戶資訊</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              客戶姓名
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {record.customerName || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              聯絡電話
            </Typography>
            <Typography variant="h6">
              {record.customerPhone || '-'}
            </Typography>
          </Grid>
          {record.customerEmail && (
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                電子郵件
              </Typography>
              <Typography variant="body1">
                {record.customerEmail}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

// 療程資訊卡片
const ServiceInfoCard = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'bodyspa': return '身體療程';
      case 'facialspa': return '臉部護理';
      case 'minispa': return '迷你療程';
      case 'pregnancyspa': return '孕婦專護';
      default: return category;
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SpaIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">療程資訊</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              療程分類
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {getCategoryLabel(record.serviceCategory)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              療程名稱
            </Typography>
            <Typography variant="h6">
              {record.serviceName || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MoneyIcon sx={{ mr: 1, color: 'success.main' }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  療程價格
                </Typography>
                <Typography variant="h6" color="success.main" fontWeight="bold">
                  NT${record.servicePrice?.toLocaleString() || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ScheduleIcon sx={{ mr: 1, color: 'info.main' }} />
              <Box>
                <Typography variant="body2" color="textSecondary">
                  療程時長
                </Typography>
                <Typography variant="h6">
                  {record.duration || '-'} 分鐘
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// 預約時間卡片
const AppointmentTimeCard = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">預約時間</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              預約日期
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {record.appointmentDate || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              預約時間
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {record.appointmentTime || '-'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              預約狀態
            </Typography>
            <Box sx={{ mt: 1 }}>
              <StatusField record={record} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// 備註資訊卡片
const NotesCard = () => {
  const record = useRecordContext();
  
  if (!record || (!record.notes && !record.adminNotes)) return null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <NotesIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6">備註資訊</Typography>
        </Box>
        {record.notes && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              客戶備註
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body1">
                {record.notes}
              </Typography>
            </Paper>
          </Box>
        )}
        {record.adminNotes && (
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              內部備註
            </Typography>
            <Paper sx={{ p: 2, bgcolor: 'warning.50' }}>
              <Typography variant="body1">
                {record.adminNotes}
              </Typography>
            </Paper>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// 系統資訊卡片
const SystemInfoCard = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          系統資訊
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              預約編號
            </Typography>
            <Typography variant="body1" fontFamily="monospace">
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export const AppointmentShow = (props) => (
  <Show {...props} actions={<AppointmentShowActions />} title="預約詳情">
    <SimpleShowLayout>
      <CustomerInfoCard />
      <ServiceInfoCard />
      <AppointmentTimeCard />
      <NotesCard />
      <SystemInfoCard />
    </SimpleShowLayout>
  </Show>
);

