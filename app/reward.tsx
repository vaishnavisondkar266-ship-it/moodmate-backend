import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Reward() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Congratulations!</Text>
      <Text style={styles.text}>
        You are on a 5-day positive wellness streak!
      </Text>

      <Pressable style={styles.button} onPress={() => router.push("/dashboard")}>
        <Text style={styles.btnText}>Back to Dashboard</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 20 },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});