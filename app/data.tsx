import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Data() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stored Data</Text>

      <Pressable style={styles.button} onPress={() => router.push("/suggestion")}>
        <Text style={styles.btnText}>Check Suggestions</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:"center", alignItems:"center" },
  title:{ fontSize:22, marginBottom:20 },
  button:{ backgroundColor:"#6C63FF", padding:15, borderRadius:8 },
  btnText:{ color:"#fff", fontWeight:"bold" }
});