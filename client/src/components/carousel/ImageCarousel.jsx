import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper";
import { Image } from "cloudinary-react";

export default function ImageCarousel({ images, cloudImages }) {
  return (
    <div className="p-4">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        autoplay
        className="mySwiper"
      >
        {cloudImages
          ? images.map((img, i) => (
              <SwiperSlide key={i} className="!h-[300px] !w-full">
                <SwiperSlide>
                  <Image
                    cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                    publicId={"dev_setups/" + img}
                    className="!object-cover !h-[300px] !w-full"
                  />
                </SwiperSlide>
              </SwiperSlide>
            ))
          : images.map((img, i) => (
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
