import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../state/Auth/Action';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.auth);
    
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [dispatch]);
    
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg font-semibold">Please login to view your profile</p>
            </div>
        );
    }
    // console.log("user in profile", user);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Profile Information</h2>

            <div className="mb-4">
                <p><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
            </div>
            <div className="mb-4">
                <p><span className="font-semibold">Email:</span> {user.email}</p>
            </div>
            <div className="mb-4">
                <p><span className="font-semibold">Role:</span> {user.role}</p>
            </div>
            <div className="mb-4">
                <p><span className="font-semibold">Orders Placed:</span> {user.orders?.length || 0}</p>
            </div>
            <div className="mb-4">
                <p><span className="font-semibold">Total Reviews:</span> {user.reviews?.length || 0}</p>
            </div>
            <div className="mb-4">
                <p><span className="font-semibold">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default Profile;
