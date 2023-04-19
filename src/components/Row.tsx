import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import type { Movie } from "../model/Types";
import { fetchMovies } from "../api/request";
import MovieCard from "./MovieCard";

interface RowProps {
  title: string;
  fetchUrl: string;
}
function Row({ title, fetchUrl }: RowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(fetchUrl);
      setMovies(data);
    };

    getMovies();
  }, [fetchUrl]);

  const slideLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft -= 500;
    }
  };
  const slideRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += 500;
    }
  };
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4 ">{title}</h2>
      <div className="relative flex items-center group">
        <AiOutlineLeft
          size={40}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          onClick={slideLeft}
        />
        <div
          ref={containerRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap  scroll-smooth scrollbar-hide">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <AiOutlineRight
          size={40}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
          onClick={slideRight}
        />
      </div>
    </>
  );
}

export default Row;
