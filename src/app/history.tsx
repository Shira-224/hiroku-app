import { useState } from 'react';
import { FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import BackButton from '../components/BackButton';

// 日本語設定
LocaleConfig.locales['jp'] = {
  monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
  dayNamesShort: ['日','月','火','水','木','金','土'],
  today: '今日'
};
LocaleConfig.defaultLocale = 'jp';

export default function HistoryScreen() {
  // カレンダーの現在の表示月を管理 (YYYY-MM-DD)
  const [currentMonth, setCurrentMonth] = useState('2026-06-01');
  // 年選択モーダルの表示管理
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);

  // ★ 過去に遡りやすいように、最新（2026年）から過去に向けて降順でリストを作成（例：2026〜2010年）
  const currentYear = 2026;
  const years = Array.from({ length: 17 }, (_, i) => currentYear - i);

  // 年を選択したときの処理
  const handleYearSelect = (year: number) => {
    const newDate = `${year}-01-01`; // 選んだ年の1月1日に設定
    setCurrentMonth(newDate);
    setIsYearModalVisible(false); // モーダルを閉じる
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* ヘッダー */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>トーク履歴</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.targetNameContainer}>
          <Text style={styles.targetNameText}>相手：〇〇 〇〇さん</Text>
        </View>

        <TouchableOpacity style={styles.genreButton}>
          <Text style={styles.genreButtonText}>🔍 トークジャンルで絞る</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>日付から探す</Text>
        <View style={styles.calendarCard}>
          <Calendar
            // ★【超重要】keyを追加！これが変わるとカレンダーが強制再描画されて指定の年にジャンプします
            key={currentMonth}
            current={currentMonth}
            onMonthChange={(month: any) => {
              setCurrentMonth(month.dateString);
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#64748b',
              selectedDayBackgroundColor: '#f1f5f9',
              selectedDayTextColor: '#1e1b4b',
              todayTextColor: '#1e1b4b',
              dayTextColor: '#333333',
              textDisabledColor: '#d1d5db',
              arrowColor: '#475569',
              monthTextColor: '#1e1b4b',
              textMonthFontWeight: 'bold',
            }}
            markedDates={{
              '2026-06-03': { marked: true, dotColor: '#3b82f6' },
              '2026-06-09': { marked: true, dotColor: '#3b82f6' },
              '2026-06-14': { selected: true },
              '2026-06-17': { marked: true, dotColor: '#3b82f6' },
            }}
          />
        </View>

        <Text style={styles.sectionTitle}>期間から探す</Text>
        <TouchableOpacity 
          style={styles.otherYearButton} 
          onPress={() => setIsYearModalVisible(true)}
        >
          <Text style={styles.otherYearText}>他の年を選択（過去に遡る）</Text>
          <Text style={styles.arrowIcon}>＞</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* 年選択用モーダル */}
      <Modal
        visible={isYearModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.yearPickerContainer}>
            <Text style={styles.yearPickerTitle}>表示する年を選択</Text>
            
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.yearItem} 
                  onPress={() => handleYearSelect(item)}
                >
                  <Text style={[
                    styles.yearItemText,
                    currentMonth.startsWith(item.toString()) && styles.selectedYearText
                  ]}>
                    {item}年
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setIsYearModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>キャンセル</Text>
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
  headerSpacer: { width: 60 },
  targetNameContainer: { marginBottom: 20 },
  targetNameText: { fontSize: 16, color: '#333' },
  genreButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, paddingVertical: 16, alignItems: 'center', marginBottom: 24, elevation: 1 },
  genreButtonText: { color: '#1d4ed8', fontWeight: 'bold', fontSize: 15 },
  sectionTitle: { fontSize: 14, color: '#64748b', fontWeight: 'bold', marginBottom: 12, marginLeft: 4 },
  calendarCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, overflow: 'hidden', paddingBottom: 10, marginBottom: 30, elevation: 2 },
  otherYearButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 16, elevation: 1 },
  otherYearText: { fontSize: 16, color: '#333' },
  arrowIcon: { fontSize: 16, color: '#94a3b8' },

  /* --- 年選択モーダル用スタイル --- */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  yearPickerContainer: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, height: '50%' },
  yearPickerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e1b4b', textAlign: 'center', marginBottom: 20 },
  yearItem: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', alignItems: 'center' },
  yearItemText: { fontSize: 18, color: '#333' },
  selectedYearText: { color: '#7c3aed', fontWeight: 'bold' },
  cancelButton: { marginTop: 15, paddingVertical: 15, alignItems: 'center', backgroundColor: '#f1f5f9', borderRadius: 12 },
  cancelButtonText: { fontSize: 16, fontWeight: 'bold', color: '#475569' },
});