import React from "react";
import styles from "./MainSlider.module.css";
import slider1 from "./../../assets/grocery-banner-2.jpeg";
import slider2 from "./../../assets/grocery-banner.png";
import img1 from "./../../assets/slider-image-1.jpeg";
import img2 from "./../../assets/slider-image-2.jpeg";
import img3 from "./../../assets/slider-image-3.jpeg";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

export default function MainSlider() {
  return (
    <>
      <div className="bg-white dark:bg-slate-800 dark:text-white">
        <div className="container mx-auto ">
          <div className="flex flex-wrap text-center">
            <div className="w-full">
              <>
                <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  scrollbar={{ draggable: true }}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                >
                  <SwiperSlide>
                    <img src={img1} className="w-full h-[500px]" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <img src={img2} className="w-full h-[500px]" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={img3} className="w-full h-[500px]" alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slider1} className="h-[500px] w-full" alt="" />{" "}
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slider2} className="h-[500px] w-full" alt="" />{" "}
                  </SwiperSlide>
                </Swiper>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
