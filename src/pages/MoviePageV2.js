import React, { useEffect, useLayoutEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../config";
import useSWR from "swr";
import MovieCard, { MovieCardSkeletion } from "../components/movie/MovieCard";
import lodash from "lodash";
import { v4 } from "uuid";
import Button from "../components/button/Button";
import useSWRInfinite from "swr/infinite";

const itemsPerPage = 20;

const MoviePageV2 = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // -----------------------------------------------------------------------------------------------------------

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // const { data, error } = useSWR(url, fetcher);

  //----------------LOAD MORE useSWRInfinite---------------------
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
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

  const movies = (data && data.reduce((a, b) => a.concat(b.results), [])) || [];
  console.log("Movie page ~ movies", movies);

  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);

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
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => {
            return <MovieCardSkeletion key={v4()}></MovieCardSkeletion>;
          })}
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

      <div className="mt-10 text-center">
        <Button
          onClick={() => setSize(size + 1)}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-300" : ""}`}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default MoviePageV2;
