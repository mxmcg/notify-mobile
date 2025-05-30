import { GRAY, WHITE } from "@theme/colors";
import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface Props extends Omit<PressableProps, "style"> {
  label: string;
}

export default function PrimaryButton({ label, ...rest }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
      {...rest}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    marginBottom: 32,
    backgroundColor: WHITE,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: GRAY,
  },
});
