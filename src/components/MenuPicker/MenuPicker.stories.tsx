import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import MenuPicker from ".";

const meta = {
	title: "Components/MenuPicker",
	component: MenuPicker,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		mode: { control: "select", options: ["single", "multi"] },
		placeholder: { control: "text" },
		disabled: { control: "boolean" },
	},
	args: {
		placeholder: "Select...",
		disabled: false,
	},
} satisfies Meta<typeof MenuPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
	{ value: "all", label: "All" },
	{ value: "online", label: "Online" },
	{ value: "idle", label: "Idle" },
	{ value: "dnd", label: "Do Not Disturb", disabled: true },
];

export const SingleSelect: Story = {
	args: {
		mode: "single",
		items,
	},
	render: (args) => {
		const [value, setValue] = useState<string>("all");
		return (
			<MenuPicker
				{...args}
				mode="single"
				value={value}
				onChange={(next) => setValue(next as string)}
			/>
		);
	},
};

export const MultiSelect: Story = {
	args: {
		mode: "multi",
		items,
	},
	render: (args) => {
		const [value, setValue] = useState<string[]>(["online"]);
		return (
			<MenuPicker
				{...args}
				mode="multi"
				value={value}
				onChange={(next) => setValue(next as string[])}
			/>
		);
	},
};

export const Disabled: Story = {
	args: {
		mode: "single",
		items,
		disabled: true,
	},
	render: (args) => <MenuPicker {...args} value="all" mode="single" onChange={() => {}} />,
};

