import { MaterialIcons } from "@expo/vector-icons";
import type { Task } from "@state/useTasks";
import { GRAY, WHITE } from "@theme/colors";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

interface Props {
  task: Task;
  onPress?: (e: GestureResponderEvent) => void;
  onDelete?: () => void;
}

export default function TaskCard({ task, onPress, onDelete }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* delete button */}
      {onDelete && (
        <Pressable
          hitSlop={12}
          style={styles.close}
          accessibilityLabel="Delete task"
          onPress={(e) => {
            e.stopPropagation(); // don’t trigger card’s onPress
            onDelete();
          }}
        >
          <MaterialIcons name="close" size={20} color={GRAY} />
        </Pressable>
      )}

      <Text style={styles.query}>{task.query}</Text>
      <Text style={styles.frequency}>{task.frequency}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  close: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  query: { fontSize: 16, color: GRAY, marginBottom: 4 },
  frequency: { fontSize: 14, color: "#9CA3AF" },
});
