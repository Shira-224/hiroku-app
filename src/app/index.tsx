import { Link, Stack } from 'expo-router'; // ★ Link を追加インポート
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Expo Starter関連のヘッダーを強制的に非表示にする設定 */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        
        {/* 2. カスタムヘッダー（紫主体・新規ボタン化） */}
        <View style={styles.header}>
          {/* 左上：三本線ボタン（とりあえず押せる） */}
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuIcon}>≡</Text>
          </TouchableOpacity>

          {/* 中央：タイトル */}
          <Text style={styles.headerTitle}>ひろく</Text>

          {/* 右上：新規ボタン（Linkで囲み、new.tsxへ遷移するように設定） */}
          <Link href="/new" asChild>
            <TouchableOpacity style={styles.newButton}>
              <Text style={styles.newButtonText}>新規</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* 3. メインコンテンツ（カード部分） */}
        <ScrollView contentContainerStyle={styles.mainContent}>
          
          {/* 左のカード */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>〇〇さん</Text>
              <Text style={styles.infoIcon}>ⓘ</Text>
            </View>
            {/* 正方形の画像プレースホルダー */}
            <View style={styles.imagePlaceholder} />
          </View>

          {/* 右のカード */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>〇〇さん</Text>
              <Text style={styles.infoIcon}>ⓘ</Text>
            </View>
            <View style={styles.imagePlaceholder} />
          </View>

        </ScrollView>

        {/* 4. フッター部分（紫をアクセントに） */}
        <View style={styles.footer}>
          {/* AI分析ボタン（紫主体） */}
          <TouchableOpacity style={styles.aiButton}>
            <Text style={styles.aiButtonText}>✨ AI分析</Text>
          </TouchableOpacity>
          
          <View style={styles.searchBox}>
            <Text style={styles.searchArrow}>↓</Text>
            <TextInput 
              style={styles.searchInput} 
              placeholder="名前を入力" 
              placeholderTextColor="#999"
            />
          </View>
          
          <TouchableOpacity style={styles.searchSubmitButton}>
            <Text style={styles.searchSubmitText}>検索</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  
  /* --- ヘッダーのデザイン --- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  menuButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  menuIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7c3aed', // タイトルも紫に
  },
  /* 新規ボタン：紫背景・白文字 */
  newButton: {
    backgroundColor: '#7c3aed', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 2, // 少し浮かせる（Android）
    shadowColor: '#000', // 少し浮かせる（iOS）
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  newButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  /* --- カードのデザイン --- */
  mainContent: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', 
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e1b4b',
  },
  infoIcon: {
    color: '#94a3b8',
    fontSize: 14,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1, // 正方形
    backgroundColor: '#f1f5f9',
  },

  /* --- フッターのデザイン --- */
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  aiButton: {
    backgroundColor: '#f5f3ff', // 薄い紫
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd6fe',
  },
  aiButtonText: {
    color: '#7c3aed', // 紫
    fontWeight: 'bold',
    fontSize: 14,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 44,
  },
  searchArrow: {
    color: '#94a3b8',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#333',
  },
  searchSubmitButton: {
    marginLeft: 12,
    paddingVertical: 8,
  },
  searchSubmitText: {
    color: '#7c3aed',
    fontWeight: 'bold',
    fontSize: 15,
  },
});