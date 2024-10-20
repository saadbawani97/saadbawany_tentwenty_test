import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useApp from '../../Statemanagement/hooks/useApp';
import {
  Colors,
  Constants,
  Fonts,
  Icons,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import ResultListItem from '../../components/resultListItem';

const MovieSearchScreen = () => {
  const {searchMovies} = useApp();

  const [response, setResponse] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [showSearch, setShowSearch] = useState(true);

  const inputRef = useRef(null);

  const handleClose = () => {
    setShowSearch(false);
  };

  const handleSearch = text => {
    setSearchText(text);

    setTimeout(() => {
      getData();
    }, 2 * 1000);
  };

  const handleOnEndReached = () => {
    if (page <= totalPages) {
      setPage(page + 1);
    }
  };

  const handleOnRefresh = () => {
    setPage(1);
  };

  const getData = async () => {
    if (!refreshing) {
      setRefreshing(true);

      let params = {
        query: searchText,
        page,
      };

      const res = await searchMovies(params);
      setTotalResults(res?.total_results);
      setTotalPages(res?.total_pages);
      setIsFirstTime(false);

      if (res?.page === 1) {
        setResponse(res?.results);
      } else {
        setResponse(response?.concat(res?.results));
      }

      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (searchText !== '') {
      setTimeout(() => {
        getData();
      }, 2 * 1000);
    }
  }, [searchText]);

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    inputRef?.current?.focus();
    getData();
  }, []);

  const getImage = url =>
    url ? {uri: `${Constants.imageBaseUrl}${url}`} : Images.dummyImage;

  const renderEmpty = () => {
    if (refreshing && isFirstTime) {
      return;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Result Found</Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const image = getImage(item?.backdrop_path);

    return (
      <ResultListItem
        id={item?.id?.toString}
        imageUrl={image}
        movieTitle={item?.original_title}
      />
    );
  };

  const renderHeader = () => {
    if (response?.length) {
      return (
        <View>
          <Text style={styles.headerTextStyle}>Top Results</Text>

          <View style={styles.borderStyle} />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.White}}>
      <View style={styles.container}>
        <View style={{paddingHorizontal: Metrix.HorizontalSize(10)}}>
          {showSearch ? (
            <View style={styles.searchContainer}>
              <TouchableOpacity>
                <Icons.Ionicons
                  color={Colors.black}
                  size={Metrix.VerticalSize(20)}
                  name={'search'}
                />
              </TouchableOpacity>
              <TextInput
                ref={inputRef}
                placeholder="TV shows, movies and more"
                placeholderTextColor={Colors.grayColor}
                value={searchText}
                onChangeText={handleSearch}
                style={styles.inputContainer}
              />
              <TouchableOpacity
                activeOpacity={Metrix.ActiveOpacity}
                onPress={() => NavigationService.goBack()}>
                <Icons.Ionicons
                  color={Colors.black}
                  size={Metrix.VerticalSize(25)}
                  name={'close'}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.row}>
              <TouchableOpacity
                activeOpacity={Metrix.ActiveOpacity}
                style={styles.row}
                onPress={() => NavigationService.goBack()}>
                <Icons.AntDesign name="left" color={Colors.black} size={20} />
              </TouchableOpacity>

              <Text style={styles.titleStyle}>
                {'  '}
                {totalResults} Results Found
              </Text>
            </View>
          )}
        </View>

        <FlatList
          data={response}
          renderItem={renderItem}
          keyExtractor={item => item?.id?.toString()}
          refreshing={refreshing}
          onRefresh={handleOnRefresh}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmpty}
          onEndReached={handleOnEndReached}
          ListHeaderComponent={renderHeader}
          style={styles.flatListContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: Metrix.HorizontalSize(20),
  },
  emptyContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    color: Colors.black,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: '#F3F3F3',
    marginHorizontal: 10,
    height: Metrix.VerticalSize(50),
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  emptyText: {
    color: Colors.grayColor,
    fontFamily: Fonts['Poppins-Regular'],
    fontSize: 12,
  },
  headerTextStyle: {
    color: '#202C43',
    fontFamily: Fonts['Poppins-Bold'],
    fontSize: 12,
  },
  borderStyle: {
    height: 1,
    width: '100%',
    backgroundColor: '#DBDBDF',
    marginVertical: Metrix.HorizontalSize(10),
  },
  flatListContainer: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingTop: Metrix.HorizontalSize(30),
  },
  titleStyle: {
    color: '#202C43',
    fontFamily: Fonts['Poppins-Bold'],
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MovieSearchScreen;
