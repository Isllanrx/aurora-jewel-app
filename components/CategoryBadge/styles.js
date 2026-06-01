import { StyleSheet } from 'react-native';
import { Colors } from '../../lib/colors';

export default StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: { color: Colors.textMuted, fontSize: 12 },
});
