/** Vendor */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/** Local */
import { useAppSelector } from "@/store/hooks.ts";
import { useFetchMovieDetails, useFetchMovieReleaseDates } from "@/helpers/api/movies/fetch.ts";
import { getMoviePosterUrl } from "@/helpers/generic/getMoviePosterUrl.tsx";

/** Blocks */
import { PageWrapper } from "@/components/blocks/generic/PageWrapper.tsx";
import { Header } from "@/components/blocks/generic/Header.tsx";
import { Heading } from "@/components/ui/Heading.tsx";
import { VideoPlayer } from "@/components/blocks/generic/VideoPlayer.tsx";
import { Button } from "@/components/ui/Button.tsx";
import { MovieCast } from "@/components/blocks/movies/MovieCast.tsx";

/** Component */
const MovieDetailPage = () => {
  const { id } = useParams();
  const movieId = id ? parseInt(id) : null;
  const [relevantCertification, setRelevantCertification] = useState("");
  const isSearchActive = useAppSelector((state) => state.app.isSearchActive);
  const isLoading = useAppSelector((state) => state.app.isLoading);

  /** API calls */
  const {
    data: movieDetails,
    error: movieDetailsError,
    retry: retryMovieDetails,
  } = useFetchMovieDetails({ movieId: movieId });
  const { data: movieReleaseData } = useFetchMovieReleaseDates(movieId);

  /** Effects */
  useEffect(() => {
    if (movieReleaseData) {
      const getRelevantCertification = () => {
        for (const item of movieReleaseData.results) {
          const countryCode = item.iso_3166_1;
          const certification = item.release_dates[0].certification;

          if (["NL", "BE", "DE"].includes(countryCode) && certification) {
            setRelevantCertification(certification);
            break;
          }
        }
      };

      getRelevantCertification();
    }
  }, [movieReleaseData, relevantCertification]);

  /** Helpers */
  const renderMovieCertification = (certification: string) => {
    const certificationText = certification === "0" ? "AL" : certification;
    return (
      <p className="rounded-full text-center text-sm aspect-square w-[32px] bg-black-main  p-1 font-semibold border-2 border-white-main">
        {certificationText}
      </p>
    );
  };

  const renderMovieDuration = (runtime: number) => {
    const minutes = runtime % 60;
    const hours = (runtime - minutes) / 60;
    return `${hours}h ${minutes}m`;
  };

  /** Markup */
  return (
    <>
      <Header />
      {!isSearchActive && movieDetails && (
        <VideoPlayer file="/wb_intro.mp4" poster={getMoviePosterUrl(movieDetails.poster_path)} />
      )}

      <PageWrapper disablePaddingTop usedWithHeader>
        {/* Movie details */}
        {!isSearchActive && movieDetails && (
          <>
            <section className="mb-10 mt-2">
              {/* Top bar */}
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <li>{movieDetails.release_date}</li>
                {relevantCertification && <li>{renderMovieCertification(relevantCertification)}</li>}
                <li>{renderMovieDuration(movieDetails.runtime)}</li>
                <li className="border-2 border-grey-light rounded text-sm px-1 text-grey-light">HD</li>
              </ul>

              {/* Title and description*/}
              <section className="mb-5">
                <Heading type="h2" className="mt-5 mb-2">
                  {movieDetails.title}
                </Heading>
                <p>{movieDetails.overview}</p>
              </section>

              {/* Cast */}
              {movieDetails.credits && <MovieCast credits={movieDetails.credits} />}
            </section>

            {/* More like this*/}
            <section>
              <Heading type="h3" className="mb-2">
                More Like This
              </Heading>

              <ul>
                {movieDetails.genres.map((item, index) => (
                  <li key={index}>
                    {item.name}, id: {item.id}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {/* Error */}
        {movieDetailsError && (
          <section>
            <p className="my-4">Something went wrong while retrieving movie data, please try again.</p>
            <Button text="Try again" variant="primary" onClick={() => retryMovieDetails()} />
          </section>
        )}
      </PageWrapper>
    </>
  );
};

export { MovieDetailPage };
