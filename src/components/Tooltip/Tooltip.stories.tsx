import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from ".";
import Button from "../Button";
import { faTrash, faCog, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import "../../index.css";

const meta = {
	title: "COMPONENTS/Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		text: { control: "text" },
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: "This is a tooltip",
		children: <Button>Hover me</Button>,
	},
};

export const OnIconButton: Story = {
	args: {
		text: ":trash:",
		children: <Button faIcon={faTrash} />,
	},
};

export const Group: Story = {
	args: { text: "", children: null },
	render: () => (
		<div style={{ display: "flex", gap: "10px" }}>
			<Tooltip text=":trash:">
				<Button tiny faIcon={faTrash} color="bad" />
			</Tooltip>
			<Tooltip text=":cog:">
				<Button tiny faIcon={faCog} />
			</Tooltip>
			<Tooltip text=":check:">
				<Button tiny faIcon={faCheck} color="good" />
			</Tooltip>
		</div>
	),
};

export const LongText: Story = {
	args: {
		text: "Signature hash matched — content is verified",
		children: <Button>Verified</Button>,
	},
};
