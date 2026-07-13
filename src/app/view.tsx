import { useState } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// ★ expo-routerのLinkコンポーネントを追加
import { Link } from 'expo-router';
// ★ 作成した共通コンポーネントを読み込む
import BackButton from '../components/BackButton';

export default function ViewScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* --- ヘッダー --- */}
        <View style={styles.header}>
          {/* ★ コンポーネントを呼び出す */}
          <BackButton />
          
          <Text style={styles.headerTitle}>相手：〇〇 〇〇さん</Text>
          
          {/* タイトル中央揃えのためのダミースペース */}
          <View style={styles.headerSpacer} />
        </View>

        {/* --- メインコンテンツ --- */}
        <View style={styles.mainContent}>
          
          {/* 大きな画像エリア */}
          <View style={styles.mainImageArea}>
            <Text style={styles.imagePlaceholderText}>画像</Text>
          </View>

          {/* アクションボタン（左右に並べる） */}
          <View style={styles.actionButtons}>
            {/* プロフィールを見るボタン（モーダルを開く） */}
            <TouchableOpacity 
              style={styles.viewButton} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.viewButtonText}>プロフィールを見る</Text>
            </TouchableOpacity>
            
            {/* ★ トーク履歴を見るボタン（Linkを使ってhistory.tsxへ遷移） */}
            <Link href="/history" asChild>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>トーク履歴を見る</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
        </View>

        {/* --- 詳細プロフィール用ポップアップ（モーダル） --- */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>詳細プロフィール</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIconWrapper}>
                  <Text style={styles.closeIcon}>×</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalBody}>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>名前:</Text> 横浜 市民</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>年齢:</Text> 不明</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>職業:</Text> 高校生</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>趣味:</Text> ギター</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>性別:</Text> 男</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>SNS:</Text> X @〇〇 / insta @〇〇</Text>
                <Text style={styles.infoText}><Text style={styles.infoLabel}>関係:</Text> リスナー</Text>
                
                <View style={styles.tagSection}>
                  <Text style={styles.tagHeader}>タグ</Text>
                  <Text style={styles.tagText}>バスケ リスナー ギター 高校生 X</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
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
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e1b4b' },
  headerSpacer: { width: 60 },
  
  /* --- メインコンテンツ --- */
  mainContent: { flex: 1, alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
  mainImageArea: { width: '80%', aspectRatio: 1, backgroundColor: '#e2e8f0', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  imagePlaceholderText: { color: '#94a3b8', fontSize: 16 },
  
  /* --- アクションボタン --- */
  actionButtons: { flexDirection: 'row', justifyContent: 'center', gap: 16, width: '100%' },
  viewButton: { flex: 1, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 14, borderRadius: 8, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  viewButtonText: { color: '#1e1b4b', fontWeight: 'bold', fontSize: 14 },
  
  /* --- モーダル --- */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '100%', backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#7c3aed' },
  closeIconWrapper: { padding: 4 },
  closeIcon: { fontSize: 24, color: '#94a3b8' },
  modalBody: { marginBottom: 10 },
  infoText: { fontSize: 15, color: '#333', marginBottom: 10, lineHeight: 22 },
  infoLabel: { fontWeight: 'bold', color: '#1e1b4b' },
  tagSection: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  tagHeader: { fontSize: 16, fontWeight: 'bold', color: '#1e1b4b', marginBottom: 8 },
  tagText: { fontSize: 15, color: '#3b82f6' },
  closeButton: { marginTop: 20, backgroundColor: '#f1f5f9', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  closeButtonText: { color: '#475569', fontWeight: 'bold', fontSize: 15 },
});