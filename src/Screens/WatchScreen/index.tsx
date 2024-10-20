import React, {useEffect, useState} from 'react';
import {FlatList, View, SafeAreaView, StyleSheet} from 'react-native';
import useApp from '../../Statemanagement/hooks/useApp';
import MovieCard from '../../components/movieCard';
import SearchHeader from '../../components/searchHeader';
import {Colors, Constants, Metrix} from '../../config';

export const WatchScreen = () => {
  const {getUpcomingMovies} = useApp();

  const [response, setResponse] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleOnEndReached = () => {
    if (page <= totalPages) {
      setPage(pre => pre + 1);
    }
  };

  const handleOnRefresh = () => {
    setPage(1);
  };

  const getData = async () => {
    if (!refreshing) {
      setRefreshing(true);

      let params = {
        page,
      };
      console.log(params, 'paramsparams');

      const res = await getUpcomingMovies(params);

      setTotalPages(res?.total_pages);

      if (res?.results) {
        const newMovies = res?.results.filter(
          newMovie =>
            !response.some(existingMovie => existingMovie?.id == newMovie?.id),
        );

        if (res.page === 1) {
          setResponse(newMovies); // First page, set fresh data
        } else {
          setResponse(response.concat(newMovies)); // Append new non-duplicate movies to the state
        }
      }

      setRefreshing(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {}, [response]);

  const _renderItem = ({item}) => {
    const {title, backdrop_path} = item;
    return (
      <MovieCard
        id={item?.id}
        imageUrl={`${Constants.imageBaseUrl}${backdrop_path}`}
        movieTitle={title}
      />
    );
  };
  // This will print all IDs

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SearchHeader />

        <FlatList
          data={response}
          renderItem={_renderItem}
          keyExtractor={item => item?.backdrop_path?.toString()}
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          onEndReached={handleOnEndReached}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.subContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  subContainer: {
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
});
