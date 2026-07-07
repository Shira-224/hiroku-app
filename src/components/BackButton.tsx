import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <Text style={styles.backButtonText}>戻る</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: { 
    backgroundColor: '#7c3aed', 
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    borderRadius: 6 
  },
  backButtonText: { 
    color: '#ffffff', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
});