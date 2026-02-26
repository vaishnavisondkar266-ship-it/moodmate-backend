import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Suggestion() {
  const router = useRouter();
  const { mood, sleep, streak } = useLocalSearchParams();

  const sleepNumber = parseInt(sleep as string);

  let riskLevel = "";
  let dynamicMessage = "";
  let suggestions: string[] = [];

  // 🧠 Sleep Classification
  if (sleepNumber <= 4) riskLevel = "critical";
  else if (sleepNumber <= 6) riskLevel = "low";
  else if (sleepNumber <= 8) riskLevel = "healthy";
  else riskLevel = "excellent";

  // 🧠 Combined Emotional Intelligence Logic

  if ((mood === "😢" || mood === "😡") && riskLevel === "critical") {
    dynamicMessage =
      "Your emotional and physical energy is critically low. Immediate recovery is important.";
    suggestions = [
      "🛌 Take proper rest tonight",
      "📴 Avoid screens before bed",
      "💬 Talk to someone supportive",
      "🧘 Try 10 minutes meditation",
      "🌿 Spend time in fresh air",
    ];
  } 
  else if (mood === "😢" && riskLevel === "low") {
    dynamicMessage =
      "You seem emotionally low and slightly sleep deprived.";
    suggestions = [
      "🎵 Listen to calming music",
      "📖 Write your thoughts in journal",
      "🚶 Take a peaceful walk",
      "💧 Stay hydrated",
    ];
  } 
  else if (mood === "😡") {
    dynamicMessage =
      "Anger detected. Emotional cooling techniques recommended.";
    suggestions = [
      "⏳ Pause before reacting",
      "💧 Drink cold water",
      "🏃 Do quick physical movement",
      "🧘 Deep breathing exercise",
    ];
  } 
  else if (mood === "😐") {
    dynamicMessage =
      "Your mood is neutral. Try boosting your motivation.";
    suggestions = [
      "🎯 Set one small goal today",
      "📚 Learn something new",
      "🎨 Do something creative",
    ];
  } 
  else {
    dynamicMessage =
      "You are doing great! Maintain your positive energy.";
    suggestions = [
      "🌟 Keep your routine consistent",
      "💪 Continue healthy habits",
      "🎉 Reward yourself today",
    ];
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🧠 Smart Wellness Analysis</Text>

      {streak === "sad" && (
        <Text style={styles.warning}>
          ⚠️ 3-Day Low Wellness Streak Detected
        </Text>
      )}

      <View style={styles.analysisBox}>
        <Text style={styles.analysisText}>{dynamicMessage}</Text>
      </View>

      {suggestions.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}

      <Pressable
        style={styles.button}
        onPress={() => router.push("/dashboard")}
      >
        <Text style={styles.btnText}>Back to Dashboard</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F6FB",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  warning: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  analysisBox: {
    backgroundColor: "#E6F4FE",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  analysisText: {
    fontSize: 16,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});