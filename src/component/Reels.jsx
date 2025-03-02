import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const reelsData = [
  { id: 1, video: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "youtube", title: "Rick Roll 😆" },
  { id: 2, video: "https://www.youtube.com/embed/LXb3EKWsInQ", type: "youtube", title: "Nature's Beauty 🌿" },
  { id: 3, video: "https://www.youtube.com/embed/LXb3EKWsInQ", type: "youtube", title: "Custom Local Video 🎥" },
  { id: 4, video: "https://www.youtube.com/embed/LXb3EKWsInQ", type: "youtube", title: "Another Local Clip 🎬" },
  { id: 5, video: "https://www.youtube.com/embed/LXb3EKWsInQ", type: "youtube", title: "Another Local Clip 🎬" },
  { id: 6, video: "https://www.youtube.com/embed/LXb3EKWsInQ", type: "youtube", title: "Another Local Clip 🎬" },
];

const Reels = () => {
  return (
    <div className="mt-10">
      <div className="reels-container w-full py-8 px-0 overflow-hidden relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4} // 4 videos at a time
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }} // Custom navigation
          loop={true}
        >
          {reelsData.map((reel) => (
            <SwiperSlide key={reel.id} className="reel-slide relative rounded-xl overflow-hidden">
              {reel.type === "youtube" ? (
                <iframe className="reel-video w-full h-[400px] object-cover rounded-xl" src={reel.video} title={reel.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              ) : (
                <video className="reel-video w-full h-[400px] object-cover rounded-xl" controls preload="none">
                  <source src={reel.video} type="video/mp4" />
                </video>
              )}
              <div className="reel-overlay absolute bottom-[10px] left-[10px] text-white font-bold bg-[rgba(0,0,0,0.5)] py-[5px] px-[10px] rounded-[5px] ">
                <p>{reel.title}</p>
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
