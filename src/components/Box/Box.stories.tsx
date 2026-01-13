import type { Meta, StoryObj } from "@storybook/react";
import { faCopy, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
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
          <Button color="primary" faIcon={faCopy} tiny />
          <Button color="primary" faIcon={faPencil} tiny />
          <Button color="primary" faIcon={faTrash} tiny />
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
            <Button color="primary" faIcon={faCopy} tiny />
            <Button color="primary" faIcon={faPencil} tiny />
            <Button color="primary" faIcon={faTrash} tiny />
          </ButtonBlock>
        }
      >
        <p style={{ margin: 0 }}>First message with actions</p>
      </Box>
      <Box
        actions={
          <ButtonBlock>
            <Button color="good" faIcon={faCopy} tiny />
            <Button color="secondary" faIcon={faPencil} tiny />
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
          <Button color="primary" faIcon={faCopy} tiny />
          <Button color="primary" faIcon={faPencil} tiny />
          <Button color="danger" faIcon={faTrash} tiny />
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
