import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/DashboardComponents/Header';
import Banner from '../components/DashboardComponents/Banner';
import Recommendations from '../components/DashboardComponents/Recommendations';
import Achievements from '../components/DashboardComponents/Achievements';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { logUserAction } from "../utils/logAction";
import '../style/Header.css'
import '../style/Dashboard.css'

const Dashboard = () => {

    // Take current user from Redux
    const currentUser = useSelector((state) => state.auth.currentUser);

    // Save action if user authorized
    useEffect(() => {
        if (currentUser?.email) {
            logUserAction(currentUser.email, "page_view", "Visited Dashboard");
        }
    }, [currentUser]);

    // Add component on page and Outlet for nested page
    return (
        <div className="dashboard-layout">
            <Header />
            <Banner />
            <Outlet />
            <Recommendations />
            <Achievements />
        </div>
    );
};

export default Dashboard;
