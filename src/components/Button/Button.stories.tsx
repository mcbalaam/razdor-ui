import type { Meta, StoryObj } from "@storybook/react";
import {
	faHome,
	faCheck,
	faTrash,
	faUser,
	faMoon,
	faCog,
	faSuperscript,
	faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
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
		faIcon: { control: false },
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
		faIcon: faHome,
	},
};

export const IconOnly: Story = {
	args: {
		faIcon: faTrash,
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
		faIcon: faMoon,
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
				<Button color="secondary" fill>
					Submit
				</Button>
			</div>

			<div style={{ display: "flex", gap: "10px" }}>
				<Button color="good">Approve</Button>
				<Button color="bad">Reject</Button>
				<Button color="danger">Warning</Button>
			</div>

			<div style={{ display: "flex", gap: "10px" }}>
				<Button tiny faIcon={faMoon} />
				<Button tiny color="bad" faIcon={faTrash} />
				<Button tiny color="danger" faIcon={faCog} />
				<Button tiny color="good" faIcon={faCheck} />
				<Button tiny color="secondary" fill faIcon={faCheck}>
					Tiny Text
				</Button>
			</div>
		</div>
	),
};
