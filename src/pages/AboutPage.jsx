import React from 'react';
import Header from '../components/AboutUsComponents/Header';
import Slider from '../components/AboutUsComponents/Slider';
import AboutUs from '../components/AboutUsComponents/AboutUs';
import NewsSection from '../components/AboutUsComponents/NewsSection';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { logUserAction } from "../utils/logAction";
import '../style/Header.css'
import '../style/AboutPage.css'
import Footer from '../components/AboutUsComponents/Footer';

const AboutPage = () => {

  // Take current user from Redux
  const currentUser = useSelector((state) => state.auth.currentUser);

  // Save action if user authorized
  useEffect(() => {
    if (currentUser?.email) {
      logUserAction(currentUser.email, "page_view", "Visited About Page");
    }
  }, [currentUser]);

  return (
    <>
      <Header />
      <Slider />
      <AboutUs />
      <NewsSection />
      <Footer />
    </>
  );
};

export default AboutPage;
