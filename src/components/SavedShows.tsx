import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";
import { updateDoc, doc, onSnapshot, arrayRemove } from "firebase/firestore";
import type { Movie } from "../model/Types";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";

function SavedShows() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();
  const moviesRef = doc(db, "users", `${currentUser?.email}`);
  useEffect(() => {
    const unsubscribe = onSnapshot(moviesRef, (document) => {
      setMovies(document.data()?.savedShows);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email]);

  const deleteShow = async (id: number) => {
    try {
      const result = movies.filter((movie) => movie.id === id);

      await updateDoc(moviesRef, {
        savedShows: arrayRemove(result[0])
      });
    } catch (error) {
      console.error(error);
    }
  };
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
    <div>
      <h2 className="text-white font-bold md:text-xl p-4 ">My Shows</h2>
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
            <div
              key={movie.id}
              className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
              <img
                className="w-full h-full block"
                src={`https://image.tmdb.org/t/p/w500/${movie?.poster}`}
                alt={movie?.title}
              />
              <div className="absolute w-full h-full opacity-0 hover:opacity-100 top-0 left-0 hover:bg-black/80 text-white ">
                <p className="white-space-normal text-xs md:text-sm font-bold h-full flex justify-center items-center">
                  {movie?.title}
                </p>
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-300"
                  onClick={() => deleteShow(movie.id)}>
                  <AiOutlineClose size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <AiOutlineRight
          size={40}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
          onClick={slideRight}
        />
      </div>
    </div>
  );
}

export default SavedShows;
