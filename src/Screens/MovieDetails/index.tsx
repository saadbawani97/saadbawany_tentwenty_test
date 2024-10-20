import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Colors,
  Constants,
  Fonts,
  Metrix,
  NavigationService,
} from '../../config';
import StandardButton from '../../components/button';
import {Tags} from '../../components/Tags';
import useApp from '../../Statemanagement/hooks/useApp';
import moment from 'moment';
import Icons from '../../config/icons';
import {WebView} from 'react-native-webview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MovieDetail = props => {
  const id = props?.route?.params?.id;
  const insets = useSafeAreaInsets();

  const {getMoviesDetail, getMovieTrailerVideos} = useApp();

  const [details, setDetails] = useState({});
  const [videoUrl, setVideoUrl] = useState('');
  const [visible, setVisible] = useState(false);

  const injectedJavaScript = `
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        var player;
        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: '${videoUrl}',
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.ENDED) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'onStateChange', info: 0 }));
            }
        }
    `;

  const getSource = () => {
    return {
      html: `
            <html>
            <head>
                <style>
                    body { margin: 0; }
                    #player { width: 100%; height: 100%; }
                </style>
            </head>
            <body>
                <div id="player"></div>
                <script>${injectedJavaScript}</script>
            </body>
        </html>
        `,
    };
  };

  const onMessage = event => {
    console.log('onMessage', event);

    const data = JSON.parse(event.nativeEvent.data);
    if (data.event === 'onStateChange' && data.info === 0) {
      setVisible(false);
    }
  };

  const handleTrailer = async () => {
    const res = await getMovieTrailerVideos(id);
    setVideoUrl(res?.results[0]?.key);
    setVisible(true);
  };

  const getData = async () => {
    const res = await getMoviesDetail(id);
    setDetails(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const backAction = () => {
    console.log('inm backAction');

    if (visible) {
      setVisible(false);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: `${Constants.imageBaseUrl}${details?.poster_path}`}}
          style={styles.movieImageBackground}>
          <TouchableOpacity
            activeOpacity={Metrix.ActiveOpacity}
            style={[
              styles.row,
              {
                paddingTop: Metrix.VerticalSize(insets.top),
              },
            ]}
            onPress={() => NavigationService.goBack()}>
            <Icons.AntDesign name="left" color={Colors.White} size={20} />

            <Text style={styles.title}>{'  '}Watch</Text>
          </TouchableOpacity>

          <View style={styles.trailerDetails}>
            <Text style={styles.releaseDate}>
              In Theaters{' '}
              {moment(details?.release_date, 'YYYY-MM-DD').format('LL')}
            </Text>
            <StandardButton transparent={false} buttonTitle="Get Tickets" />
            <StandardButton
              transparent={true}
              buttonTitle="Watch Trailer"
              onPress={handleTrailer}
            />
          </View>
        </ImageBackground>

        <View style={styles.movieDetails}>
          <Text style={styles.text}>Genre</Text>
          <View style={styles.genresContainer}>
            {details?.genres?.map((item, index) => {
              return (
                <Tags
                  id={item?.id?.toString()}
                  index={index}
                  text={item?.name}
                />
              );
            })}
          </View>
          <View style={styles.seperator} />
          <Text style={styles.text}>Overview</Text>
          <Text style={styles.description}>{details?.overview}</Text>
        </View>

        <Modal visible={visible} animationType="slide" transparent={false}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
            }}>
            <View
              style={{
                width: '100%',
                height: '95%',
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
              }}>
              <WebView
                source={getSource()}
                style={styles.video}
                onMessage={onMessage}
                javaScriptEnabled={true}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: Metrix.HorizontalSize(20),
                  top: Metrix.HorizontalSize(25),
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Metrix.VerticalSize(40),
                }}
                onPress={() => setVisible(false)}>
                <Icons.AntDesign
                  name="left"
                  color={Colors.White}
                  size={Metrix.HorizontalSize(15)}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts['Poppins-Bold'],
                    color: Colors.White,
                  }}>
                  {'  '}Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieImageBackground: {
    flex: 0.55,
    paddingVertical: 15,
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trailerDetails: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.White,
  },
  movieDetails: {
    flex: 0.45,
    width: '100%',
    paddingHorizontal: Metrix.HorizontalSize(30),
    marginTop: 15,
  },
  releaseDate: {
    marginVertical: 10,
    color: Colors.lightWhite,
    fontFamily: Fonts['Poppins-Regular'],
    fontWeight: '500',
    fontSize: Metrix.customFontSize(15),
  },
  genresContainer: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts['Poppins-Regular'],
    fontSize: Metrix.FontRegular,
    fontWeight: '500',
    marginBottom: 10,
    color: Colors.black,
  },
  seperator: {
    borderWidth: 0.7,
    opacity: 0.08,
    borderColor: 'black',
    marginVertical: Metrix.VerticalSize(20),
  },
  description: {
    fontFamily: Fonts['Poppins-Regular'],
    fontSize: Metrix.FontExtraSmall,
    fontWeight: '400',
    color: Colors.grayColor,
  },
  video: {
    flex: 1,
    // backgroundColor: 'red'
  },
  videoIOS: {
    flex: 1,
  },
});
