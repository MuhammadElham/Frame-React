import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// Video
import video1 from "../assets/karigari Logos/Videos/video1.mp4";
import video2 from "../assets/karigari Logos/Videos/video2.mp4";
import video3 from "../assets/karigari Logos/Videos/video3.mp4";
import video4 from "../assets/karigari Logos/Videos/video4.mp4";
import video5 from "../assets/karigari Logos/Videos/video5.mp4";
import video6 from "../assets/karigari Logos/Videos/video6.mp4";
import video7 from "../assets/karigari Logos/Videos/video7.mp4";
import video8 from "../assets/karigari Logos/Videos/video8.mp4";
import video9 from "../assets/karigari Logos/Videos/video9.mp4";
import video10 from "../assets/karigari Logos/Videos/video10.mp4";
// Thumbnail
import poster1 from "../assets/karigari Logos/Thumbnail/thumbnail_video1.png";
import poster2 from "../assets/karigari Logos/Thumbnail/thumbnail_video2.png";
import poster3 from "../assets/karigari Logos/Thumbnail/thumbnail_video3.png";
import poster4 from "../assets/karigari Logos/Thumbnail/thumbnail_video4.png";
import poster5 from "../assets/karigari Logos/Thumbnail/thumbnail_video5.png";
import poster6 from "../assets/karigari Logos/Thumbnail/thumbnail_video6.png";
import poster7 from "../assets/karigari Logos/Thumbnail/thumbnail_video7.png";
import poster8 from "../assets/karigari Logos/Thumbnail/thumbnail_video8.png";
import poster9 from "../assets/karigari Logos/Thumbnail/thumbnail_video9.png";
import poster10 from "../assets/karigari Logos/Thumbnail/thumbnail_video10.png";
// Data
const reelsData = [
  { id: 1, video: video1, type: "local", poster: poster1 },
  { id: 2, video: video2, type: "local", poster: poster2 },
  { id: 3, video: video3, type: "local", poster: poster3 },
  { id: 4, video: video4, type: "local", poster: poster4 },
  { id: 5, video: video5, type: "local", poster: poster5 },
  { id: 6, video: video6, type: "local", poster: poster6 },
  { id: 7, video: video7, type: "local", poster: poster7 },
  { id: 8, video: video8, type: "local", poster: poster8 },
  { id: 9, video: video9, type: "local", poster: poster9 },
  { id: 10, video: video10, type: "local", poster: poster10 },
];

const Reels = () => {
  const videoRefs = useRef([]);
  const [playing, setPlaying] = useState({});

  const togglePlay = (index) => {
    if (videoRefs.current[index]) {
      const video = videoRefs.current[index];

      if (video.paused) {
        video.play();
        setPlaying((prev) => ({ ...prev, [index]: true }));
      } else {
        video.pause();
        setPlaying((prev) => ({ ...prev, [index]: false }));
      }
    }
  };

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
                <video ref={(el) => (videoRefs.current[index] = el)} className="reel-video w-full h-full object-cover rounded-xl" preload="metadata" poster={reel.poster} playsInline muted onClick={() => togglePlay(index)} controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
                  <source src={reel.video} type="video/mp4" />
                </video>
                {!playing[index] && (
                  <button onClick={() => togglePlay(index)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-30 transition-all">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.5 4.5v11l8-5.5-8-5.5z" />
                    </svg>
                  </button>
                )}
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
