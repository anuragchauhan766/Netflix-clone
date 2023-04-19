import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import { doc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import type { Movie } from "../model/Types";
import { useAuth } from "../context/AuthContext";

interface MovieCardProps {
  movie: Movie;
}
function MovieCard({ movie }: MovieCardProps) {
  const [like, setLike] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const movieRef = doc(db, "users", `${currentUser?.email}`);

  const handlelike = async () => {
    try {
      if (!currentUser) {
        alert("You must be Login to save shows to favorite!!");
      } else if (like === false) {
        setLike((prevlike) => !prevlike);
        await updateDoc(movieRef, {
          savedShows: arrayUnion({
            id: movie.id,
            title: movie.title,
            poster: movie.poster
          })
        });
      } else {
        setLike((prevlike) => !prevlike);

        await updateDoc(movieRef, {
          savedShows: arrayRemove({
            id: movie.id,
            title: movie.title,
            poster: movie.poster
          })
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-full block"
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster}`}
        alt={movie?.title}
      />
      <div className="absolute w-full h-full opacity-0 hover:opacity-100 top-0 left-0 hover:bg-black/80 text-white ">
        <p className="white-space-normal text-xs md:text-sm font-bold h-full flex justify-center items-center">
          {movie?.title}
        </p>

        <button type="button" onClick={handlelike}>
          {like ? (
            <AiFillHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <AiOutlineHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
