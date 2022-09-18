import React, { useState } from 'react';
import {
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import Heading from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
  discord: string;
  onClose(): void;
}

const DuoMatch = ({ discord, onClose, ...modalProps }: Props) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyDiscordUserToClipboard = async () => {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert(
      'Discord Copiado!',
      'Usuário copiado para você colar no Discord.'
    );
    setIsCopying(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent
      statusBarTranslucent
      {...modalProps}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordUserToClipboard}
            disabled={!isCopying}
          >
            <Text style={styles.discord}>
              {isCopying ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DuoMatch;
