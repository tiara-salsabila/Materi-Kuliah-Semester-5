import React, { useEffect, useRef, useState } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import {
  View,
  Text,
  Image,
  Animated,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

const PROFILE = {
  name: 'Tiara Salsabila',
  title: 'Full-Stack Mobile Developer',
  email: 'tyrsalsabila@gmail.com',
  phone: '+62 888-8225-949',
  location: 'Cirebon, Jawa Barat, Indonesia',
  bio: 'Pengembang aplikasi mobile berpengalaman 4 tahun yang berfokus pada React Native dan Flutter.',
  avatarOnline: '',
  avatarOffline: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
};

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61dafb' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript', level: 88, color: '#f7df1e' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178c6' },
  { id: '5', name: 'Node.js', level: 70, color: '#68a063' },
  { id: '6', name: 'Firebase', level: 82, color: '#ffca28' },
  { id: '7', name: 'Tailwind CSS', level: 95, color: '#38bdf8' },
  { id: '8', name: 'Mobile App Development', level: 88, color: '#a855f7' },
  { id: '9', name: 'Git & GitHub', level: 85, color: '#14b8a6' },
  { id: '10', name: 'UI/UX Design', level: 78, color: '#ec4899' },
];

const SECTIONS = [
  {
    title: '👜 Pengalaman Kerja',
    data: [
      {
        id: 'f1',
        role: 'Senior Mobile Developer',
        company: 'PT. Tech Solutions',
        period: 'Januari 2020 - Sekarang',
        desc: 'Mengembangkan dan memelihara aplikasi mobile menggunakan React Native dan Flutter.',
      },
      {
        id: 'f2',
        role: 'Mobile Developer',
        company: 'Startup Fintech - PayEasy',
        period: '2020 - 2022',
        desc: 'Mengembangkan fitur pembayaran digital menggunakan React Native & Redux.',
      },
    ],
  },

 {
    title: '👩‍💻 Pengalaman Organisasi',
    data: [
      {
        id: 'e1',
        role: 'Sekretaris Umum 1',
        company: 'Himpunan Mahasiswa Informatika (HIMAFOR)',
        period: '2026 - 2027',
        desc: 'Mengelola administrasi dan koordinasi manajemen internal organisasi.',
      },
    ],
  },

  {
    title: '🎓 Pendidikan',
    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - 2029',
        desc: 'IPK 3.90 / 4.00 | Skripsi: Implementasi Machine Learning pada Aplikasi Mobile.',
      },
       {
        id: 'd2',
        role: 'MIPA',
        company: 'SMA Negeri 1 Losari',
        period: '2021 - 2024',
        desc: 'Aktif mengikuti kegiatan non akademik dan berbagai kegiatan pengembangan diri di sekolah.',
      },
    ],
  },
];

const SOCIAL = [
  { id: 's1', label: 'Github', icon: '🏅', url: 'https://github.com/tiara-salsabila/' },
  { id: 's2', label: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/tiara-salsabila-06000a43a/' },
  { id: 's3', label: 'Instagram', icon: '📸', url: 'https://www.instagram.com/trasals/' },
];

// ── SUB-COMPONENTS ──────────────────────────────
const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          { width: `${item.level}%`, backgroundColor: item.color },
        ]}
      />
    </View>
  </View>
);

const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}
  >
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
    </View>
  </TouchableOpacity>
);

