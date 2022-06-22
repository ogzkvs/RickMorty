import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Text,
} from 'react-native';

import navigations from '../navigations';
import {get, getEpisode} from '../service';
import {ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [page, setPage] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    if (page !== null) {
      getEpisode(page).then(result => {
        setisLoading(true);
        setPage(result.info.next);
        setData([...data, ...result.results]);
      });
      setisLoading(false);
    }
    setisLoading(false);
  };

  const renderView = ({item}) => {
    return (
      <SafeAreaView
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 3,
          }}
          onPress={() =>
            navigation.navigate(navigations.mainStack.Episode, item)
          }>
          <View style={styles.itemView}>
            <Text style={styles.itemStyle}>{item.name}</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.episodeStyle}>{item.episode}</Text>
          </View>

          <View style={{flexDirection: 'row-reverse'}}>
            <View style={styles.btn}>
              <Ionicons name="chevron-forward-outline" size={25} />
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  const renderFooter = () => {
    return isloading ? (
      <View style={styles.loader}>
        <ActivityIndicator animating={true} />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    fetchData();
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderView}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.01}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  episodeStyle: {
    fontSize: 16,
    color: '#29b6f6',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  itemView: {
    height: 40,
    width: '100%',
    padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },

  loader: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
