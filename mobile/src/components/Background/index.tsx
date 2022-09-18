import React, { PropsWithChildren } from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';
import backgroundImg from '../../assets/background-galaxy.png';

interface Props {}

const Background = ({ children }: PropsWithChildren<Props>) => {
  return (
    <ImageBackground
      source={backgroundImg}
      style={styles.container}
      defaultSource={backgroundImg}
    >
      {children}
    </ImageBackground>
  );
};

export default Background;
