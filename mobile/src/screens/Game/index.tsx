import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import Background from '../../components/Background';
import DuoCard, { DuoCardProps } from '../../components/DuoCard';
import Heading from '../../components/Heading';
import { THEME } from '../../theme';
import { styles } from './styles';

import { useEffect, useState } from 'react';
import DuoMatch from '../../components/DuoMatch';

const Game = () => {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getDiscordUser = async (adsId: string) => {
    fetch(`http://192.168.0.111:8080/ads/${adsId}/discord`)
      .then((res) => res.json())
      .then((data) => setDiscordDuoSelected(data.discord));
  };

  useEffect(() => {
    fetch(`http://192.168.0.111:8080/games/${game.id}/ads`)
      .then((res) => res.json())
      .then(setDuos);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              colr={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />
        <FlatList
          data={duos}
          keyExtractor={(duo) => duo.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[
            duos.length > 0 ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios públicados ainda
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
};

export default Game;
