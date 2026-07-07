import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// ★ 先ほど作ったコンポーネントを読み込む
import BackButton from '../components/BackButton';

export default function EditScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* --- ヘッダー --- */}
      <View style={styles.header}>
        {/* ★ コンポーネントを呼び出すだけ！ */}
        <BackButton />
        
        <Text style={styles.headerTitle}>詳細編集</Text>
        
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>消去</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        {/* --- タイトル部分 --- */}
        <View style={styles.titleArea}>
          <Text style={styles.subTitle}>詳細の情報を記録する！</Text>
          <Text style={styles.mainTitle}>〇〇 〇〇さん</Text>
        </View>

        {/* --- アクションリスト --- */}
        <View style={styles.actionList}>
          
          {/* 会話内容を保存するボタン */}
          <TouchableOpacity style={styles.highlightButton}>
            <Text style={styles.highlightButtonText}>💬 会話内容を保存する</Text>
          </TouchableOpacity>

          {/* グループ1 */}
          <View style={styles.listGroup}>
            <ListItem icon="🖼️" text="画像変更" />
            <ListItem icon="👤" text="名前変更" />
            <ListItem icon="🎂" text="年齢" />
            <ListItem icon="🚻" text="性別" isLast />
          </View>

          {/* グループ2 */}
          <View style={styles.listGroup}>
            <ListItem icon="💼" text="職業" />
            <ListItem icon="🏫" text="部活・職場" />
            <ListItem icon="🤝" text="関係" />
            <ListItem icon="📱" text="SNS" isLast />
          </View>

          {/* グループ3 */}
          <View style={styles.listGroup}>
            <ListItem icon="🎨" text="趣味" />
            <ListItem icon="🏷️" text="タグ変更" isLast />
          </View>

        </View>

        {/* --- 更新ボタン --- */}
        <TouchableOpacity style={styles.updateButton} onPress={() => router.push('/')}>
          <Text style={styles.updateButtonText}>更新</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// リスト内の各項目を生成するための補助コンポーネント
function ListItem({ icon, text, isLast = false }: { icon: string, text: string, isLast?: boolean }) {
  return (
    <TouchableOpacity style={[styles.listItem, !isLast && styles.listItemBorder]}>
      <Text style={styles.listItemIcon}>{icon}</Text>
      <Text style={styles.listItemText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { padding: 16, paddingBottom: 40 },
  
  /* --- ヘッダー --- */
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  deleteButton: { backgroundColor: '#fee2e2', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  deleteButtonText: { color: '#ef4444', fontWeight: 'bold', fontSize: 14 },

  /* --- タイトル部分 --- */
  titleArea: { alignItems: 'center', marginVertical: 24 },
  subTitle: { fontSize: 14, color: '#64748b', marginBottom: 8 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e1b4b' },

  /* --- アクションリスト --- */
  actionList: { gap: 16 }, 
  highlightButton: { backgroundColor: '#f5f3ff', paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: '#ddd6fe', alignItems: 'center' },
  highlightButtonText: { color: '#7c3aed', fontWeight: 'bold', fontSize: 16 },

  /* リストグループ */
  listGroup: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', overflow: 'hidden' },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, backgroundColor: '#fff' },
  listItemBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  listItemIcon: { fontSize: 18, marginRight: 12 },
  listItemText: { fontSize: 16, color: '#333' },

  /* --- 更新ボタン --- */
  updateButton: { backgroundColor: '#7c3aed', paddingVertical: 16, borderRadius: 25, alignItems: 'center', marginTop: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 3 },
  updateButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 18 },
});