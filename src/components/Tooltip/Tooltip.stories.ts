import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Tooltip from ".";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GasStationTooltip: Story = {
  args: {
    x: 400,
    y: 300,
    layerType: "gas",
    object: {
      properties: {
        NAME: "Sample Gas Station",
        ADDRESS: "123 Main Street",
        ZIPCODE: "20002",
        NUMBER_OF_PUMPS: 10,
      },
    },
  },
};

export const GroceryStoreTooltip: Story = {
  args: {
    x: 400,
    y: 300,
    layerType: "grocery",
    object: {
      properties: {
        STORENAME: "Sample Grocery Store",
        ADDRESS: "456 Market Street",
        ZIPCODE: "20002",
      },
    },
  },
};
