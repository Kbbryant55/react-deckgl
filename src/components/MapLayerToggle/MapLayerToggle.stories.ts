import type { Meta, StoryObj } from "@storybook/react-webpack5";
import MapLayerToggle from "./index";
import { fn } from "storybook/test";

const meta = {
  title: "Components/MapLayerToggle",
  component: MapLayerToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onToggle: fn() },
} satisfies Meta<typeof MapLayerToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Toggle: Story = {
  args: {},
};
