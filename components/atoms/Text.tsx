import { useTheme } from "@/context/ThemeContext";
import { View, Text } from "react-native";

type HeadlineProps = {
  text: string;
};

export function Headline({ text }: HeadlineProps) {
  const theme = useTheme();
  return (
      <Text style={{ fontSize: 34, fontWeight: "bold", color: theme.text }}>
        {text}
      </Text>
  );
}

export function Headline2({ text }: HeadlineProps) {
  const theme = useTheme();
  return (
      <Text style={{ fontSize: 24, fontWeight: 600, color: theme.text }}>
        {text}
      </Text>
  );
}

export function Headline3({ text }: HeadlineProps) {
  const theme = useTheme();
  return (
      <Text style={{ fontSize: 18, fontWeight: 500, color: theme.text }}>
        {text}
      </Text>
  );
}

export function Subheads({ text }: HeadlineProps) {
  const theme = useTheme();
  return (
      <Text style={{ fontSize: 16, fontWeight: 600, color: theme.text }}>
        {text}
      </Text>
  );
}

export function NormalText({ text }: HeadlineProps) {
  const theme = useTheme();
  return (
      <Text style={{ fontSize: 16, fontWeight: "regular", color: theme.text }}>
        {text}
      </Text>
  );
}

export function DescriptiveItems({ text }: HeadlineProps) {
  const theme = useTheme();
  return (
      <Text style={{ fontSize: 16, fontWeight: "medium", color: theme.text }}>
        {text}
      </Text>
  );
}

export function DescriptionText({ text }: HeadlineProps) {
  const theme = useTheme();
  return (
      <Text style={{ fontSize: 14, fontWeight: "regular", color: theme.text }}>
        {text}
      </Text>
  );
}

export function HelperText({ text }: HeadlineProps) {
  const theme = useTheme();
  return (
      <Text
        style={{ fontSize: 12, fontWeight: "regular", color: theme.lightText }}
      >
        {text}
      </Text>
  );
}
