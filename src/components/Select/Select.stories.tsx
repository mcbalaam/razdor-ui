import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Select from ".";

const COUNTRIES = [
	{ value: "us", label: "United States" },
	{ value: "gb", label: "United Kingdom" },
	{ value: "de", label: "Germany" },
	{ value: "fr", label: "France" },
	{ value: "jp", label: "Japan" },
	{ value: "ru", label: "Russia" },
];

const meta = {
	title: "COMPONENTS/Select",
	component: Select,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	args: {
		options: COUNTRIES,
	},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: "Country", placeholder: "Select a country" },
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Select {...args} value={value} onChange={setValue} />
			</div>
		);
	},
};

export const WithValue: Story = {
	args: { label: "Country" },
	render: (args) => {
		const [value, setValue] = useState("de");
		return (
			<div style={{ width: 300 }}>
				<Select {...args} value={value} onChange={setValue} />
			</div>
		);
	},
};

export const WithError: Story = {
	args: { label: "Country", placeholder: "Select a country", error: "Please select a country" },
	render: (args) => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Select {...args} value={value} onChange={setValue} />
			</div>
		);
	},
};

export const Disabled: Story = {
	args: { label: "Country", value: "us", disabled: true },
	render: (args) => (
		<div style={{ width: 300 }}>
			<Select {...args} onChange={() => {}} />
		</div>
	),
};
