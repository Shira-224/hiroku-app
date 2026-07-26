import { Link, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// ★ SQLiteを使うためのフックをインポート
import { useSQLiteContext } from 'expo-sqlite';

export default function HomeScreen() {
  const db = useSQLiteContext();
  
  // ★ SQLiteから取得したデータを保存するステート
  const [profiles, setProfiles] = useState<any[]>([]);
  
  // モーダル表示の管理と、「今どの人を選択しているか」のステート
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  // ★ データベースからプロフィール一覧を読み込む関数
  const loadProfiles = async () => {
    try {
      // 最新の登録が上に来るように降順(DESC)で取得
      const allRows = await db.getAllAsync('SELECT * FROM profiles ORDER BY id DESC');
      setProfiles(allRows);
    } catch (error) {
      console.log('データ取得エラー:', error);
    }
  };

  // ★ 画面が表示された時に一回だけデータを読み込む
  useEffect(() => {
    loadProfiles();
  }, []);

  // ⓘボタンを押したときの処理
  const openModal = (profile: any) => {
    setSelectedProfile(profile);
    setModalVisible(true);
  };

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
          
          {/* ★ profilesの配列の数だけ、カードを自動で繰り返し生成する */}
          {profiles.map((profile) => (
            <View style={styles.card} key={profile.id}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{profile.name}さん</Text>
                <TouchableOpacity onPress={() => openModal(profile)}>
                  <Text style={styles.infoIcon}>ⓘ</Text>
                </TouchableOpacity>
              </View>
              
              <Link href="/view" asChild>
                <TouchableOpacity style={styles.imagePlaceholder} />
              </Link>

              <View style={styles.cardFooter}>
                {/* ゆくゆくは edit.tsx に id を渡して、誰の編集画面か分かるようにします */}
                <Link href={`/edit?id=${profile.id}`} asChild>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>編集</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          ))}

          {/* ★ もしデータが0件の時に表示するメッセージ */}
          {profiles.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>まだ誰も登録されていません。{'\n'}右上の「新規」ボタンから追加してみましょう！</Text>
            </View>
          )}

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
              
              {/* ★ selectedProfile にデータが入っていれば表示する */}
              {selectedProfile && (
                <>
                  <Text style={styles.modalText}>名前: {selectedProfile.name}</Text>
                  <Text style={styles.modalText}>年齢: {selectedProfile.age || '未設定'}</Text>
                  <Text style={styles.modalText}>職業: {selectedProfile.job || '未設定'}</Text>
                  <Text style={styles.modalText}>性別: {selectedProfile.gender || '未設定'}</Text>
                  <Text style={styles.modalText}>関係: {selectedProfile.relationship || '未設定'}</Text>
                  
                  <View style={{ height: 10 }} />
                  <Text style={styles.modalText}>タグ: {selectedProfile.tags || 'なし'}</Text>
                </>
              )}

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
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', backgroundColor: '#fff' },
  headerSpacer: { width: 70 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#7c3aed' },
  newButton: { backgroundColor: '#7c3aed', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
  newButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 },

  /* ★ 変更：カードが3つ以上になった時に自動で折り返して(flexWrap)下に並ぶようにしました */
  mainContent: { padding: 12, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e1b4b' },
  infoIcon: { color: '#94a3b8', fontSize: 16, padding: 4 },
  imagePlaceholder: { width: '100%', aspectRatio: 1, backgroundColor: '#f1f5f9' },

  cardFooter: { padding: 8, borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#fff', alignItems: 'flex-start' },
  editButton: { paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 4, backgroundColor: '#f8fafc' },
  editButtonText: { fontSize: 12, color: '#333', fontWeight: 'bold' },

  emptyContainer: { width: '100%', paddingVertical: 40, alignItems: 'center' },
  emptyText: { color: '#64748b', fontSize: 16, textAlign: 'center', lineHeight: 24 },

  footer: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0', backgroundColor: '#fff' },
  aiButton: { backgroundColor: '#f5f3ff', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#ddd6fe' },
  aiButtonText: { color: '#7c3aed', fontWeight: 'bold', fontSize: 14 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 20, paddingHorizontal: 12, height: 44 },
  searchArrow: { color: '#94a3b8', marginRight: 8 },
  searchInput: { flex: 1, height: '100%', color: '#333' },
  searchSubmitButton: { marginLeft: 12, paddingVertical: 8 },
  searchSubmitText: { color: '#7c3aed', fontWeight: 'bold', fontSize: 15 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e1b4b', textAlign: 'center', marginBottom: 20 },
  modalText: { fontSize: 15, color: '#333', marginBottom: 8, lineHeight: 22 },
  closeButton: { marginTop: 20, backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  closeButtonText: { color: '#475569', fontWeight: 'bold', fontSize: 15 },
});