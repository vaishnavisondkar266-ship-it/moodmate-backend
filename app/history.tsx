import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function History() {
  const [entries, setEntries] = useState([]);

  const BASE_URL = "http://192.168.1.12:5000";

  useEffect(() => {
    fetch(`${BASE_URL}/api/entries`)
      .then((res) => res.json())
      .then((data) => setEntries(data));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📜 Your History</Text>

      {entries.map((entry: any, index) => (
        <View key={index} style={styles.card}>
          <Text>Mood: {entry.mood}</Text>
          <Text>Sleep: {entry.sleep} hrs</Text>
          <Text>Journal: {entry.journal}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
});