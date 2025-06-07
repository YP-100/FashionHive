import React, { useEffect } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalesData } from '../../state/Sales/Action';
import { getAllUsers } from '../../state/Admin/Users/Action';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const DailyOverview = () => {
    const dispatch = useDispatch();
    const { overall = [], loading } = useSelector((store) => store.sales);
    
    useEffect(() => {
        dispatch(fetchSalesData());
    }, [dispatch]);

        const allusers = useSelector((store) => store.allusers);
    
        
      useEffect(() => {
        dispatch(getAllUsers());
      }, [dispatch]);

    const salesData = [
        {
            stats: overall?.display?.totalSales || "0",
            title: "Sales",
            color: "#4e73df",
            icon: <TrendingUpIcon sx={{ fontSize: "1.75rem" }} />
        },
        {
            stats: overall?.display?.totalItemsSold || "0",
            title: "Products Sold",
            color: "#f6c23e",
            icon: <ShoppingBasketIcon sx={{ fontSize: "1.75rem" }} />
        },
        {
            stats: allusers?.users?.length || "0",
            title: "Total Users",
            color: "#008000",
            icon: <AccountBoxIcon sx={{ fontSize: "1.75rem" }} />
        },
    ];

    const renderStats = () => {
        return salesData.map((item, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Avatar variant='rounded' sx={{
                        backgroundColor: `${item.color}`,
                        mr: 3,
                        width: 44,
                        height: 44,
                        boxShadow: 3,
                        color: "common.white"
                    }}>{item.icon}</Avatar>

                    <Box sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Typography variant="caption">
                            {item.title}
                        </Typography>
                        <Typography variant="h6">
                            {item.stats}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        ));
    };

    if (loading) return <div>Loading sales data...</div>;

    return (
        <Card sx={{ bgcolor: "#f5f2f2" }}>
            <CardHeader 
                title="Overview"
                action={
                    <IconButton size='small'>
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        lineHeight: "2rem !important",
                        letterSpacing: "0.15px !important"
                    }
                }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
                <Grid container spacing={5}>
                    {renderStats()}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DailyOverview;