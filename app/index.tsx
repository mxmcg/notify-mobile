import FrequencyInput from "@components/FrequencyInput";
import PrimaryButton from "@components/PrimaryButton";
import TaskCard from "@components/TaskCard";
import TaskInput from "@components/TaskInput";
import { useTasks } from "@state/useTasks";
import { BG, GRAY } from "@theme/colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { tasks, add, remove } = useTasks();
  const [query, setQuery] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleAdd = () => {
    if (!query.trim() || !frequency.trim()) return;
    add({ query: query.trim(), frequency: frequency.trim() });
    setQuery("");
    setFrequency("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No tasks yet. Add one below!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onDelete={() => remove(item.id)}
              onPress={() =>
                router.push({ pathname: "task/[id]", params: { id: item.id } })
              }
            />
          )}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.formContainer}
      >
        <TaskInput value={query} onChangeText={setQuery} />
        <FrequencyInput value={frequency} onChangeText={setFrequency} />
        <PrimaryButton label="Save Task" onPress={handleAdd} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  list: { padding: 24, paddingBottom: 0 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: GRAY },
  formContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: BG,
  },
});
