import { Slot } from 'expo-router';
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
// ★ アプリ全体にスタイルを当てる超重要な一行（残します！）
import '../global.css';

// ★ アプリ起動時に実行される「テーブル作成」の関数
async function initializeDatabase(db: SQLiteDatabase) {
  // 1. プロフィール用のテーブル（profiles）を作成
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age TEXT,
      gender TEXT,
      job TEXT,
      club TEXT,
      relationship TEXT,
      sns TEXT,
      hobbies TEXT,
      tags TEXT
    );
  `);

  // 2. トーク履歴用のテーブル（talk_history）を作成
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS talk_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      profile_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      genre TEXT,
      content TEXT,
      FOREIGN KEY (profile_id) REFERENCES profiles (id) ON DELETE CASCADE
    );
  `);
  
  console.log('データベースの初期化が完了しました！');
}

export default function RootLayout() {
  return (
    // ★ SQLiteProvider で全体を包みつつ、中は元のまま <Slot /> を使います
    <SQLiteProvider databaseName="myapp.db" onInit={initializeDatabase}>
      <Slot />
    </SQLiteProvider>
  );
}