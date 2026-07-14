import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';

export default function EditScreen() {
  const router = useRouter();

  // ★ 1. 各項目のデータを管理するステート（初期値）
  const [profile, setProfile] = useState({
    name: '〇〇 〇〇',
    age: '',
    gender: '',
    job: '',
    club: '',
    relationship: '',
    sns: '',
    hobbies: '',
    tags: ''
  });

  // ★ 2. モーダル（ポップアップ）の表示状態と、現在編集中の項目を管理
  const [modalVisible, setModalVisible] = useState(false);
  const [editTarget, setEditTarget] = useState({ key: '', label: '', value: '' });

  // ★ 3. 項目をタップした時にモーダルを開く処理
  const openEditModal = (key: string, label: string, currentValue: string) => {
    setEditTarget({ key, label, value: currentValue });
    setModalVisible(true);
  };

  // ★ 4. モーダル内の「保存」ボタンを押した時の処理
  const saveEditedValue = () => {
    setProfile({ ...profile, [editTarget.key]: editTarget.value });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* --- ヘッダー --- */}
      <View style={styles.header}>
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
          <Text style={styles.mainTitle}>{profile.name}さん</Text>
        </View>

        {/* --- アクションリスト --- */}
        <View style={styles.actionList}>
          
          <Link href="/talk" asChild>
            <TouchableOpacity style={styles.highlightButton}>
              <Text style={styles.highlightButtonText}>💬 会話内容を保存する</Text>
            </TouchableOpacity>
          </Link>

          {/* グループ1 */}
          <View style={styles.listGroup}>
            {/* 画像変更はカメラロールを開く処理が必要になるため、今回はダミーのままにしています */}
            <ListItem icon="🖼️" text="画像変更" />
            <ListItem icon="👤" text="名前変更" value={profile.name} onPress={() => openEditModal('name', '名前', profile.name)} />
            <ListItem icon="🎂" text="年齢" value={profile.age} onPress={() => openEditModal('age', '年齢', profile.age)} />
            <ListItem icon="🚻" text="性別" value={profile.gender} isLast onPress={() => openEditModal('gender', '性別', profile.gender)} />
          </View>

          {/* グループ2 */}
          <View style={styles.listGroup}>
            <ListItem icon="💼" text="職業" value={profile.job} onPress={() => openEditModal('job', '職業', profile.job)} />
            <ListItem icon="🏫" text="部活・バイト先" value={profile.club} onPress={() => openEditModal('club', '部活・職場', profile.club)} />
            <ListItem icon="🤝" text="関係" value={profile.relationship} onPress={() => openEditModal('relationship', '関係', profile.relationship)} />
            <ListItem icon="📱" text="SNS" value={profile.sns} isLast onPress={() => openEditModal('sns', 'SNS', profile.sns)} />
          </View>

          {/* グループ3 */}
          <View style={styles.listGroup}>
            <ListItem icon="🎨" text="趣味" value={profile.hobbies} onPress={() => openEditModal('hobbies', '趣味', profile.hobbies)} />
            <ListItem icon="🏷️" text="タグ変更" value={profile.tags} isLast onPress={() => openEditModal('tags', 'タグ', profile.tags)} />
          </View>

        </View>

        {/* --- 更新ボタン --- */}
        <TouchableOpacity style={styles.updateButton} onPress={() => router.push('/')}>
          <Text style={styles.updateButtonText}>更新</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ★ 5. 入力用モーダル（画面の前面に重なって表示される領域） */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editTarget.label}を編集</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* 性別の場合は選択肢ボタン、それ以外はテキスト入力にする分岐処理 */}
            {editTarget.key === 'gender' ? (
              <View style={styles.genderOptions}>
                {['男性', '女性', 'その他', '未回答'].map((g) => (
                  <TouchableOpacity 
                    key={g} 
                    style={[styles.genderButton, editTarget.value === g && styles.genderButtonActive]}
                    onPress={() => setEditTarget({ ...editTarget, value: g })}
                  >
                    <Text style={[styles.genderButtonText, editTarget.value === g && styles.genderButtonTextActive]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <TextInput
                style={styles.textInput}
                value={editTarget.value}
                onChangeText={(text) => setEditTarget({ ...editTarget, value: text })}
                placeholder={`${editTarget.label}を入力してください`}
                autoFocus={true}
                // 年齢の時は数字キーボードを出す
                keyboardType={editTarget.key === 'age' ? 'numeric' : 'default'}
              />
            )}

            <TouchableOpacity style={styles.modalSaveButton} onPress={saveEditedValue}>
              <Text style={styles.modalSaveButtonText}>決定</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// リスト内の各項目を生成するための補助コンポーネント（表示値とonPressを追加）
function ListItem({ icon, text, value, isLast = false, onPress }: { icon: string, text: string, value?: string, isLast?: boolean, onPress?: () => void }) {
  return (
    <TouchableOpacity style={[styles.listItem, !isLast && styles.listItemBorder]} onPress={onPress}>
      <View style={styles.listLeft}>
        <Text style={styles.listItemIcon}>{icon}</Text>
        <Text style={styles.listItemText}>{text}</Text>
      </View>
      {/* 入力済みの値があれば右側に表示する */}
      {value ? (
        <Text style={styles.listItemValue} numberOfLines={1}>{value}</Text>
      ) : (
        <Text style={styles.listArrow}>＞</Text>
      )}
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
  listItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 20, backgroundColor: '#fff' },
  listItemBorder: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  listLeft: { flexDirection: 'row', alignItems: 'center' },
  listItemIcon: { fontSize: 18, marginRight: 12 },
  listItemText: { fontSize: 16, color: '#333' },
  listItemValue: { fontSize: 16, color: '#3b82f6', maxWidth: '50%', textAlign: 'right' },
  listArrow: { fontSize: 16, color: '#cbd5e1' },

  /* --- 更新ボタン --- */
  updateButton: { backgroundColor: '#7c3aed', paddingVertical: 16, borderRadius: 25, alignItems: 'center', marginTop: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 3 },
  updateButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 18 },

  /* --- モーダル（入力ポップアップ） --- */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', borderRadius: 16, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e1b4b' },
  closeIcon: { fontSize: 20, color: '#94a3b8', padding: 4 },
  
  /* テキスト入力枠 */
  textInput: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 16, fontSize: 16, color: '#333', marginBottom: 24 },
  
  /* 性別選択ボタン */
  genderOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  genderButton: { flex: 1, minWidth: '45%', paddingVertical: 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, alignItems: 'center', backgroundColor: '#f8fafc' },
  genderButtonActive: { backgroundColor: '#f5f3ff', borderColor: '#7c3aed' },
  genderButtonText: { fontSize: 15, color: '#64748b' },
  genderButtonTextActive: { color: '#7c3aed', fontWeight: 'bold' },

  /* モーダル内の決定ボタン */
  modalSaveButton: { backgroundColor: '#10b981', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  modalSaveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});