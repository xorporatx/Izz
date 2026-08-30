import type { Meta, StoryObj } from "@storybook/react-vite";

/**
 * Every color token from `src/styles/tokens.css`, grouped the way the CSS
 * file itself groups them. This is documentation only — it renders the
 * tokens, it does not define new ones.
 */
const groups: { title: string; tokens: { name: string; value: string }[] }[] = [
  {
    title: "Surface & text",
    tokens: [
      { name: "--color-background", value: "#faf8f2" },
      { name: "--color-card", value: "#ffffff" },
      { name: "--color-surface-sunken", value: "#faf8f2" },
      { name: "--color-panel", value: "#f8f7f4" },
      { name: "--color-border", value: "#e5e5e5" },
      { name: "--color-foreground", value: "#262626" },
      { name: "--color-muted-foreground", value: "#737373" },
      { name: "--color-ring", value: "#a3a3a3" },
      { name: "--color-track", value: "#f4f2ea" },
    ],
  },
  {
    title: "Tone — warning",
    tokens: [
      { name: "--color-warning", value: "#f69700" },
      { name: "--color-warning-surface", value: "#fef1df" },
    ],
  },
  {
    title: "Tone — danger",
    tokens: [
      { name: "--color-danger", value: "#dc2626" },
      { name: "--color-danger-surface", value: "#fdeaea" },
    ],
  },
  {
    title: "Tone — success",
    tokens: [
      { name: "--color-success", value: "#059669" },
      { name: "--color-success-ink", value: "#065f46" },
      { name: "--color-success-strong", value: "#064e3b" },
      { name: "--color-success-surface", value: "#e6edeb" },
      { name: "--color-success-soft", value: "#56be8c" },
    ],
  },
  {
    title: "Accent",
    tokens: [
      { name: "--color-accent-blue", value: "#5b7cf2" },
      { name: "--color-accent-blue-hover", value: "#4a6be4" },
    ],
  },
  {
    title: "Chart fills",
    tokens: [
      { name: "--color-chart-warning", value: "#fbb663" },
      { name: "--color-chart-danger", value: "#ef8f8f" },
      { name: "--color-chart-success", value: "#6fc9a0" },
    ],
  },
];

function readableTextColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#262626" : "#ffffff";
}

function ColorPalette() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {groups.map((group) => (
        <section key={group.title}>
          <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 600 }}>
            {group.title}
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {group.tokens.map((token) => (
              <div
                key={token.name}
                style={{
                  border: "1px solid #e5e5e5",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 64,
                    background: token.value,
                    color: readableTextColor(token.value),
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 8,
                    fontSize: 12,
                    fontFamily: "monospace",
                  }}
                >
                  {token.value}
                </div>
                <div style={{ padding: "8px 10px", fontSize: 12 }}>
                  {token.name}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const meta = {
  title: "Foundation/Colors",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllColors: Story = {
  render: () => <ColorPalette />,
};
