import React, { useState, useEffect }  from 'react';
import Navbar from './Navbar';
import About from './About';
import Product from './Product';
import Contact from './Contact';
import Footer from './Footer';
import axios from 'axios';
const Home = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };
  return (
    <>
        <Navbar />
        <section id="hero">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                 {banners.map((banner) => (
                   banner.status === 'active' && ( 
                    <div className="swiper-slide" key={banner.banner_id}>
                      <img src={`http://localhost:3001/uploads/banners/${banner.image}`} alt={banner.title} style={{width: '100%'}}/>
                    </div>
                   )
                  ))}
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
       </section>
       <About />
       <Product />
       <Contact />
       <Footer />
    </>
   
  )
}

export default Home