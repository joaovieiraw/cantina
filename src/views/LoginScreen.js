import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../context/AppContext";

export default function LoginScreen() {
  const { login } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cantina do Tio João</Text>
      <Text style={styles.subtitle}>Seu lanche, seu ticket, sem fila.</Text>

      <TouchableOpacity
        style={[styles.button, styles.btnStudent]}
        onPress={() => login("student")}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Entrar como Aluno</Text>
      </TouchableOpacity>

      <View style={{ height: 12 }} />

      <TouchableOpacity
        style={[styles.button, styles.btnAdmin]}
        onPress={() => login("admin")}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Entrar como ADM</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { marginTop: 6, marginBottom: 28, color: "#444", textAlign: "center" },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnStudent: { backgroundColor: "#2196F3" },
  btnAdmin: { backgroundColor: "#d32f2f" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  note: { marginTop: 18, color: "#666", fontSize: 12, textAlign: "center" },
});
