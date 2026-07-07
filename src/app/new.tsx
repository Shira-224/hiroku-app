import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// ★ 作成した共通コンポーネントを読み込む
import BackButton from '../components/BackButton';

export default function NewScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* ヘッダー */}
        <View style={styles.header}>
          {/* ★ コンポーネントを呼び出す */}
          <BackButton />
          
          <Text style={styles.headerTitle}>新規登録</Text>
          
          {/* タイトルを中央に配置するための空スペース */}
          <View style={styles.headerSpacer} />
        </View>

        {/* フォーム部分 */}
        <ScrollView contentContainerStyle={styles.formContainer}>
          
          {/* 画像選択 */}
          <View style={styles.imageSelectGroup}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.noImageText}>No Image</Text>
            </View>
            <TouchableOpacity style={styles.imageButton}>
              <Text style={styles.imageButtonText}>画像を選択</Text>
            </TouchableOpacity>
          </View>

          {/* 名前 */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>名前</Text>
            <TextInput 
              style={styles.input} 
              placeholder="例：横浜 市民" 
              placeholderTextColor="#999"
            />
          </View>

          {/* タグ設定 */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>タグ設定</Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              placeholder="例：バスケ リスナー ギター (スペースで区切って入力)" 
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
            />
          </View>

          {/* 登録するボタン */}
          <TouchableOpacity style={styles.submitButton} onPress={() => router.back()}>
            <Text style={styles.submitButtonText}>登録する</Text>
          </TouchableOpacity>
          
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  
  /* --- ヘッダー --- */
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#7c3aed' },
  headerSpacer: { width: 60 },
  
  /* --- フォーム全体 --- */
  formContainer: { padding: 20 },
  
  /* --- 画像選択 --- */
  imageSelectGroup: { alignItems: 'center', marginBottom: 30 },
  imagePlaceholder: { width: 120, height: 120, backgroundColor: '#f8fafc', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  noImageText: { color: '#94a3b8', fontSize: 14 },
  imageButton: { backgroundColor: '#f5f3ff', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#ddd6fe' },
  imageButtonText: { color: '#7c3aed', fontWeight: 'bold', fontSize: 14 },
  
  /* --- 入力項目 --- */
  formGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#1e1b4b', marginBottom: 8 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 16, color: '#333' },
  textArea: { height: 100, textAlignVertical: 'top' },
  
  /* --- 登録ボタン --- */
  submitButton: { backgroundColor: '#7c3aed', paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginTop: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
  submitButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
});