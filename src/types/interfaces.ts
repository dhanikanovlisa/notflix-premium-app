export interface User {
  id_user: number;
  username: string ;
  last_name: string ;
  first_name: string ;
  password?: string ;
  email: string ;
  phone_number: string ;
  photo_profile?: string ;
  is_admin?: boolean;
}

export interface Subscriber {
  creator_id: number;
  username: string;
  subscriber_id: number;
  status: Status;
}

export interface Film {
  film_id: number;
  title: string ;
  description: string ;
  film_path: string ;
  film_poster: string ;
  film_header: string ;
  date_release: Date ;
  duration: number ;
  id_user: number ;
}

export interface FilmRequest {
  requestFilm_id: number;
  id_user: number ;
  filmName: string ;
  description: string ;
  film_path: string ;
  film_poster: string ;
  film_header: string ;
  date_release: Date ;
  duration: number ;
  status: Status;
}

export interface FilmGenre {
  film_genre?: number;
  film_id: number;
  genre_id: number;
}

export interface Genre {
  genre_id?: number;
  genre_name: string;
}

export interface Status {
  status: string;
}