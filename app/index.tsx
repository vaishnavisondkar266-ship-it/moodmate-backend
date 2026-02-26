import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🧠</Text>
      <Text style={styles.title}>MoodMate</Text>
      <Text style={styles.subtitle}>
        Track your mood. Improve your mind.
      </Text>

      <Pressable style={styles.button} onPress={() => router.push("/admin")}>
        <Text style={styles.btnText}>Admin Login</Text>
      </Pressable>

      <Pressable style={styles.outlineButton} onPress={() => router.push("/user")}>
        <Text style={styles.outlineText}>User Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    width: "100%",
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: "#6C63FF",
    padding: 15,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  outlineText: {
    color: "#6C63FF",
    fontWeight: "bold",
    fontSize: 16,
  },
});