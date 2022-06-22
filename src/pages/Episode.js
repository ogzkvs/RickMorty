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
import {get, getCharacters} from '../service';
import {ActivityIndicator} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {URL} from 'react-native-url-polyfill';
import {Button} from 'react-native-paper';

const Episode = ({route}) => {
  const [data, setData] = useState([]);

  const [characters, setCharacters] = useState();
  const [click, setClick] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    get('/' + route.params.id).then(result => {
      setData([...result.characters]);
    });
  };

  const fetchCharacters = () => {
    const ids = data
      .map(item => new URL(item).pathname.split('/').pop())
      .join(',');

    getCharacters(ids).then(result => {
      setCharacters(result);
    });
  };

  const renderView = ({item}) => {
    return click ? (
      <SafeAreaView
        style={{
          paddingHorizontal: 6,
          paddingVertical: 6,
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 3,
          }}
          onPress={() => console.log('welcome')}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.img} source={{uri: item.image}} />
            <View style={styles.itemView}>
              <Text style={styles.headStyle}>{item.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {item.status === 'Alive' ? (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: 'green',
                      borderRadius: 16,
                    }}></View>
                ) : (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: 'red',
                      borderRadius: 16,
                    }}></View>
                )}

                <View style={{marginLeft: 7}}>
                  <Text style={styles.itemStyle}>
                    {item.status}-{item.species}
                  </Text>
                </View>
              </View>
              <View>
                <View style={{marginTop: 8}}>
                  <Text style={styles.txtStyle}>Last known location:</Text>
                  <Text style={styles.itemStyle}>{item.origin.name}</Text>
                </View>
                <View style={{marginTop: 8}}>
                  <Text style={styles.txtStyle}>First seen in:</Text>
                  <Text style={styles.itemStyle}>{item.location.name}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row-reverse'}}></View>
        </TouchableOpacity>
      </SafeAreaView>
    ) : null;
  };

  return (
    <View>
      <View>
        <View style={styles.characterView}>
          <Text style={styles.headStyle}>{route.params.name}</Text>
        </View>

        <Button
          mode="text"
          onPress={() => {
            setClick(true);
            fetchCharacters();
          }}>
          Karakterleri Göster
        </Button>

        <FlatList
          data={characters}
          renderItem={renderView}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  itemStyle: {
    fontSize: 13,
    color: 'black',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  headStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    fontStyle: 'normal',
  },

  itemView: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  characterView: {
    flexDirection: 'column',
    height: 60,
    width: '100%',
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    height: 150,
    width: 170,
  },
  txtStyle: {
    fontSize: 12,
    color: 'gray',
    fontWeight: '500',
    fontStyle: 'normal',
  },
});

export default Episode;
