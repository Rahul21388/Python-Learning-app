import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { QuizQuestion } from "@/src/data/types";
import { useProgressStore } from "@/src/store/progressStore";
import { radius, spacing } from "@/src/theme/colors";
import { useTheme } from "@/src/theme/useTheme";

interface Props {
  questions: QuizQuestion[];
  lessonId: string;
}

export function QuizEngine({ questions, lessonId }: Props) {
  const { colors } = useTheme();
  const setQuizScore = useProgressStore((s) => s.setQuizScore);
  const savedScore = useProgressStore((s) => s.quizScores[lessonId]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  const onSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    const ok = i === q.answer;
    if (ok) setCorrect((c) => c + 1);
    Haptics.notificationAsync(
      ok
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    );
  };

  const onNext = () => {
    if (isLast) {
      const score = Math.round((correct / questions.length) * 100);
      // Update local UI state first so a store re-render can't race the result view.
      setFinalScore(score);
      setFinished(true);
      setQuizScore(lessonId, score);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrect(0);
    setFinished(false);
    setFinalScore(0);
  };

  if (finished) {
    const score = finalScore;
    const pass = score >= 60;
    return (
      <View
        testID="quiz-result"
        style={[styles.result, { backgroundColor: colors.surfaceSecondary }]}
      >
        <View
          style={[
            styles.resultIcon,
            { backgroundColor: pass ? colors.success : colors.warning },
          ]}
        >
          <Ionicons
            name={pass ? "trophy" : "refresh"}
            size={30}
            color="#FFFFFF"
          />
        </View>
        <Text style={[styles.resultScore, { color: colors.onSurface }]}>
          {score}%
        </Text>
        <Text style={[styles.resultSub, { color: colors.muted }]}>
          {correct} of {questions.length} correct
        </Text>
        <Pressable
          testID="quiz-retry-button"
          onPress={restart}
          style={[styles.retryBtn, { borderColor: colors.brand }]}
        >
          <Ionicons name="refresh" size={16} color={colors.brand} />
          <Text style={[styles.retryText, { color: colors.brand }]}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View testID="quiz-engine">
      <View style={styles.progressRow}>
        <Text style={[styles.qCount, { color: colors.muted }]}>
          Question {index + 1} of {questions.length}
        </Text>
        {savedScore !== undefined && (
          <Text style={[styles.qCount, { color: colors.brand }]}>
            Best: {savedScore}%
          </Text>
        )}
      </View>

      <Text style={[styles.question, { color: colors.onSurface }]}>{q.q}</Text>

      <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
        {q.options.map((opt, i) => {
          const isCorrect = i === q.answer;
          const isSelected = i === selected;
          let bg = colors.surfaceSecondary;
          let border = colors.border;
          let fg = colors.onSurface;
          if (revealed && isCorrect) {
            bg = colors.success;
            border = colors.success;
            fg = colors.onSuccess;
          } else if (revealed && isSelected && !isCorrect) {
            bg = colors.error;
            border = colors.error;
            fg = colors.onError;
          }
          return (
            <Pressable
              key={i}
              testID={`quiz-option-${i}`}
              disabled={revealed}
              onPress={() => onSelect(i)}
              style={[styles.option, { backgroundColor: bg, borderColor: border }]}
            >
              <Text style={[styles.optionText, { color: fg }]}>{opt}</Text>
              {revealed && isCorrect && (
                <Ionicons name="checkmark-circle" size={20} color={fg} />
              )}
              {revealed && isSelected && !isCorrect && (
                <Ionicons name="close-circle" size={20} color={fg} />
              )}
            </Pressable>
          );
        })}
      </View>

      {revealed && (
        <View
          testID="quiz-explanation"
          style={[
            styles.explanation,
            { backgroundColor: colors.brandTertiary },
          ]}
        >
          <Text style={[styles.explTitle, { color: colors.brand }]}>
            {selected === q.answer ? "Correct!" : "Not quite"}
          </Text>
          <Text style={[styles.explText, { color: colors.onSurface }]}>
            {q.explanation}
          </Text>
        </View>
      )}

      {revealed && (
        <Pressable
          testID="quiz-next-button"
          onPress={onNext}
          style={[styles.nextBtn, { backgroundColor: colors.brand }]}
        >
          <Text style={[styles.nextText, { color: colors.onBrand }]}>
            {isLast ? "See results" : "Next question"}
          </Text>
          <Ionicons
            name="arrow-forward"
            size={18}
            color={colors.onBrand}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qCount: { fontSize: 13, fontWeight: "600" },
  question: { fontSize: 18, fontWeight: "700", marginTop: spacing.sm },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  optionText: { fontSize: 15, fontWeight: "500", flex: 1, paddingRight: 8 },
  explanation: {
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
    gap: 4,
  },
  explTitle: { fontSize: 14, fontWeight: "700" },
  explText: { fontSize: 14, lineHeight: 20 },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
  },
  nextText: { fontSize: 16, fontWeight: "700" },
  result: {
    alignItems: "center",
    padding: spacing.xl,
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
  resultIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  resultScore: { fontSize: 40, fontWeight: "800" },
  resultSub: { fontSize: 15 },
  retryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1.5,
    borderRadius: radius.pill,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: spacing.sm,
  },
  retryText: { fontSize: 15, fontWeight: "700" },
});
