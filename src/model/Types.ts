/* eslint-disable @typescript-eslint/naming-convention */
export interface MovieData {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
}

export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster: string;
  releaseDate?: string;
}
