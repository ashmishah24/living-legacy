import { Pressable, StyleSheet, Text, View } from "react-native";
import type { CaptureKind } from "@living-legacy/core";

const choices: Array<{ kind: CaptureKind; label: string }> = [
  { kind: "voice", label: "Voice" }, { kind: "writing", label: "Writing" }, { kind: "photo", label: "Photo" }, { kind: "video", label: "Video" }, { kind: "file", label: "File" },
];

export default function CaptureHome() {
  const beginCapture = (kind: CaptureKind) => {
    // The platform-specific recorder/picker is added after consent text, storage, and upload endpoints are configured.
    console.info(`Capture requested: ${kind}`);
  };

  return <View style={styles.page}><Text style={styles.eyebrow}>PRIVATE FAMILY ARCHIVE</Text><Text style={styles.title}>Keep the original moment close.</Text><Text style={styles.copy}>Choose a source deliberately. Nothing is captured or uploaded until you continue.</Text><View style={styles.card}><Text style={styles.cardTitle}>What would you like to preserve?</Text>{choices.map((choice) => <Pressable accessibilityHint={`Begin a ${choice.label.toLowerCase()} source`} accessibilityRole="button" key={choice.kind} onPress={() => beginCapture(choice.kind)} style={styles.choice}><Text style={styles.choiceText}>{choice.label}</Text><Text style={styles.arrow}>›</Text></Pressable>)}</View></View>;
}

const styles = StyleSheet.create({
  page: { backgroundColor: "#eff6fa", flex: 1, gap: 18, padding: 24, paddingTop: 68 },
  eyebrow: { color: "#355f76", fontSize: 12, fontWeight: "700", letterSpacing: 1.5 },
  title: { color: "#263746", fontFamily: "serif", fontSize: 43, lineHeight: 46 },
  copy: { color: "#5d6d79", fontSize: 17, lineHeight: 25 },
  card: { backgroundColor: "white", borderColor: "#d6e3ea", borderRadius: 22, borderWidth: 1, gap: 10, marginTop: 16, padding: 18 },
  cardTitle: { color: "#263746", fontFamily: "serif", fontSize: 25, marginBottom: 6 },
  choice: { alignItems: "center", borderColor: "#d6e3ea", borderRadius: 12, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", minHeight: 55, paddingHorizontal: 15 },
  choiceText: { color: "#263746", fontSize: 17, fontWeight: "600" }, arrow: { color: "#355f76", fontSize: 28 },
});
