import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from '../../state/Admin/Orders/Action'
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const OrdersTable = () => {


  const dispatch = useDispatch()
  const adminOrder = useSelector((store) => store.adminOrder)

  useEffect(() => {
    dispatch(getOrders())
  }, [adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deletedOrder,dispatch])

  // console.log("adminOrder", adminOrder)


  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId))

  }

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmOrder(orderId))

  }

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId))

  }

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId))

  }





  return (
    <div className='p-10'>
      <Card className='mt-2'>
        < CardHeader title="Orders " />

        <TableContainer sx={{ bgcolor: "#f5f2f2" }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">status</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {item.orderItems?.map((orderItem) => (<Avatar src={orderItem.product?.imageUrl}></Avatar>))}
                    </AvatarGroup>

                  </TableCell>
                  <TableCell align="left">{item.orderItems?.map((orderItem) => <p key={orderItem._id}>{orderItem.product?.title}</p>)}</TableCell>
                  <TableCell align="left">{item._id}</TableCell>
                  <TableCell align="left">{item.totalDiscountedPrice}</TableCell>
                  <TableCell align="left"><span className={`${item.orderStatus === "CONFIRMED" ? "text-blue-500" 
                    : item.orderStatus === "SHIPPED" ? "text-yellow-500" 
                    : item.orderStatus === "DELIVERED" ? "text-green-500" 
                    : item.orderStatus === "PLACED" ? "text-orange-500"
                    : item.orderStatus === "PENDING" ? "text-gray-500" 
                    : "text-red-500"}`}>{item.orderStatus}</span></TableCell>

                  <TableCell align="left">


                    <PopupState variant="popover" popupId="demo-popup-menu">
                      {(popupState) => (
                        <React.Fragment>
                          {/* <Button variant="outlined" {...bindTrigger(popupState)}>
                            Update
                          </Button> */}
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={() => { handleConfirmedOrder(item._id); popupState.close() }}>Confirmed</MenuItem>
                            <MenuItem onClick={() => { handleShippedOrder(item._id); popupState.close() }}>Shipped</MenuItem>
                            <MenuItem onClick={() => { handleDeliveredOrder(item._id); popupState.close() }}>Delivered</MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </PopupState>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Card>
    </div>
  )
}

export default OrdersTable