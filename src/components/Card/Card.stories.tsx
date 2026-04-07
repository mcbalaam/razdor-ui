import type { Meta, StoryObj } from "@storybook/react";
import Card from ".";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [(story) => <div style={{ padding: "40px" }}>{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <p style={{ margin: 0 }}>Card without a title.</p>
    </Card>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <Card title="My Card">
      <p style={{ margin: 0 }}>Card with an optional title prop.</p>
    </Card>
  ),
};
