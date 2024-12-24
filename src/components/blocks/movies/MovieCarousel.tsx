/** Vendor */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

/** Local */
import { renderMoviePoster } from "@/helpers/movies/moviePoster.tsx";

/** Blocks */
import { Heading } from "@/components/ui/Heading.tsx";
import { InfoBox } from "@/components/blocks/movies/InfoBox.tsx";

/** Type */
import { MovieType } from "@/helpers/api/movies/types.ts";
type MovieCarouselType = {
  movies: MovieType[];
  title?: string;
  animateIn?: boolean;
  animationDelay?: number;
  enableInfoBox?: boolean;
};

/** Component */
const MovieCarousel = ({ movies, title, animateIn, animationDelay = 0, enableInfoBox = true }: MovieCarouselType) => {
  const swiperContainerRef = useRef<null | HTMLDivElement>(null);
  const [isSwiperLoaded, setIsSwiperLoaded] = useState(false);

  /** Effects */
  useEffect(() => {
    if (!animateIn || !isSwiperLoaded || !swiperContainerRef.current) return;

    const images = swiperContainerRef.current.querySelectorAll("img");

    const amimateIn = () => {
      for (let i = 0; i < images.length; i++) {
        setTimeout(() => {
          images[i].classList.add("opacity-100");
        }, i * 40);
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
              <SwiperSlide key={index} className="w-1/4 lg:h-[210px] group aspect-[115/173] lg:w-fit md:aspect-[16/10]">
                {/* Info box */}
                {enableInfoBox && <InfoBox movieData={item} />}

                {/* Poster */}
                <Link to={`/browse/${item.id}`}>
                  {renderMoviePoster({
                    posterPath: item.poster_path,
                    backdropPath: item.backdrop_path,
                    posterSize: 500,
                    backdropSize: 780,
                    dataProperty: { key: "image-index", value: index },
                    className: `${animateIn ? "opacity-0 transition-all duration-700" : ""} rounded`,
                  })}
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
