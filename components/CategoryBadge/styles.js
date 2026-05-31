import { StyleSheet } from 'react-native';
import { Colors } from '../../lib/colors';

export default StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    alignSelf: 'flex-start',
  },
  icon: { fontSize: 13, marginRight: 4 },
  text: { color: Colors.textMuted, fontSize: 12 },
});
