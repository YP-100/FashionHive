import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUserRole } from '../../state/Admin/Users/Action';
import { 
  Avatar, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CustomersTable = () => {
  const dispatch = useDispatch();
  const allusers = useSelector((store) => store.allusers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null); // Track which user is being updated

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (allusers.users) {
      const filtered = allusers.users.filter(user => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, allusers.users]);

  const handleRoleChange = (userId, newRole) => {
    setUpdatingUserId(userId);
    dispatch(updateUserRole({ userId, role: newRole }))
      .then(() => {
        setUpdatingUserId(null);
        dispatch(getAllUsers());
      })
      .catch(() => setUpdatingUserId(null));
  };

  return (
    <div className='p-10'>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TableContainer sx={{ bgcolor: "#f5f2f2" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Profile</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Created At</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar
                      sx={{
                        bgcolor: "#ca8a04",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      {item.firstName[0].toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell align="left">{item?.firstName + " " + item?.lastName}</TableCell>
                  <TableCell align="left">{item?.email}</TableCell>
                  <TableCell align="left">{item?.createdAt.slice(0, 10)}</TableCell>
                  <TableCell align='left'>{item?.role}</TableCell>
                  <TableCell align="left">
                    {updatingUserId === item?._id ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Select
                        value={item.role}
                        onChange={(e) => handleRoleChange(item?._id, e.target.value)}
                        size="small"
                        sx={{ minWidth: 120 }}
                      >
                        <MenuItem value="CUSTOMER">Customer</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                      </Select>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {searchTerm ? 'No matching users found' : 'Loading users...'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomersTable;