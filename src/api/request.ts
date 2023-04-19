import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Movie, MovieData } from "../model/Types";

const BASE_URL = "https://api.themoviedb.org/3/movie";

const apiKey = import.meta.env.VITE_MOVIES_API_KEY;
const requests = {
  Popular: `${BASE_URL}/popular?api_key=${apiKey}&language=en-US&page=1`,
  Toprated: `${BASE_URL}/top_rated?api_key=${apiKey}&language=en-US&page=1`,
  Trending: `${BASE_URL}/popular?api_key=${apiKey}&language=en-US&page=2`,
  Upcoming: `${BASE_URL}/upcoming?api_key=${apiKey}&language=en-US&page=1`,
  Horror: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=horror&page=1&include_adult=false`
};
export const fetchMovies = async (url: string): Promise<Movie[]> => {
  try {
    const response: AxiosResponse<{ results: MovieData[] }> = await axios.get(url);

    const filterData: Movie[] = response.data.results.map((data) => ({
      id: data.id,
      title: data.title,
      overview: data.overview,
      poster: data.backdrop_path,
      releaseDate: data.release_date
    }));

    return filterData;
  } catch (error) {
    console.error(error);
  }
  return [];
};
export default requests;
