import FrequencyInput from "@components/FrequencyInput";
import PrimaryButton from "@components/PrimaryButton";
import TaskInput from "@components/TaskInput";
import { useTasks } from "@state/useTasks";
import { BG } from "@theme/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export default function TaskDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tasks, update, remove } = useTasks();
  const task = tasks.find((t) => t.id === id);

  const [query, setQuery] = useState("");
  const [frequency, setFrequency] = useState("");

  useEffect(() => {
    if (task) {
      setQuery(task.query);
      setFrequency(task.frequency);
    }
  }, [task]);

  if (!task) {
    // if task was deleted, just pop back
    router.back();
    return null;
  }

  const handleSave = () => {
    update({ ...task, query: query.trim(), frequency: frequency.trim() });
    router.back();
  };

  const handleDelete = () => {
    remove(task.id);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.content}
      >
        <TaskInput value={query} onChangeText={setQuery} />
        <FrequencyInput value={frequency} onChangeText={setFrequency} />

        <View style={styles.buttons}>
          <PrimaryButton label="Save Changes" onPress={handleSave} />
          <PrimaryButton label="Delete Task" onPress={handleDelete} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  buttons: { marginTop: 24 },
});
