import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// ★ 新しく入れたカレンダーを読み込む
import { Calendar, LocaleConfig } from 'react-native-calendars';
import BackButton from '../components/BackButton';

// --- カレンダーの日本語化設定 ---
LocaleConfig.locales['jp'] = {
  monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
  dayNamesShort: ['日','月','火','水','木','金','土'],
  today: '今日'
};
LocaleConfig.defaultLocale = 'jp';

export default function TalkScreen() {
  const router = useRouter();

  // 日付の初期値を今日にする（YYYY-MM-DD形式で管理）
  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
  };
  
  const [date, setDate] = useState(getToday());
  // カレンダー（モーダル）を表示するかどうかの状態
  const [showCalendar, setShowCalendar] = useState(false);

  // 画面に表示する用のフォーマット（YYYY/MM/DD）
  const displayDate = date.replace(/-/g, '/');

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* --- ヘッダー --- */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>会話の記録</Text>
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
        
        {/* ★ 日付（ここをタップするとカレンダーが開く） */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>日付</Text>
          <TouchableOpacity 
            style={styles.dateInputBase} 
            activeOpacity={0.7}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={styles.dateInputText}>{displayDate}</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
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

      {/* ★ ここがカレンダーのポップアップ画面（Modal） */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              current={date}
              onDayPress={(day: any) => {
                setDate(day.dateString); // 日付をセットして
                setShowCalendar(false);  // カレンダーを閉じる
              }}
              theme={{
                todayTextColor: '#7c3aed',
                arrowColor: '#7c3aed',
                selectedDayBackgroundColor: '#7c3aed',
              }}
              markedDates={{
                [date]: { selected: true, selectedColor: '#7c3aed' }
              }}
            />
            {/* 閉じるボタン */}
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', backgroundColor: '#fff' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e1b4b' },
  companionButton: { backgroundColor: '#f1f5f9', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  companionButtonText: { color: '#475569', fontWeight: 'bold', fontSize: 13 },
  titleArea: { alignItems: 'center', marginVertical: 20, marginBottom: 30 },
  subTitle: { fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 8 },
  mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e1b4b' },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#1e1b4b', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, color: '#333' },
  textArea: { height: 140, textAlignVertical: 'top' },
  
  /* 日付入力ボタンのデザイン */
  dateInputBase: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: '#e2e8f0', 
    borderRadius: 8, 
    paddingHorizontal: 16, 
    paddingVertical: 14, 
    height: 52 
  },
  dateInputText: { fontSize: 16, color: '#333' },
  calendarIcon: { fontSize: 18 },

  submitButton: { backgroundColor: '#7c3aed', paddingVertical: 16, borderRadius: 25, alignItems: 'center', marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 3 },
  submitButtonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 18 },

  /* --- カレンダーモーダル用のスタイル --- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 背景を少し暗くする
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  calendarContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    overflow: 'hidden',
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#475569',
  }
});