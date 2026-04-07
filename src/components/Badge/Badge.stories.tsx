import type { Meta, StoryObj } from "@storybook/react";
import Badge from ".";
import "./styles.css";
import "../../index.css";

const meta = {
	title: "COMPONENTS/Badge",
	component: Badge,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		contrast: { control: "boolean" },
		small: { control: "boolean" },
		src: { control: false },
		href: { control: "text" },
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Badge",
		src: "https://placehold.co/20x20/png",
	},
};

export const Small: Story = {
	args: {
		children: "RBST",
		src: "https://placehold.co/20x20/png",
		small: true,
	},
};

export const Contrast: Story = {
	args: {
		children: "GitHub",
		src: "https://placehold.co/20x20/png",
		contrast: true,
	},
};

export const AsLink: Story = {
	args: {
		children: "Open link",
		src: "https://placehold.co/20x20/png",
		href: "https://example.com",
	},
};

export const ImageOnly: Story = {
	args: {
		src: "https://placehold.co/20x20/png",
	},
};

export const Group: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
			<Badge src="https://placehold.co/20x20/png">GitHub</Badge>
			<Badge src="https://placehold.co/20x20/png" contrast>Steam</Badge>
			<Badge src="https://placehold.co/20x20/png" href="https://example.com">Ko-Fi</Badge>
			<Badge src="https://placehold.co/20x20/png" small>v1.0</Badge>
		</div>
	),
};
