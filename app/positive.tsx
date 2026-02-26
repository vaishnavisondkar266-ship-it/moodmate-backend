import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Positive() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 Great Job!</Text>
      <Text style={styles.text}>
        You are maintaining a healthy routine 😊
      </Text>

      <Pressable style={styles.button} onPress={() => router.push("/dashboard")}>
        <Text style={styles.btnText}>Go to Dashboard</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6FB",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});