import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";

export default function ImageCarousel({ images }) {
  return (
    <div className="p-4">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        autoplay
        className="mySwiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <SwiperSlide>
              <img
                src={img.preview}
                alt={`${i} img`}
                className="!object-cover h-[280px] w-full"
              />
            </SwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
