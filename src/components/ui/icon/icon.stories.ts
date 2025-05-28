import type { Meta, StoryObj } from "@storybook/nextjs";
import { Icon } from ".";
import { iconKeyList } from "./icon-mapper";

const iconMapping = iconKeyList.reduce(
  (acc: Record<string, string>, key: any) => {
    acc[key] = key;
    return acc;
  },
  {}
);

const meta = {
  title: "Style/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      options: iconKeyList,
      mapping: iconMapping,
      control: { type: "select" },
    },
    size: {
      control: { type: "number", min: 8, max: 512, step: 4 },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: "icon-book",
    size: 80,
  },
};
