import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Pencil, Trash } from "lucide-react";
import { Box } from ".";
import Button from "../Button";
import { ButtonBlock } from "../ButtonBlock";

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  tags: ["autodocs"],
  decorators: [(story) => <div style={{ padding: "20px" }}>{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const WithActions: Story = {
  render: () => (
    <Box
      actions={
        <ButtonBlock>
          <Button color="primary" icon={Copy} tiny />
          <Button color="primary" icon={Pencil} tiny />
          <Button color="primary" icon={Trash} tiny />
        </ButtonBlock>
      }
    >
      <p style={{ margin: 0 }}>
        Hover over this box to see the action buttons appear in the top-right corner.
      </p>
    </Box>
  ),
};

export const WithoutActions: Story = {
  render: () => (
    <Box>
      <h3 style={{ margin: "0 0 8px 0" }}>Simple Box</h3>
      <p style={{ margin: 0 }}>
        This box doesn't have any action buttons.
      </p>
    </Box>
  ),
};

export const MultipleBoxes: Story = {
  render: () => (
    <>
      <Box
        actions={
          <ButtonBlock>
            <Button color="primary" icon={Copy} tiny />
            <Button color="primary" icon={Pencil} tiny />
            <Button color="primary" icon={Trash} tiny />
          </ButtonBlock>
        }
      >
        <p style={{ margin: 0 }}>First message with actions</p>
      </Box>
      <Box
        actions={
          <ButtonBlock>
            <Button color="good" icon={Copy} tiny />
            <Button color="secondary" icon={Pencil} tiny />
          </ButtonBlock>
        }
      >
        <p style={{ margin: 0 }}>Second message with different colored actions</p>
      </Box>
      <Box>
        <p style={{ margin: 0 }}>Third message without actions</p>
      </Box>
    </>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Box
      actions={
        <ButtonBlock>
          <Button color="primary" icon={Copy} tiny />
          <Button color="primary" icon={Pencil} tiny />
          <Button color="danger" icon={Trash} tiny />
        </ButtonBlock>
      }
    >
      <h3 style={{ margin: "0 0 12px 0" }}>Discord-like Message</h3>
      <p style={{ margin: "0 0 8px 0" }}>
        This component mimics Discord's message hover behavior.
      </p>
      <p style={{ margin: 0 }}>
        The action buttons appear when you hover over the box and are positioned
        slightly outside the top edge for a polished look.
      </p>
    </Box>
  ),
};
