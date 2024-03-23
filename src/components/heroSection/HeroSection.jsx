// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y , Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import './index.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const HeroSection = () => {
  return (
    <Swiper 
    className='flex items-center justify-center w-full h-full '
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      
      autoplay={{
        delay: 3000,
        disableOnInteraction:false,
      }}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img className='w-full h-full object-cover' src="https://iili.io/Jh0MM5F.png" alt="Amir Hamza" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://iili.io/JXtoXp4.png" alt="Amir Hamza" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://iili.io/JXtx7cu.png" alt="Amir Hamza" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://iili.io/Jh0Vyvt.png" alt="Amir Hamza" />
      </SwiperSlide>
      
    </Swiper>
    
  )
}

export default HeroSection