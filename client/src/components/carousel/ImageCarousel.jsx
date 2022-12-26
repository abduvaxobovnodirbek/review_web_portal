import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper";

export default function ImageCarousel({ images }) {
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        navigation={true}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`${i} img`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
