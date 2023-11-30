import React, { Fragment, useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import MovieCard, { MovieCardSkeletion } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

//https://api.themoviedb.org/3/movie/now_playing?api_key

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data && data.results) setMovies(data.results);

    return () => {};
  }, [data]);
  console.log(movies);

  return (
    <div className="movie-list">
      {isLoading && (
        <>
          <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
            <SwiperSlide>
              <MovieCardSkeletion></MovieCardSkeletion>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeletion></MovieCardSkeletion>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeletion></MovieCardSkeletion>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeletion></MovieCardSkeletion>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
          {movies &&
            movies.length > 0 &&
            movies.map((item, index) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400 ">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
