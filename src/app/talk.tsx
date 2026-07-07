import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// ★ 共通の戻るボタンを読み込む
import BackButton from '../components/BackButton';

export default function TalkScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* --- ヘッダー --- */}
      <View style={styles.header}>
        <BackButton />
        
        <Text style={styles.headerTitle}>会話の記録</Text>
        
        {/* ＋同席者ボタン */}
        <TouchableOpacity style={styles.companionButton}>
          <Text style={styles.companionButtonText}>＋同席者</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- タイトル部分 --- */}
        <View style={styles.titleArea}>
          <Text style={styles.subTitle}>会話内容の保存！</Text>
          <Text style={styles.mainTitle}>相手：〇〇 〇〇さん</Text>
        </View>

        {/* --- フォーム部分 --- */}
        
        {/* 日付 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>日付</Text>
          <TextInput 
            style={styles.input} 
            placeholder="年 / 月 / 日" 
            placeholderTextColor="#999"
          />
        </View>

        {/* タイトル */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>タイトル</Text>
          <TextInput 
            style={styles.input} 
            placeholder="例：カフェで進路相談" 
            placeholderTextColor="#999"
          />
        </View>

        {/* トークジャンル */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>トークジャンル</Text>
          <TextInput 
            style={styles.input} 
            placeholder="例：雑談、仕事、悩み相談 など" 
            placeholderTextColor="#999"
          />
        </View>

        {/* 内容 */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>内容</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="どんな会話をしたかを自分が見やすいように記入してね！&#10;ヒント：場所とかもここに記載するといいかも！" 
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={6}
          />
        </View>

        {/* --- 登録するボタン --- */}
        <TouchableOpacity style={styles.submitButton} onPress={() => router.back()}>
          <Text style={styles.submitButtonText}>登録する</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { padding: 20, paddingBottom: 40 },
  
  /* --- ヘッダー --- */
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0', 
    backgroundColor: '#fff' 
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e1b4b' },
  companionButton: { 
    backgroundColor: '#f1f5f9', 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  companionButtonText: { color: '#475569', fontWeight: 'bold', fontSize: 13 },

  /* --- タイトル部分 --- */
  titleArea: { alignItems: 'center', marginVertical: 20, marginBottom: 30 },
  subTitle: { fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 8 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e1b4b' },

  /* --- 入力項目 --- */
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#1e1b4b', marginBottom: 8 },
  input: { 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderRadius: 8, 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    fontSize: 16, 
    color: '#333' 
  },
  textArea: { 
    height: 140, 
    textAlignVertical: 'top' 
  },

  /* --- 登録ボタン --- */
  submitButton: { 
    backgroundColor: '#7c3aed', 
    paddingVertical: 16, 
    borderRadius: 25, 
    alignItems: 'center', 
    marginTop: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 3, 
    elevation: 3 
  },
  submitButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 18 },
});