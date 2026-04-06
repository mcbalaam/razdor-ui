import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from ".";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";

const meta = {
	title: "COMPONENTS/Input",
	component: Input,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Input label="Name" value={value} onChange={setValue} placeholder="Enter your name" />
			</div>
		);
	},
};

export const WithIcon: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Input label="Search" value={value} onChange={setValue} placeholder="Search..." faIcon={faSearch} />
			</div>
		);
	},
};

export const Email: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Input label="Email" type="email" value={value} onChange={setValue} placeholder="you@example.com" faIcon={faEnvelope} />
			</div>
		);
	},
};

export const Password: Story = {
	render: () => {
		const [value, setValue] = useState("");
		return (
			<div style={{ width: 300 }}>
				<Input label="Password" type="password" value={value} onChange={setValue} placeholder="••••••••" faIcon={faLock} />
			</div>
		);
	},
};

export const WithError: Story = {
	render: () => {
		const [value, setValue] = useState("wrong@");
		return (
			<div style={{ width: 300 }}>
				<Input label="Email" type="email" value={value} onChange={setValue} error="Enter a valid email address" faIcon={faEnvelope} />
			</div>
		);
	},
};

export const Disabled: Story = {
	render: () => (
		<div style={{ width: 300 }}>
			<Input label="Read-only" value="Cannot edit this" disabled />
		</div>
	),
};
