import { Slot } from 'expo-router';
// アプリ全体のデザイン（Tailwindなど）を維持するためにこれだけ残します
import '../global.css';

export default function RootLayout() {
  // 余計な黒いバーなどは一切描画せず、 index.tsx の中身だけをそのまま出す魔法のコンポーネントです
  return <Slot />;
}