// ── MAIN APP COMPONENT ──────────────────────────
export default function App() {
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [pressing, setPressing] = useState(false);
  const [avatarUri, setAvatarUri] = useState(PROFILE.avatarOnline || PROFILE.avatarOffline);
  const [activeTab, setActiveTab] = useState('Info');
  const avatarAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarAnimation, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(avatarAnimation, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ]),
    ).start();
  }, [avatarAnimation]);

  const avatarAnimatedStyle = {
    opacity: avatarAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.78, 1] }),
    transform: [{ scale: avatarAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) }],
  };

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      Alert.alert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      Alert.alert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim!`);
    }, 2000);
  };

  const handleSocialPress = async (url) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Link tidak dapat dibuka', 'Pastikan browser atau aplikasi terkait tersedia.');
    }
  };

  const handleDownload = async () => {
    setPressing(true);

    try {
      const html = `
        <html>
          <body style="font-family: Arial; padding: 32px; color: #1a1a2e;">
            <h1>${PROFILE.name}</h1>
            <h2>${PROFILE.title}</h2>
            <p>${PROFILE.bio}</p>
            <p>${PROFILE.email} | ${PROFILE.phone} | ${PROFILE.location}</p>
            <hr />
            <h2>Keahlian</h2>
            <p>${SKILLS.map((skill) => `${skill.name} (${skill.level}%)`).join(' - ')}</p>
            <h2>Pengalaman, Organisasi, dan Pendidikan</h2>
            ${SECTIONS.flatMap((section) => section.data.map((item) => `<h3>${item.role}</h3><p>${item.company}<br />${item.period}<br />${item.desc}</p>`)).join('')}
          </body>
        </html>
      `;

      if (Platform.OS === 'web') {
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'CV-Tiara-Salsabila.html';
        link.click();
        URL.revokeObjectURL(url);
        return;
      }

      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Simpan CV Tiara Salsabila',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('PDF berhasil dibuat', 'Menu simpan/bagikan tidak tersedia di perangkat ini.');
      }
    } catch {
      Alert.alert('Download gagal', 'CV belum berhasil dibuat. Coba lagi.');
    } finally {
      setPressing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a1a2e" barStyle="light-content" />

      {/* HEADER BAR */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: '#555', true: '#4ade80' }}
            thumbColor={openToWork ? '#fff' : '#aaa'}
          />
        </View>
      </View>

      <View style={styles.tabBar}>
        {['Info', 'Skills', 'Kontak'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* SECTION PROFIL */}
        {activeTab === 'Info' && (
        <>
        <View style={styles.profileSection}>
          <Animated.Image
            source={{ uri: avatarUri }}
            style={[styles.avatar, avatarAnimatedStyle]}
            onError={() => setAvatarUri(PROFILE.avatarOffline)}
          />

          {openToWork && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✅ Open to Work</Text>
            </View>
          )}

          <Text style={styles.profileName}>{PROFILE.name}</Text>
          <Text style={styles.profileTitle}>{PROFILE.title}</Text>
          <Text style={styles.profileBio}>{PROFILE.bio}</Text>

          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
            <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
          </View>
          <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>

          <View style={styles.socialRow}>
            {SOCIAL.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.socialBtn}
                onPress={() => handleSocialPress(s.url)}
                activeOpacity={0.8}
              >
                <Text style={styles.socialIcon}>{s.icon}</Text>
                <Text style={styles.socialLabel}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.downloadBtn,
              pressed && styles.downloadBtnPressed,
            ]}
            onPressIn={() => setPressing(true)}
            onPressOut={() => setPressing(false)}
            onPress={handleDownload}
          >
            <Text style={styles.downloadBtnText}>
              {pressing ? '⏳ Mengunduh...' : '📥 Download CV (PDF)'}
            </Text>
          </Pressable>
        </View>

        </>
        )}

        {/* SECTION KEAHLIAN */}
        {activeTab === 'Skills' && <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>🛠️ Keahlian</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ FlatList: menampilkan list data secara efisien
          </Text>
          <FlatList
            data={SKILLS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SkillCard item={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </View>}

        {/* SECTION RIWAYAT */}
        {activeTab === 'Info' && (
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>📜 Riwayat</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
          </Text>
          <SectionList
            sections={SECTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TimelineCard item={item} onPress={handleCardPress} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{title}</Text>
              </View>
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
        )}

        {/* SECTION HUBUNGI SAYA */}
        {activeTab === 'Kontak' && (
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>✉️ Hubungi Saya</Text>
          <Text style={styles.sectionSubtitle}>
            ↳ TextInput, Button, ActivityIndicator
          </Text>

          <TextInput
            style={styles.textInput}
            placeholder="Nama Anda"
            placeholderTextColor="#888"
            value={senderName}
            onChangeText={setSenderName}
            returnKeyType="next"
            editable={!sending}
          />

          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Tulis pesan Anda di sini..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={!sending}
          />

          {sending ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="large" color="#7c3aed" />
              <Text style={styles.loadingText}>Mengirim pesan...</Text>
            </View>
          ) : (
            <Button
              title="✉️ Kirim Pesan"
              color="#7c3aed"
              onPress={handleSend}
            />
          )}
        </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL DETAIL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>❌ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ── STYLESHEET ──────────────────────────────────
const COLORS = {
  bg: '#0f0f1a',
  card: '#1a1a2e',
  cardBorder: '#2d2d44',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',
  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  success: '#4ade80',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    paddingHorizontal: 12,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: COLORS.accent,
  },
  tabText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.accentLight,
  },
  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between', // Diperbaiki dari horijustifyContent
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },
  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
  },
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
  timelinePeriod: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint: { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod: { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc: { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },
});