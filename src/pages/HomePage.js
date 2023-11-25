import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";
import Banner from "../components/banner/Banner";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Now Playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Top Rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
