import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Textarea from ".";

const meta = {
	title: "COMPONENTS/Textarea",
	component: Textarea,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Textarea label="Message" value={value} onChange={setValue} placeholder="Write something..." />
			</div>
		);
	},
};

export const WithError: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Textarea label="Message" value={value} onChange={setValue} error="This field is required" />
			</div>
		);
	},
};

export const NoResize: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Textarea label="Fixed size" value={value} onChange={setValue} rows={6} resize="none" placeholder="Cannot resize" />
			</div>
		);
	},
};

export const Disabled: Story = {
	render: () => (
		<div style={{ width: 300 }}>
			<Textarea label="Read-only" value="This content cannot be edited." disabled />
		</div>
	),
};
