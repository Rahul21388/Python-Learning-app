import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { radius, spacing } from "@/src/theme/colors";
import { CODE_FONT, useTheme } from "@/src/theme/useTheme";

type TokenType =
  | "comment"
  | "string"
  | "number"
  | "keyword"
  | "builtin"
  | "decorator"
  | "default";

interface Token {
  text: string;
  type: TokenType;
}

const KEYWORDS =
  "False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|raise|return|self|try|while|with|yield";

const BUILTINS =
  "print|len|range|input|int|str|float|bool|list|dict|set|tuple|type|sum|min|max|abs|round|sorted|reversed|enumerate|zip|map|filter|open|isinstance|super|append|extend|insert|remove|pop|keys|values|items|get|split|join|strip|lower|upper|replace|format|startswith|endswith|find|count|index|copy|update|add|read|write|readlines";

// Order matters: strings/comments first so their contents aren't re-tokenized.
const TOKEN_REGEX = new RegExp(
  [
    `("""[\\s\\S]*?"""|'''[\\s\\S]*?'''|[fbr]?"(?:\\\\.|[^"\\\\\\n])*"|[fbr]?'(?:\\\\.|[^'\\\\\\n])*')`, // string
    `(#[^\\n]*)`, // comment
    `(@\\w+)`, // decorator
    `(\\b(?:${KEYWORDS})\\b)`, // keyword
    `(\\b(?:${BUILTINS})\\b)`, // builtin
    `(\\b\\d+(?:\\.\\d+)?\\b)`, // number
  ].join("|"),
  "g",
);

const GROUP_TYPES: TokenType[] = [
  "string",
  "comment",
  "decorator",
  "keyword",
  "builtin",
  "number",
];

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  TOKEN_REGEX.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = TOKEN_REGEX.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), type: "default" });
    }
    let type: TokenType = "default";
    for (let g = 0; g < GROUP_TYPES.length; g++) {
      if (match[g + 1] !== undefined) {
        type = GROUP_TYPES[g];
        break;
      }
    }
    tokens.push({ text: match[0], type });
    lastIndex = TOKEN_REGEX.lastIndex;
  }
  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), type: "default" });
  }
  return tokens;
}

const lightPalette: Record<TokenType, string> = {
  comment: "#8E8E93",
  string: "#0A7B34",
  number: "#B35C00",
  keyword: "#AF00DB",
  builtin: "#0550AE",
  decorator: "#9A6700",
  default: "#1C1C1E",
};

const darkPalette: Record<TokenType, string> = {
  comment: "#7F848E",
  string: "#98C379",
  number: "#D19A66",
  keyword: "#C678DD",
  builtin: "#61AFEF",
  decorator: "#E5C07B",
  default: "#EBEBF5",
};

interface Props {
  code: string;
}

export function CodeBlock({ code }: Props) {
  const { colors, dark } = useTheme();
  const palette = dark ? darkPalette : lightPalette;
  const tokens = useMemo(() => tokenize(code), [code]);

  return (
    <View
      testID="code-block"
      style={[styles.codeBlock, { backgroundColor: colors.surfaceSecondary }]}
    >
      <View style={styles.codeHeader}>
        <Ionicons name="logo-python" size={14} color={colors.brand} />
        <Text style={[styles.codeLabel, { color: colors.muted }]}>Python</Text>
      </View>
      <Text
        style={[styles.codeText, { color: palette.default }]}
        selectable
      >
        {tokens.map((t, i) =>
          t.type === "default" ? (
            t.text
          ) : (
            <Text
              key={i}
              style={{
                color: palette[t.type],
                fontStyle: t.type === "comment" ? "italic" : "normal",
                fontFamily: CODE_FONT,
              }}
            >
              {t.text}
            </Text>
          ),
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  codeBlock: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  codeHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  codeLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  codeText: { fontFamily: CODE_FONT, fontSize: 13.5, lineHeight: 21 },
});
