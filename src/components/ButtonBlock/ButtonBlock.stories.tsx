import type { Meta, StoryObj } from "@storybook/react";
import { Copy, Pencil, Trash } from "lucide-react";
import Button from "../Button";
import { ButtonBlock } from ".";

const meta: Meta<typeof ButtonBlock> = {
  title: "Components/ButtonBlock",
  component: ButtonBlock,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonBlock>;

export const TinyIconButtons: Story = {
  render: () => (
    <ButtonBlock>
      <Button color="primary" icon={Copy} tiny />
      <Button color="primary" icon={Pencil} tiny />
      <Button color="primary" icon={Trash} tiny />
    </ButtonBlock>
  ),
};

export const WithDifferentColors: Story = {
  render: () => (
    <ButtonBlock>
      <Button color="good" icon={Copy} tiny />
      <Button color="secondary" icon={Pencil} tiny />
      <Button color="danger" icon={Trash} tiny />
    </ButtonBlock>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonBlock>
      <Button color="primary" icon={Copy} tiny>
        Copy
      </Button>
      <Button color="primary" icon={Pencil} tiny>
        Edit
      </Button>
      <Button color="primary" icon={Trash} tiny>
        Delete
      </Button>
    </ButtonBlock>
  ),
};
