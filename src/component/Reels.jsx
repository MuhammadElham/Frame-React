import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// Videos
import video1 from "/videos/video1.mp4";
import video2 from "/videos/video2.mp4";
import video3 from "/videos/video3.mp4";
import video4 from "/videos/video4.mp4";
import video5 from "/videos/video5.mp4";
import video6 from "/videos/video6.mp4";
import video7 from "/videos/video7.mp4";
import video8 from "/videos/video8.mp4";
import video9 from "/videos/video9.mp4";
import video10 from "/videos/video10.mp4";

// Data
const reelsData = [
  { id: 1, video: video1 },
  { id: 2, video: video2 },
  { id: 3, video: video3 },
  { id: 4, video: video4 },
  { id: 5, video: video5 },
  { id: 6, video: video6 },
  { id: 7, video: video7 },
  { id: 8, video: video8 },
  { id: 9, video: video9 },
  { id: 10, video: video10 },
];

const Reels = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play();
      }
    });
  }, []);

  return (
    <div className="mt-10">
      <div className="reels-container w-full py-8 px-0 overflow-hidden relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          breakpoints={{
            320: { slidesPerView: 2.5 },
            640: { slidesPerView: 4.5 },
            1024: { slidesPerView: 5.5 },
            1280: { slidesPerView: 6.5 },
          }}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          loop={true}
        >
          {reelsData.map((reel, index) => (
            <SwiperSlide key={reel.id} className="reel-slide relative rounded-xl overflow-hidden">
              <div className="relative w-full h-[250px] lg:h-[300px] custom-height">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="reel-video w-full h-full object-cover rounded-xl"
                  playsInline
                  muted
                  autoPlay
                  loop
                  controlsList="nodownload"
                  onContextMenu={(e) => e.preventDefault()}
                  loading="lazy"
                >
                  <source src={reel.video} type="video/mp4" />
                </video>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Left & Right Navigation Buttons */}
        <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full">❮</button>
        <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full">❯</button>
      </div>
    </div>
  );
};

export default Reels;
