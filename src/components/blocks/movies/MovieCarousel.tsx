/** Vendor */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

/** Local */
import { constructMoviePosterUrl } from "@/helpers/generic/moviePoster.tsx";

/** Blocks */
import { Heading } from "../../ui/Heading.tsx";

/** Type */
import { MovieType } from "@/helpers/api/movies/types.ts";
type MovieCarouselType = {
  movies: MovieType[];
  title?: string;
  animateIn?: boolean;
  animationDelay?: number;
};

/** Component */
const MovieCarousel = ({ movies, title, animateIn, animationDelay = 0 }: MovieCarouselType) => {
  const swiperContainerRef = useRef<null | HTMLDivElement>(null);
  const [isSwiperLoaded, setIsSwiperLoaded] = useState(false);

  useEffect(() => {
    if (!animateIn) return;

    const amimateIn = () => {
      if (!isSwiperLoaded || !swiperContainerRef.current) return;

      const images = swiperContainerRef.current.querySelectorAll("img");

      for (let i = 0; i < images.length; i++) {
        setTimeout(() => {
          images[i].classList.add("opacity-100");
        }, i * 100);
      }
    };

    setTimeout(() => {
      amimateIn();
    }, animationDelay);
  }, [isSwiperLoaded, animateIn, animationDelay]);

  /** Markup */
  return (
    <section ref={swiperContainerRef}>
      {movies && (
        <>
          {title && (
            <Heading type="h2" className="mb-2">
              {title}
            </Heading>
          )}

          {/* Carousel */}
          <Swiper slidesPerView={"auto"} spaceBetween={16} onSwiper={() => setIsSwiperLoaded(true)}>
            {movies.map((item: MovieType, index: number) => (
              <SwiperSlide key={index} className="w-1/4 lg:w-1/5 flex-none aspect-[115/173] md:aspect-video">
                <Link to={`/browse/${item.id}`}>
                  <img
                    className={`${
                      animateIn ? "opacity-0 transition-all duration-700" : ""
                    } w-full h-full object-cover rounded`}
                    src={constructMoviePosterUrl({ path: item.poster_path })}
                    alt="Poster"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
};

export { MovieCarousel };
