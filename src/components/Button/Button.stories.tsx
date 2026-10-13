import type { Meta, StoryObj } from "@storybook/react";
import { House, Check, Trash, Moon, Settings } from "lucide-react";
import Button from ".";
import "./styles.css";
import "../../index.css";

const meta = {
	title: "COMPONENTS/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		fill: { control: "boolean" },
		disabled: { control: "boolean" },
		onClick: { action: "clicked" },
		icon: { control: false },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Sample Button",
	},
};

export const Contrast: Story = {
	args: {
		children: "Contrast Button",
		color: "secondary",
	},
};

export const WithIcon: Story = {
	args: {
		children: "Icon Button",
		icon: House,
	},
};

export const IconOnly: Story = {
	args: {
		icon: Trash,
		fill: true,
	},
};

export const WithImage: Story = {
	args: {
		children: "With Image",
		href: "https://placehold.co/20x20/png",
	},
};

export const Disabled: Story = {
	args: {
		children: "Forbidden",
		disabled: true,
		fill: true,
	},
};

export const Bad: Story = {
	args: {
		children: "Discard",
		color: "bad",
	},
};

export const Good: Story = {
	args: {
		children: "Confirm",
		color: "good",
	},
};

export const Transparent: Story = {
	args: {
		children: "Transparent",
		color: "transparent",
	},
};

export const Tiny: Story = {
	args: {
		icon: Moon,
		tiny: true,
	},
};

export const Keyboard: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
			<div style={{ display: "flex", gap: "5px" }}>
				<Button tiny keyboard>
					⌘
				</Button>
				+
				<Button tiny keyboard>
					R
				</Button>
			</div>
			<div style={{ display: "flex", gap: "5px" }}>
				<Button tiny keyboard>
					Alt
				</Button>
				+
				<Button tiny keyboard>
					Shift
				</Button>
			</div>
		</div>
	),
};

export const ButtonGroup: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
			<div style={{ display: "flex", gap: "10px" }}>
				<Button color="primary">Action</Button>
				<Button color="transparent">Action</Button>
				<Button color="secondary">
					Submit
				</Button>
			</div>

			<div style={{ display: "flex", gap: "10px" }}>
				<Button color="good">Approve</Button>
				<Button color="bad">Reject</Button>
				<Button color="danger">Warning</Button>
			</div>

			<div style={{ display: "flex", gap: "10px" }}>
				<Button tiny icon={Moon} />
				<Button tiny color="bad" icon={Trash} />
				<Button tiny color="danger" icon={Settings} />
				<Button tiny color="good" icon={Check} />
				<Button tiny color="secondary" icon={Check}>
					Tiny Text
				</Button>
			</div>
		</div>
	),
};

export const Fill: Story = {
	render: () => (
		<div style={{ width: 320 }}>
			<Button color="secondary" fill icon={Check}>
				Full-width fill button
			</Button>
		</div>
	),
};
