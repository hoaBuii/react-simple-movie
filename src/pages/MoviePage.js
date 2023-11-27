import React, { useEffect, useLayoutEffect, useState } from "react";
import MovieList from "../components/movie/MovieList";
import { fetcher, tmdbAPI } from "../config";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import lodash from "lodash";
import ReactPaginate from "react-paginate";
import { useLockBodyScroll } from "@uidotdev/usehooks";

const itemsPerPage = 20;
const pageRangeDisplayed = 3;

const MoviePage = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  // -----------------------------------------------------------------------------------------------------------

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // const onChangePage = (value) => {
  //   debugger;
  //   let currentNextPage = value + 1;

  //   setNextPage(() => {
  //     if (filter) {
  //       setUrl(
  //         `https:api.themoviedb.org/3/search/movie?api_key=a0d7e56f44a096c3b74ae90a43529eeb&query=${filter}&page=${currentNextPage}`
  //       );
  //     } else {
  //       setUrl(
  //         `https:api.themoviedb.org/3/movie/popular?api_key=a0d7e56f44a096c3b74ae90a43529eeb&page=${currentNextPage}`
  //       );
  //     }
  //     return currentNextPage;
  //   });
  // };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  //REACT PAGINATION
  useLayoutEffect(() => {
    if (filter) {
      setUrl(tmdbAPI.getMovieSearch(filter, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filter, nextPage]);

  useLayoutEffect(() => {
    if (data && data.total_results) {
      let currentPageCount = Math.ceil(data?.total_results / itemsPerPage);
      setPageCount(currentPageCount);
    }
  }, [data, itemOffset]);

  //khong khai bao ham useEffect sau (dieu kien if va return)
  //ham return dan den loi trong code
  // if (!data) return null;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.total_pages;
    console.log(
      `User requested page number ${
        event.selected + 1
      }, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  // --------------------------------------------------------------------------------------------------------------

  // if (!data) return null;
  const movies = data?.results || [];
  // const { page, total_pages } = data || {};

  console.log("Filter Data ~ ", filter);
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search ..."
            onChange={lodash.debounce(handleFilterChange, 500)}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin">
          {" "}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies &&
          movies.length > 0 &&
          movies.map((item, index) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>

      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>

      {/* <div className="flex items-center justify-center mt-10 gap-x-5 ">
        <span
          className="cursor-pointer z-10"
          onClick={() => onChangePage("substract")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        <span className="inline-block py-2 px-4 rounded bg-white text-slate-900 leading-none">
          {nextPage}
        </span>
        <span
          onClick={() => onChangePage("add")}
          className="cursor-pointer z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div> */}
    </div>
  );
};

export default MoviePage;
