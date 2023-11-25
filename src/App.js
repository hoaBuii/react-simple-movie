import { Fragment } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import MovieCard from "./components/movie/MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import MovieList from "./components/movie/MovieList";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <Fragment>
                <Banner></Banner>
                <HomePage></HomePage>
              </Fragment>
            }
          ></Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
          <Route
            path="/movie/:movieId"
            element={<MovieDetailsPage></MovieDetailsPage>}
          ></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
