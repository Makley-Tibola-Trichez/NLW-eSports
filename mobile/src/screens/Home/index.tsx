import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

import logoImg from '../../assets/logo-nlw-esports.png';
import GameCard, { GameCardProps } from '../../components/GameCard';
import Heading from '../../components/Heading';
import Background from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();
  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl });
  };

  useEffect(() => {
    fetch('http://192.168.0.111:8080/games')
      .then((res) => res.json())
      .then(setGames);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre o seu Duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          horizontal
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
};

export default Home;
