import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const { score } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Dashboard</Text>

      {/* ⭐ Wellness Score Display */}
      {score && (
        <View style={styles.scoreCard}>
          <Text style={styles.scoreText}>
            ⭐ Today's Wellness Score: {score}
          </Text>
        </View>
      )}

      <Pressable
        style={styles.button}
        onPress={() => router.push("/tracker")}
      >
        <Text style={styles.btnText}>➕ Add New Entry</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/history")}
      >
        <Text style={styles.btnText}>📜 View History</Text>
      </Pressable>

      <Pressable
        style={styles.logout}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.btnText}>🚪 Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F4F6FB",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  scoreCard: {
    backgroundColor: "#E6F4FE",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  logout: {
    backgroundColor: "#FF4B5C",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});