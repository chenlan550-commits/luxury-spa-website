// 管理後台儀表板
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  LinearProgress
} from '@mui/material';
import {
  Event as EventIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useDataProvider } from 'react-admin';

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    totalCustomers: 0,
    recentAppointments: [],
    loading: true
  });

  const dataProvider = useDataProvider();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }));

      // 獲取所有預約
      const appointmentsResult = await dataProvider.getList('appointments', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'createdAt', order: 'DESC' },
        filter: {}
      });

      const appointments = appointmentsResult.data;

      // 獲取所有客戶
      const customersResult = await dataProvider.getList('customers', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'createdAt', order: 'DESC' },
        filter: {}
      });

      const customers = customersResult.data;

      // 計算統計數據
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointments.filter(apt => apt.appointmentDate === today);
      const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
      const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');
      const completedAppointments = appointments.filter(apt => apt.status === 'completed');

      // 獲取最近的預約（前10個）
      const recentAppointments = appointments.slice(0, 10);

      setStats({
        totalAppointments: appointments.length,
        todayAppointments: todayAppointments.length,
        pendingAppointments: pendingAppointments.length,
        confirmedAppointments: confirmedAppointments.length,
        completedAppointments: completedAppointments.length,
        totalCustomers: customers.length,
        recentAppointments,
        loading: false
      });

    } catch (error) {
      console.error('載入儀表板數據失敗:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'confirmed': return 'info';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <HourglassEmptyIcon />;
      case 'confirmed': return <ScheduleIcon />;
      case 'completed': return <CheckCircleIcon />;
      case 'cancelled': return <CancelIcon />;
      default: return <EventIcon />;
    }
  };

  if (stats.loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
          載入中...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        管理後台儀表板
      </Typography>
      
      <Grid container spacing={3}>
        {/* 統計卡片 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    總預約數
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalAppointments}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    今日預約
                  </Typography>
                  <Typography variant="h4">
                    {stats.todayAppointments}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HourglassEmptyIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    待確認
                  </Typography>
                  <Typography variant="h4">
                    {stats.pendingAppointments}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    總客戶數
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalCustomers}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 預約狀態分佈 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="預約狀態分佈" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <HourglassEmptyIcon sx={{ color: 'warning.main', mr: 1 }} />
                    <Typography variant="body2">待確認</Typography>
                  </Box>
                  <Typography variant="h6">{stats.pendingAppointments}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ScheduleIcon sx={{ color: 'info.main', mr: 1 }} />
                    <Typography variant="body2">已確認</Typography>
                  </Box>
                  <Typography variant="h6">{stats.confirmedAppointments}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CheckCircleIcon sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body2">已完成</Typography>
                  </Box>
                  <Typography variant="h6">{stats.completedAppointments}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 最近預約 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="最近預約" />
            <CardContent>
              <List>
                {stats.recentAppointments.slice(0, 5).map((appointment) => (
                  <ListItem key={appointment.id} divider>
                    <ListItemIcon>
                      {getStatusIcon(appointment.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={`${appointment.customerName} - ${appointment.serviceName}`}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {appointment.appointmentDate} {appointment.appointmentTime}
                          </Typography>
                          <Chip
                            label={getStatusLabel(appointment.status)}
                            color={getStatusColor(appointment.status)}
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              {stats.recentAppointments.length === 0 && (
                <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
                  暫無預約記錄
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* 快速操作 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              快速操作
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Chip
                  icon={<EventIcon />}
                  label="查看所有預約"
                  clickable
                  color="primary"
                  onClick={() => window.location.hash = '#/appointments'}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<PeopleIcon />}
                  label="管理客戶"
                  clickable
                  color="secondary"
                  onClick={() => window.location.hash = '#/customers'}
                />
              </Grid>
              <Grid item>
                <Chip
                  icon={<HourglassEmptyIcon />}
                  label="待確認預約"
                  clickable
                  color="warning"
                  onClick={() => window.location.hash = '#/appointments?filter=%7B%22status%22%3A%22pending%22%7D'}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

