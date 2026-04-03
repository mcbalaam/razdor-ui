import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import CheckboxGroup from ".";

const meta = {
	title: "Components/CheckboxGroup",
	component: CheckboxGroup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		disabled: { control: "boolean" },
	},
	args: {
		disabled: false,
	},
} satisfies Meta<typeof CheckboxGroup>;

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
		values: ["online"],
	},
	render: (args) => {
		const [values, setValues] = useState<string[]>(args.values ?? []);
		return (
			<CheckboxGroup
				{...args}
				values={values}
				onChange={(next) => setValues(next)}
			/>
		);
	},
};

export const Disabled: Story = {
	args: {
		items,
		values: ["all"],
		disabled: true,
	},
	render: (args) => <CheckboxGroup {...args} onChange={() => {}} />,
};

export const EmptySelection: Story = {
	args: {
		items,
		values: [],
	},
	render: (args) => {
		const [values, setValues] = useState<string[]>(args.values ?? []);
		return (
			<CheckboxGroup
				{...args}
				values={values}
				onChange={(next) => setValues(next)}
			/>
		);
	},
};

