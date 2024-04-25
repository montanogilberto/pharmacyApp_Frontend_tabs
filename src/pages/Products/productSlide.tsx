import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const ProductSlide: React.FC<{ images: { file: string }[] }> = ({ images }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={`data:image/jpeg;base64,${img.file}`} alt={`Captured Image ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlide;
