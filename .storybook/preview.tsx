import type { Preview } from "@storybook/react-vite";
import "../src/styles/global.css";

document.documentElement.dir = "rtl";
document.documentElement.lang = "he";

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "#faf8f2" },
        { name: "card", value: "#ffffff" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Foundation", "Atoms"],
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
