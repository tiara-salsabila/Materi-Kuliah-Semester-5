import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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
