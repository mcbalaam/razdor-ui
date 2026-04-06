import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toggle from ".";

const meta = {
	title: "COMPONENTS/Toggle",
	component: Toggle,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
	args: {
		checked: false,
		onChange: () => {},
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {
	args: { label: "Notifications" },
	render: (args) => {
		const [checked, setChecked] = useState(false);
		return <Toggle {...args} checked={checked} onChange={setChecked} />;
	},
};

export const On: Story = {
	args: { label: "Dark mode", checked: true },
	render: (args) => {
		const [checked, setChecked] = useState(true);
		return <Toggle {...args} checked={checked} onChange={setChecked} />;
	},
};

export const NoLabel: Story = {
	render: (args) => {
		const [checked, setChecked] = useState(false);
		return <Toggle {...args} checked={checked} onChange={setChecked} />;
	},
};

export const Disabled: Story = {
	args: { label: "Disabled", disabled: true },
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
			<Toggle checked={false} onChange={() => {}} label="Disabled off" disabled />
			<Toggle checked={true} onChange={() => {}} label="Disabled on" disabled />
		</div>
	),
};

export const Group: Story = {
	render: () => {
		const [settings, setSettings] = useState({
			notifications: true,
			marketing: false,
			darkMode: true,
		});
		const toggle = (key: keyof typeof settings) =>
			setSettings((s) => ({ ...s, [key]: !s[key] }));
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				<Toggle checked={settings.notifications} onChange={() => toggle("notifications")} label="Email notifications" />
				<Toggle checked={settings.marketing} onChange={() => toggle("marketing")} label="Marketing emails" />
				<Toggle checked={settings.darkMode} onChange={() => toggle("darkMode")} label="Dark mode" />
			</div>
		);
	},
};
