import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import RadioGroup from ".";

const meta = {
	title: "Components/RadioGroup",
	component: RadioGroup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		layout: { control: "select", options: ["vertical", "horizontal"] },
		disabled: { control: "boolean" },
	},
	args: {
		name: "status",
		layout: "vertical",
		disabled: false,
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
	{ value: "all", label: "All" },
	{ value: "online", label: "Online" },
	{ value: "idle", label: "Idle" },
	{ value: "dnd", label: "Do Not Disturb", disabled: true },
];

export const Default: Story = {
	args: {
		items,
		value: "online",
		onChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState<string>("online");
		return (
			<RadioGroup {...args} value={value} onChange={(next) => setValue(next)} />
		);
	},
};

export const Horizontal: Story = {
	args: {
		items,
		name: "status-h",
		layout: "horizontal",
	},
	render: (args) => {
		const [value, setValue] = useState<string>("idle");
		return (
			<RadioGroup {...args} value={value} onChange={(next) => setValue(next)} />
		);
	},
};

export const Disabled: Story = {
	args: {
		items,
		name: "status-disabled",
		disabled: true,
	},
	render: (args) => <RadioGroup {...args} value="all" onChange={() => {}} />,
};

