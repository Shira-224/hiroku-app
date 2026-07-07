import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        
        {/* --- ヘッダー --- */}
        <View style={styles.header}>
          <View style={styles.headerSpacer} />
          <Text style={styles.headerTitle}>ひろく</Text>
          <Link href="/new" asChild>
            <TouchableOpacity style={styles.newButton}>
              <Text style={styles.newButtonText}>新規</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* --- メインコンテンツ（カード部分） --- */}
        <ScrollView contentContainerStyle={styles.mainContent}>
          
          {/* 左のカード */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>〇〇さん</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.infoIcon}>ⓘ</Text>
              </TouchableOpacity>
            </View>
            
            <Link href="/view" asChild>
              <TouchableOpacity style={styles.imagePlaceholder} />
            </Link>

            {/* ★ 追加：画像の下の枠と編集ボタン */}
            <View style={styles.cardFooter}>
              {/* ゆくゆく作る edit.tsx へのリンクを設定 */}
              <Link href="/edit" asChild>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>編集</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* 右のカード */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>〇〇さん</Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.infoIcon}>ⓘ</Text>
              </TouchableOpacity>
            </View>
            
            <Link href="/view" asChild>
              <TouchableOpacity style={styles.imagePlaceholder} />
            </Link>

            {/* ★ 追加：画像の下の枠と編集ボタン */}
            <View style={styles.cardFooter}>
              <Link href="/edit" asChild>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>編集</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

        </ScrollView>

        {/* --- フッター部分 --- */}
        <View style={styles.footer}>
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

        {/* --- プロフィール確認用ポップアップ（モーダル） --- */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>基本プロフィール</Text>
              
              <Text style={styles.modalText}>名前: 横浜 市民</Text>
              <Text style={styles.modalText}>年齢: 不明</Text>
              <Text style={styles.modalText}>職業: 高校生</Text>
              <Text style={styles.modalText}>性別: 男</Text>
              <Text style={styles.modalText}>関係: リスナー</Text>
              
              <View style={{ height: 10 }} />
              <Text style={styles.modalText}>タグ: バスケ リスナー ギター 高校生 X</Text>

              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>閉じる</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  
  /* --- ヘッダー --- */
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', backgroundColor: '#fff' },
  headerSpacer: { width: 70 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#7c3aed' },
  newButton: { backgroundColor: '#7c3aed', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
  newButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },

  /* --- カード --- */
  mainContent: { padding: 12, flexDirection: 'row', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e1b4b' },
  infoIcon: { color: '#94a3b8', fontSize: 16, padding: 4 },
  imagePlaceholder: { width: '100%', aspectRatio: 1, backgroundColor: '#f1f5f9' },

  /* ★ 追加：画像の下に配置する枠と編集ボタンのデザイン */
  cardFooter: {
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
    alignItems: 'flex-start', // 左寄せ
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    backgroundColor: '#f8fafc',
  },
  editButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },

  /* --- フッター --- */
  footer: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#fff' },
  aiButton: { backgroundColor: '#f5f3ff', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#ddd6fe' },
  aiButtonText: { color: '#7c3aed', fontWeight: 'bold', fontSize: 14 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 20, paddingHorizontal: 12, height: 44 },
  searchArrow: { color: '#94a3b8', marginRight: 8 },
  searchInput: { flex: 1, height: '100%', color: '#333' },
  searchSubmitButton: { marginLeft: 12, paddingVertical: 8 },
  searchSubmitText: { color: '#7c3aed', fontWeight: 'bold', fontSize: 15 },

  /* --- モーダル --- */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e1b4b', textAlign: 'center', marginBottom: 20 },
  modalText: { fontSize: 15, color: '#333', marginBottom: 8, lineHeight: 22 },
  closeButton: { marginTop: 20, backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  closeButtonText: { color: '#475569', fontWeight: 'bold', fontSize: 15 },
});