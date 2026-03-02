import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { AppContext } from "../context/AppContext";
import { getStudents, getTickets } from "../services/api";


 
export default function AdminHome() {
  const { logout } = useContext(AppContext);

  const [students, setStudents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const counters = useMemo(
    () => ({ students: students.length, tickets: tickets.length }),
    [students, tickets]
  );

  const loadAll = async () => {
    setLoading(true);
    const [s, t] = await Promise.all([getStudents(), getTickets()]);
    setStudents(Array.isArray(s) ? s : []);
    setTickets(Array.isArray(t) ? t : []);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cantina do Tio João</Text>
      <Text style={styles.subtitle}>Área do Administrador</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.smallBtn, styles.refresh]} onPress={loadAll}>
          <Text style={styles.smallBtnText}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.smallBtn, styles.logout]} onPress={logout}>
          <Text style={styles.smallBtnText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <Text style={styles.statsText}>Alunos: {counters.students}</Text>
        <Text style={styles.statsText}>Tickets: {counters.tickets}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <>
          <Text style={styles.section}>Lista de Alunos</Text>

          <FlatList
            data={students}
            keyExtractor={(item, idx) => String(item?.id ?? idx)}
            contentContainerStyle={{ paddingBottom: 16 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item?.name ?? "Sem nome"}</Text>
                <Text style={styles.cardText}>Matrícula: {item?.registration ?? "---"}</Text>
                <Text style={styles.cardText}>Email: {item?.email ?? "---"}</Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ marginTop: 16, color: "#666" }}>
          
              </Text>
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFEBEE", paddingTop: 56, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#B71C1C" },
  subtitle: { marginTop: 6, marginBottom: 10, color: "#C62828" },
  row: { flexDirection: "row", gap: 10, marginBottom: 10 },
  smallBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center" },
  refresh: { backgroundColor: "#D32F2F" },
  logout: { backgroundColor: "#455A64" },
  smallBtnText: { color: "#fff", fontWeight: "bold" },
  stats: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  statsText: { color: "#B71C1C", fontWeight: "bold" },
  section: { marginTop: 6, marginBottom: 6, fontWeight: "bold", color: "#880E4F" },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 14, marginBottom: 10 },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  cardText: { marginTop: 2, color: "#333" },
});
