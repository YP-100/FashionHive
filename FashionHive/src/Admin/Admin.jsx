
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ForumIcon from '@mui/icons-material/Forum';
import CreateProductForm from './components/CreateProductForm';
import ProductsTable from './components/ProductsTable';
import OrdersTable from './components/OrdersTable';
import CustomersTable from './components/CustomersTable';
import AdminDashboard from './components/AdminDashboard';
import AllFeedbacks from './components/AllFeedbacks';

const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <InventoryIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <PeopleAltIcon /> },
    { name: "Orders", path: "/admin/orders", icon: <ShoppingCartCheckoutIcon /> },
    { name: "AddProduct", path: "/admin/product/create", icon: <AddToPhotosIcon /> },
]

const Admin = () => {

    const theme = useTheme()
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [sideBarVisible, setSideBarVisible] = useState(false);
    const navigaate = useNavigate()

    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "100vh"
            }}
        >
            
                {/* {isLargeScreen && <Toolbar/>} */}
                <List>
                    {menu.map((item) => <ListItem key={item.name}>
                        <ListItemButton onClick={() => navigaate(item.path)}> {/*isnide can put disablepadding={true.toString()} */}
                            <ListItemIcon> 
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>
                                {item.name}
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>)}
                </List>

            <List>
                <ListItem>
                    <ListItemButton onClick={() => navigaate("/admin/feedbacks")}>
                        <ListItemIcon>
                            <ForumIcon />

                        </ListItemIcon>
                        <ListItemText>
                            Website FeedBacks
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>

        </Box>
    )



    return (

            <div className=' relative flex h-[100vh] '>
                < CssBaseline />
                <div className=' w-[15%] border border-r-gray-300 h-full fixed top-0'
                >
                    {drawer}
                </div>

                <div className='w-[85%] h-full ml-[15%]'>
                    <Routes>
                        <Route path="/" element={<AdminDashboard />}></Route>
                        <Route path="/product/create" element={<CreateProductForm />}></Route>
                        <Route path="/products" element={<ProductsTable />}></Route>
                        <Route path="/orders" element={<OrdersTable />}></Route>
                        <Route path="/customers" element={<CustomersTable />}></Route>
                        <Route path="/feedbacks" element={<AllFeedbacks/>}></Route>
                    </Routes>
                </div>
            </div>

    )
}

export default Admin