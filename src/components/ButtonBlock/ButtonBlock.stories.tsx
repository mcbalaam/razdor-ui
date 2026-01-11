import type { Meta, StoryObj } from "@storybook/react";
import { faTrash, faPencil, faCopy } from "@fortawesome/free-solid-svg-icons";
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
      <Button color="primary" faIcon={faCopy} tiny />
      <Button color="primary" faIcon={faPencil} tiny />
      <Button color="primary" faIcon={faTrash} tiny />
    </ButtonBlock>
  ),
};

export const WithDifferentColors: Story = {
  render: () => (
    <ButtonBlock>
      <Button color="good" faIcon={faCopy} tiny />
      <Button color="secondary" faIcon={faPencil} tiny />
      <Button color="danger" faIcon={faTrash} tiny />
    </ButtonBlock>
  ),
};

export const WithText: Story = {
  render: () => (
    <ButtonBlock>
      <Button color="primary" faIcon={faCopy} tiny>
        Copy
      </Button>
      <Button color="primary" faIcon={faPencil} tiny>
        Edit
      </Button>
      <Button color="primary" faIcon={faTrash} tiny>
        Delete
      </Button>
    </ButtonBlock>
  ),
};
