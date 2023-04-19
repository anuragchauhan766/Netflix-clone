/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from "react";
import requests, { fetchMovies } from "../api/request";
import type { Movie } from "../model/Types";

function Hero() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovies(requests.Popular);
      setMovies(data);
    };
    getMovies();
  }, []);

  return (
    <div className="w-full h-[550px] text-white">
      <div className="w-full h-full">
        <div className=" absolute w-full h-[550px] bg-gradiant-to-r from-black" />
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original/${movie?.poster}`}
          alt={movie?.title}
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4">
            <button type="button" className="bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button type="button" className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm">Released: {movie?.releaseDate}</p>
          <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
            {movie?.overview.slice(0, 150)}... Read More
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
