import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Tracker() {
  const router = useRouter();

  const [selectedMood, setSelectedMood] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [journal, setJournal] = useState("");

    const BASE_URL = "http://192.168.1.12:5000";

  const saveData = async () => {
    try {
      if (!selectedMood || !sleepHours || !journal) {
        Alert.alert("Error", "Please fill all fields");
        return;
      }

      const sleepNumber = parseInt(sleepHours);

      if (isNaN(sleepNumber)) {
        Alert.alert("Error", "Sleep must be a number");
        return;
      }

      // ✅ 1️⃣ Save entry
      const response = await fetch(`${BASE_URL}/api/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selectedMood,
          sleep: sleepNumber,
          journal: journal,
        }),
      });

      if (!response.ok) {
        Alert.alert("Error", "Failed to save data");
        return;
      }

      // ✅ 2️⃣ Fetch all entries
      const res2 = await fetch(`${BASE_URL}/api/entries`);
      const allEntries = await res2.json();

      // Sort newest first
      const sorted = allEntries.sort(
        (a: any, b: any) => b.id - a.id
      );

      const lastThree = sorted.slice(0, 3);
      const lastFive = sorted.slice(0, 5);

      // -----------------------
      // 🔴 3-DAY SAD STREAK
      // -----------------------
      let sadStreak = true;

      if (lastThree.length < 3) {
        sadStreak = false;
      } else {
        lastThree.forEach((entry: any) => {
          if (
            !(
              (entry.mood === "😢" || entry.mood === "😡") &&
              parseInt(entry.sleep) < 7
            )
          ) {
            sadStreak = false;
          }
        });
      }

      // -----------------------
      // 🟢 5-DAY POSITIVE STREAK
      // -----------------------
      let positiveStreak = true;

      if (lastFive.length < 5) {
        positiveStreak = false;
      } else {
        lastFive.forEach((entry: any) => {
          if (
            !(
              (entry.mood === "😄" || entry.mood === "🙂") &&
              parseInt(entry.sleep) >= 7
            )
          ) {
            positiveStreak = false;
          }
        });
      }

      // -----------------------
      // ⭐ WELLNESS SCORE
      // -----------------------
      let score = 0;

      if (selectedMood === "😄") score += 3;
      if (selectedMood === "🙂") score += 2;
      if (selectedMood === "😐") score += 1;
      if (selectedMood === "😢") score -= 2;
      if (selectedMood === "😡") score -= 3;

      if (sleepNumber >= 7) score += 2;

      resetForm();

      // -----------------------
      // 🚦 Navigation Logic
      // -----------------------
      if (sadStreak) {
        router.push({
          pathname: "/suggestion",
          params: {
            mood: selectedMood,
            sleep: sleepNumber.toString(),
            streak: "sad",
          },
        });
      } else if (positiveStreak) {
        router.push("/reward");
      } else {
        router.push({
          pathname: "/dashboard",
          params: { score: score.toString() },
        });
      }

    } catch (error) {
      console.log("Save error:", error);
      Alert.alert("Network Error", "Check server connection ❌");
    }
  };

  const resetForm = () => {
    setSelectedMood("");
    setSleepHours("");
    setJournal("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Daily Mood Tracker</Text>

        <Text style={styles.label}>How are you feeling today?</Text>

        <View style={styles.moodContainer}>
          {["😄", "🙂", "😐", "😢", "😡"].map((mood) => (
            <Pressable
              key={mood}
              style={[
                styles.moodButton,
                selectedMood === mood && styles.selectedMood,
              ]}
              onPress={() => setSelectedMood(mood)}
            >
              <Text style={styles.moodText}>{mood}</Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          placeholder="Hours of Sleep"
          keyboardType="numeric"
          style={styles.input}
          value={sleepHours}
          onChangeText={setSleepHours}
        />

        <TextInput
          placeholder="Write your journal..."
          style={styles.input}
          multiline
          value={journal}
          onChangeText={setJournal}
        />

        <Pressable style={styles.button} onPress={saveData}>
          <Text style={styles.btnText}>Save Entry</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginBottom: 10,
    fontWeight: "600",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  moodButton: {
    padding: 10,
    borderRadius: 10,
  },
  selectedMood: {
    backgroundColor: "#E0E0FF",
  },
  moodText: {
    fontSize: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});