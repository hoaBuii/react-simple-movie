import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import { apiKey, fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieList(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px]  relative z-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-xl overflow-hidden"
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10 mt-10">
        {title}
      </h1>
      {genres && genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10 ">
          {genres.map((item, index) => (
            <span
              key={item.id}
              className="py-2 px-4 border-primary text-primary border rounded cursor-pointer"
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "credits"),
    fetcher
  );

  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;

  console.log("MovieCredits ~ data", data);

  return (
    <div className="py-10">
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              // src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
              src={tmdbAPI.imageOriginal(item.profile_path)}
              className="w-full h-[350px] object-cover rounded-lg"
              alt=""
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
  if (!data) return null;
  console.log("Movie Videos ~ data", data);
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10"></div>
      {results.slice(0, 2).map((item) => (
        <div className="" key={item.id}>
          <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
            {item.name}
          </h3>
          <div key={item.id} className="w-full aspect-video">
            <iframe
              width="1172"
              height="659"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="Những công nghệ mang “cái chết” đến gần - Oddly normal | #HaveASip 149"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-fill"
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    tmdbAPI.getMovieMeta(movieId, "similar"),
    fetcher
  );

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;

  console.log("Movie similar data ~ ", data);

  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor="true" spaceBetween={40} slidesPerView={"auto"}>
          {results &&
            results.length > 0 &&
            results.map((item, index) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
