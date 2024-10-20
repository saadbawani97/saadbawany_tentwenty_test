import {Constants, Endpoints} from '../../config';
import {CLIENT_AXIOS} from '../../config/apiCaller';

const useApp = () => {
  const getUpcomingMovies = async params => {
    try {
      const response = await CLIENT_AXIOS.get(Endpoints.UPCOMING, {
        params: {
          api_key: Constants.API_KEY,
          ...params,
        },
      });

      console.log('upcoming api res', response);

      return response;
    } catch (error: any) {
      console.log('upcoming api error', error);
    }
  };

  const getMoviesDetail = async id => {
    try {
      const response = await CLIENT_AXIOS.get(Endpoints.MOVIE_DETAILS + id, {
        params: {
          api_key: Constants.API_KEY,
        },
      });

      console.log('movie detail api res', response);

      return response;
    } catch (error: any) {
      console.log('movie detail api error', error);
    }
  };

  const getMovieTrailerVideos = async id => {
    try {
      const response = await CLIENT_AXIOS.get(Endpoints.MOVIE_VIDEOS(id), {
        params: {
          api_key: Constants.API_KEY,
        },
      });

      console.log('movie videos api res', response);

      return response;
    } catch (error: any) {
      console.log('movie videos api error', error);
    }
  };

  const searchMovies = async params => {
    try {
      const response = await CLIENT_AXIOS.get(Endpoints.MOVIE_SEARCH, {
        params: {
          api_key: Constants.API_KEY,
          ...params,
        },
      });

      console.log('movie search api res', response);

      return response;
    } catch (error: any) {
      console.log('movie search api error', error);
    }
  };

  return {
    getUpcomingMovies,
    getMoviesDetail,
    getMovieTrailerVideos,
    searchMovies,
  };
};

export default useApp;
