import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

// Videos - Direct Path (No Import)
const reelsData = [
  { id: 1, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613375/ecommerce-videos/yncig6trzxg9bqbrcqdu.mp4" },
  { id: 2, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613372/ecommerce-videos/ax4v1eqa5pcbn6cwtzm2.mp4" },
  { id: 3, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613364/ecommerce-videos/pmyppgvyzie1maiaqlpo.mp4" },
  { id: 4, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613380/ecommerce-videos/gnqoprltjyps65hlcz3l.mp4" },
  { id: 5, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613384/ecommerce-videos/onhtfia5mjvxmbxfz7pv.mp4" },
  { id: 6, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613358/ecommerce-videos/unr1ybjd6jrmdx6psmiy.mp4" },
  { id: 7, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613361/ecommerce-videos/sevfkzcbbfqo8karo6ks.mp4" },
  { id: 8, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613366/ecommerce-videos/eyv5garyzbceggj7cgdz.mp4" },
  { id: 9, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613356/ecommerce-videos/omxnrxz72c09zmkmarrk.mp4" },
  { id: 10, video: "https://res.cloudinary.com/dmmz8ldz9/video/upload/f_auto,q_auto,vc_auto/v1741613377/ecommerce-videos/i4essvlh4feyfqingxxz.mp4" },
];

const Reels = () => {
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch((e) => console.log("Autoplay blocked", e));
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
