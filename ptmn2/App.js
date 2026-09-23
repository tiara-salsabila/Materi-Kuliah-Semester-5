
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';


const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)
const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {LANGKAH 1: Import semua yang dibutuhkan
import React, { useState } from 'react';
import {
  View,               // 1. Container
  Text,               // 2. Teks
  Image,              // 3. Gambar
  ScrollView,         // 4. Scroll
  FlatList,           // 5. List efisien
  SectionList,        // 6. List berkelompok
  TextInput,          // 7. Input teks
  Button,             // 8. Tombol standar
  TouchableOpacity,   // 9. Tombol dengan opacity
  Pressable,          // 10. Tombol fleksibel
  Switch,             // 11. Toggle
  Modal,              // 12. Popup
  ActivityIndicator,  // 13. Loading
  StatusBar,          // 14. Status bar
  SafeAreaView,       // 15. Area aman
  StyleSheet,         // 16. Styling
  Alert,
  Platform,
} from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Halo, Dunia! 🌸</Text>
    </View>
  );
}
const go = (f, seed, acc) => {
  const res = f(seed)
  return res ? go(f, res[1], acc.concat([res[0]])) : acc
}
return go(f, seed, [])
}


const PROFILE = {
  name: 'Tiara Salsabila',
  title: 'Full-Stack Mobile Developer',
  email: 'tyrsalsabila@gmail.com',
  phone: '+62 888-8225-949',
  location: 'Cirebon, Jawa Barat, Indonesia',
  bio: 'Pengembang aplikasi mobile berpengalaman 4 tahun yang berfokus pada React Native dan Flutter.',
  avatar: 'https://accounts.google.com/SignOutOptions?hl=en&continue=https://myaccount.google.com/%3Futm_source%3Dchrome-profile-chooser%26pli%3D1&ec=GBRAwAE.jpg',
  avatarOffline: 'assets/avatar-offline.png'
};


const SKILLS = [
  { id: 1, name: 'React Native', level: 90, color: '#61dafb' },
  { id: 2, name: 'Flutter', level: 75, color: '#02569B' },
  { id: 3, name: 'JavaScript', level: 88, color: '#f7df1e' },
  { id: 4, name: 'TypeScript', level: 80, color: '#3178c6' },
  { id: 5, name: 'Node.js', level: 70, color: '#68a063' },
  { id: 6, name: 'Firebase', level: 82, color: '#ffca28' },
  {id: 7, name: 'Tailwind CSS', level: 95, color: '#38bdf8'},
];


const SECTIONS = [
  {
    title: '👜 Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Senior Mobile Developer',
        company: 'PT. Tech Solutions',
        period: 'Januari 2020 - Sekarang',
        desc: 'Mengembangkan dan memelihara aplikasi mobile menggunakan React Native dan Flutter',
    },
    {
      id: 'e2',
      role: 'Mobile Developer',
      company: 'Startup Fintech - PayEasy',
      period: '2020 - 2022',
      desc: 'Mengembangkan fitur pembayaran digital menggunakan React Native & Redux.},
    ],
  },
  {
    title: "🎓 Pendidikan",
  data: [
    {
      id: 'd1',
      role: 'S1 Informatika',
      company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
      period: '2024 - 2029',
      desc: 'IPK 3.72 / 4.00' | Skripsi: Implementasi Machine Learning pada Aplikasi Mobile.',
      },
    ],
  },
];


const SOCIAL = [
  {id: 's1', label: 'Github', icon: '🏅', url: 'LINK GITHUB YARAAAA' },
  {id: 's2', label: 'LinkedIn', icon: '💼', url: 'LINK LINKEDIN YARAAAA' },
  {id: 's3', label: 'Instagram', icon: '📸', url: 'LINK IGEH YARAAAA' }
];
  
  
const SkillCard = ({ item }) => (
  // 1. View → container kartu
  <View style={styles.skillCard}>
    {/* Baris atas: nama + persentase */}
    <View style={styles.skillHeader}>
      {/* 2. Text → nama skill */}
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}</Text>
    </View>

    {/* Progress bar: View berlapis */}
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          // width dinamis dari data, warna dari data
          { width: `${item.level}%`, backgroundColor: item.color }
        ]}
      />
    </View>
  </View>
)


const TimelineCard = ({ item, onPress }) => (
  // 9. TouchableOpacity → tekan untuk buka Modal
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}  // opacity saat ditekan (0-1)
  >
    {/* Titik bulat di sebelah kiri (dekorasi timeline) */}
    <View style={styles.timelineDot} />

    {/* Konten teks */}
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);


export default function App() {

  // — STATE
  // 11. Switch: apakah user "Open to Work"?
  const [openToWork, setOpenToWork] = useState(true);

  // 12. Modal: item yang dipilih & visibilitas modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // 7. TextInput: nilai input form kontak
  const [senderName, setSenderName] = useState('');
  const [message, setMessage]     = useState('');

  // 13. ActivityIndicator: status loading
  const [sending, setSending] = useState(false);

  // 10. Pressable: status sedang ditekan
  const [pressing, setPressing] = useState(false);

  // — HANDLER FUNCTIONS
  // Dipanggil saat kartu timeline ditekan
  const handleCardPress = (item) => {
    setSelectedItem(item);  // simpan item yang dipilih
    setModalVisible(true);  // tampilkan modal
  };

  // Dipanggil saat tombol "Kirim Pesan" ditekan
  const handleSend = () => {
    // Validasi input tidak boleh kosong
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true); // tampilkan ActivityIndicator

    // Simulasi delay 2 detik (misal: request ke server)
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim!`);
    }, 2000);
  };

  return (
    // JSX akan ditulis di langkah berikutnya
    <View><Text>Step 4 done ✅</Text></View>
  );
}


return (
  // 15. SafeAreaView → area aman dari notch & home bar
  <SafeAreaView style={styles.safeArea}>

    {/* 14. StatusBar → warna latar status bar & style teks ikon */}
    <StatusBar
      backgroundColor="#1a1a2e"  // warna latar (Android)
      barStyle="light-content"   // ikon putih (iOS & Android)
    />

    {/* — HEADER BAR — */}
    {/* 1. View → container header dengan flexDirection row */}
    <View style={styles.headerBar}>
      {/* 2. Text → judul header */}
      <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>

      {/* Toggle "Open to Work" */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>
          {openToWork ? '🟢 Open' : '🔴 Busy'}
        </Text>
        {/* 11. Switch → toggle on/off */}
        <Switch
          value={openToWork}              // nilai saat ini
          onValueChange={setOpenToWork}   // callback saat diubah
          trackColor={{ false: '#555', true: '#4ade80' }}
          thumbColor={openToWork ? '#fff' : '#aaa'}
        />
      </View>
    </View>

    {/* Konten akan ditambahkan di langkah berikutnya */}
    <View><Text style={{color:'#fff'}}>Step 5 done ✅</Text></View>

  </SafeAreaView>
);
















































  export default function App() {
  return (
    <View style={styles.container}>
      <Text>Nama Lengkap: Tiara Salsabila</Text>
      <Text>Tempat Tanggal Lahir: Cirebon, 17 Maret 2026</Text>
      <Text>Cita-Cita: Banyak Uang</Text>
      <Text>Rencana Hidup: Lulus kuliah dengan nilai maupun ipk yang memuaskan dan segera mendapatkan pekerjaan yang menyenangkan hidup</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
