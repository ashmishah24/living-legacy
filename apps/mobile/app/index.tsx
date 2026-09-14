import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import type { CaptureKind } from "@living-legacy/core";

const logo = require("../assets/living-legacy-logo.png");
const choices: Array<{ kind: CaptureKind; label: string; description: string }> = [
  { kind: "voice", label: "Voice", description: "Record a memory in your own words." },
  { kind: "writing", label: "Writing", description: "Write a note, letter, or remembered detail." },
  { kind: "photo", label: "Photo", description: "Take or select a photo deliberately." },
  { kind: "video", label: "Video", description: "Record or choose a video when you decide." },
  { kind: "file", label: "File", description: "Preserve a document or original record." },
];

export default function CaptureHome() {
  const [kind, setKind] = useState<CaptureKind | null>(null);
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");
  const selected = choices.find((choice) => choice.kind === kind);

  const beginCapture = (nextKind: CaptureKind) => { setKind(nextKind); setNotice(""); };
  const preserve = () => {
    if (kind === "writing" && text.trim()) setNotice("Your writing source is ready to preserve after you sign in. It stays on this device until then.");
    else setNotice("Native private upload will open after sign-in and secure media storage are configured. Nothing has been uploaded.");
  };

  return <ScrollView contentContainerStyle={styles.page} style={styles.scroll}>
    <View style={styles.brandRow}><Image accessibilityLabel="Living Legacy — Your story lives on" source={logo} style={styles.logo} /><Text style={styles.brand}>LIVING LEGACY</Text></View>
    <Text style={styles.eyebrow}>YOUR STORY LIVES ON</Text><Text style={styles.title}>Keep the original moment close.</Text><Text style={styles.copy}>A private, enduring place to capture memories in the form they were first shared.</Text>
    {!kind ? <View style={styles.card}><Text style={styles.cardTitle}>What would you like to preserve?</Text><Text style={styles.helper}>Nothing is saved until you review a source and choose to preserve it.</Text>{choices.map((choice) => <Pressable accessibilityHint={`Begin a ${choice.label.toLowerCase()} source`} accessibilityRole="button" key={choice.kind} onPress={() => beginCapture(choice.kind)} style={styles.choice}><View><Text style={styles.choiceText}>{choice.label}</Text><Text style={styles.choiceCopy}>{choice.description}</Text></View><Text style={styles.arrow}>›</Text></Pressable>)}</View> : <View style={styles.card}><Pressable accessibilityRole="button" onPress={() => { setKind(null); setText(""); setNotice(""); }}><Text style={styles.back}>‹ Back to sources</Text></Pressable><Text style={styles.cardTitle}>New {selected?.label.toLowerCase()} source</Text><Text style={styles.helper}>Keep the original first.</Text>{kind === "writing" ? <TextInput accessibilityLabel="Your original words" multiline onChangeText={setText} placeholder="Write exactly what you want to preserve." placeholderTextColor="#9da996" style={styles.editor} value={text} /> : <View style={styles.pending}><Text style={styles.pendingTitle}>{selected?.label} capture</Text><Text style={styles.helper}>This screen is ready for the native recorder or picker. It will request camera, microphone, or library access only when you explicitly choose to continue.</Text></View>}<Pressable accessibilityRole="button" disabled={kind === "writing" && !text.trim()} onPress={preserve} style={({ pressed }) => [styles.preserve, pressed && styles.pressed, kind === "writing" && !text.trim() && styles.disabled]}><Text style={styles.preserveText}>Review before preserving</Text></Pressable>{notice ? <Text accessibilityLiveRegion="polite" style={styles.notice}>{notice}</Text> : null}</View>}
  </ScrollView>;
}

const styles = StyleSheet.create({
  scroll: { backgroundColor: "#05291e" }, page: { gap: 16, minHeight: "100%", padding: 24, paddingTop: 58 }, brandRow: { alignItems: "center", flexDirection: "row", gap: 10 }, logo: { borderColor: "#b98d3b", borderRadius: 28, borderWidth: 1, height: 56, width: 56 }, brand: { color: "#f2d88d", fontFamily: "serif", fontSize: 18, letterSpacing: 1.5 }, eyebrow: { color: "#e1b85a", fontSize: 12, fontWeight: "700", letterSpacing: 1.5, marginTop: 18 }, title: { color: "#f7ecd0", fontFamily: "serif", fontSize: 43, lineHeight: 46 }, copy: { color: "#d1c6ab", fontSize: 17, lineHeight: 25 }, card: { backgroundColor: "#103a2c", borderColor: "#5c805e", borderRadius: 22, borderWidth: 1, gap: 13, marginTop: 16, padding: 18 }, cardTitle: { color: "#f2d88d", fontFamily: "serif", fontSize: 25, marginTop: 3 }, helper: { color: "#d1c6ab", fontSize: 15, lineHeight: 22 }, choice: { alignItems: "center", backgroundColor: "#0a3326", borderColor: "#3d6c59", borderRadius: 14, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", padding: 15 }, choiceText: { color: "#f2d88d", fontFamily: "serif", fontSize: 20 }, choiceCopy: { color: "#d1c6ab", fontSize: 14, marginTop: 3, maxWidth: 245 }, arrow: { color: "#e1b85a", fontSize: 31 }, back: { color: "#f2d88d", fontWeight: "700" }, editor: { backgroundColor: "#0a3125", borderColor: "#3d6c59", borderRadius: 12, borderWidth: 1, color: "#f7ecd0", fontSize: 16, minHeight: 190, padding: 14, textAlignVertical: "top" }, pending: { backgroundColor: "#0a3125", borderColor: "#3d6c59", borderRadius: 12, borderWidth: 1, gap: 8, padding: 14 }, pendingTitle: { color: "#f2d88d", fontFamily: "serif", fontSize: 20 }, preserve: { alignItems: "center", backgroundColor: "#e1b85a", borderRadius: 12, marginTop: 6, padding: 14 }, preserveText: { color: "#173427", fontWeight: "800" }, pressed: { opacity: .8 }, disabled: { opacity: .45 }, notice: { backgroundColor: "#0a3125", borderColor: "#5c805e", borderRadius: 10, borderWidth: 1, color: "#f7ecd0", lineHeight: 21, padding: 12 },
});
