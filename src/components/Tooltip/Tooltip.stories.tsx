import type { Meta, StoryObj } from "@storybook/react";
import { Trash, Settings, Check } from "lucide-react";
import Tooltip from ".";
import Button from "../Button";
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
		children: <Button icon={Trash} />,
	},
};

export const Group: Story = {
	args: { text: "", children: null },
	render: () => (
		<div style={{ display: "flex", gap: "10px" }}>
			<Tooltip text=":trash:">
				<Button tiny icon={Trash} color="bad" />
			</Tooltip>
			<Tooltip text=":cog:">
				<Button tiny icon={Settings} />
			</Tooltip>
			<Tooltip text=":check:">
				<Button tiny icon={Check} color="good" />
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
