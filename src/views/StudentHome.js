import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { AppContext } from "../context/AppContext";
import { getTickets } from "../services/api";



export default function StudentHome() {
  const { logout } = useContext(AppContext);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const total = useMemo(() => tickets.length, [tickets]);

  const loadTickets = async () => {
    setLoading(true);
    const t = await getTickets();
    setTickets(Array.isArray(t) ? t : []);
    setLoading(false);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cantina do Tio João</Text>
      <Text style={styles.subtitle}>Área do Aluno</Text>

      <View style={styles.row}>
        <TouchableOpacity style={[styles.smallBtn, styles.refresh]} onPress={loadTickets}>
          <Text style={styles.smallBtnText}>Atualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.smallBtn, styles.logout]} onPress={logout}>
          <Text style={styles.smallBtnText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.counter}>Meus Tickets (lista do servidor): {total}</Text>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={tickets}
          keyExtractor={(item, idx) => String(item?.id ?? idx)}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => {
            const status = (item?.status || "PENDENTE").toUpperCase();
            return (
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Ticket #{item?.id ?? "-"}</Text>
                  <Text style={[styles.badge, status === "USADO" ? styles.badgeUsed : styles.badgeOk]}>
                    {status}
                  </Text>
                </View>

                <Text style={styles.cardText}>Aluno: {item?.student_name ?? item?.student ?? "---"}</Text>
                <Text style={styles.cardText}>Data: {item?.date ?? item?.created_at ?? "---"}</Text>
              </View>
            );
          }}
          ListEmptyComponent={
            <Text style={{ marginTop: 16, color: "#666" }}>
      
            </Text>
          }
        />
      )}

      <TouchableOpacity
        style={styles.bigBtn}

        activeOpacity={0.85}
      >
        <Text style={styles.bigBtnText}>Pegar Ticket do Dia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E3F2FD", paddingTop: 56, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#0D47A1" },
  subtitle: { marginTop: 6, marginBottom: 10, color: "#1565C0" },
  row: { flexDirection: "row", gap: 10, marginBottom: 10 },
  smallBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: "center" },
  refresh: { backgroundColor: "#1976D2" },
  logout: { backgroundColor: "#455A64" },
  smallBtnText: { color: "#fff", fontWeight: "bold" },
  counter: { marginBottom: 8, color: "#0D47A1" },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 14, marginBottom: 10 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontWeight: "bold", fontSize: 16 },
  cardText: { marginTop: 2, color: "#333" },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, color: "#fff", overflow: "hidden" },
  badgeOk: { backgroundColor: "#2E7D32" },
  badgeUsed: { backgroundColor: "#C62828" },
  bigBtn: { backgroundColor: "#0D47A1", padding: 14, borderRadius: 12, alignItems: "center", marginVertical: 14 },
  bigBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
