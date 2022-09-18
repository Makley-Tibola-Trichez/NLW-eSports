import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { styles } from './styles';

import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from '../../theme';

export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  };
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

const GameCard = ({ data, ...touchableOpacityProps }: Props) => {
  return (
    <TouchableOpacity style={styles.container} {...touchableOpacityProps}>
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.ads}>{data._count.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default GameCard;
