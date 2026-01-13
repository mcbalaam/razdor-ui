import type { Meta, StoryObj } from "@storybook/react";
import {
	faCheckCircle,
	faExclamationTriangle,
	faInfoCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import ToastNotification from ".";
import "./styles.css";
import "../../index.css";
import Button from "../Button";

const meta: Meta<typeof ToastNotification> = {
	title: "Components/ToastNotification",
	component: ToastNotification,
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["info", "success", "warning", "error"],
		},
		position: {
			control: "select",
			options: [
				"top-right",
				"top-left",
				"bottom-right",
				"bottom-left",
				"top-center",
				"bottom-center",
			],
		},
		duration: {
			control: { type: "number", min: 0, max: 10000, step: 1000 },
		},
		showCloseButton: {
			control: "boolean",
		},
	},
	args: {
		duration: 0, // Отключаем автозакрытие для демо
		showCloseButton: true,
	},
	decorators: [
		(Story) => (
			<div
				style={{ padding: "100px", position: "relative", minHeight: "300px" }}
			>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof ToastNotification>;

export const Info: Story = {
	args: {
		type: "info",
		icon: faInfoCircle,
		children: "This is an info message",
	},
};

export const Success: Story = {
	args: {
		type: "success",
		icon: faCheckCircle,
		children: "Your profile has been updated successfully!",
	},
};

export const Warning: Story = {
	args: {
		type: "warning",
		icon: faExclamationTriangle,
		children: "Your session will expire in 5 minutes",
	},
};

export const Error: Story = {
	args: {
		type: "error",
		icon: faXmarkCircle,
		children: "Failed to save changes. Please try again.",
	},
};

export const WithImageIcon: Story = {
	args: {
		type: "success",
		iconUrl: "https://placehold.co/20x20/png",
		children: "Message with custom image icon",
	},
};

export const WithoutIcon: Story = {
	args: {
		type: "info",
		children: "Simple message without icon",
	},
};

export const WithoutCloseButton: Story = {
	args: {
		type: "info",
		icon: faInfoCircle,
		showCloseButton: false,
		children: "This toast doesn't have a close button",
	},
};

export const LongMessage: Story = {
	args: {
		type: "warning",
		icon: faExclamationTriangle,
		children:
			"This is a longer message that demonstrates how the toast handles multi-line content. It should wrap properly and maintain good readability.",
	},
};

export const VencordDemo: Story = {
	render: () => (
		<ToastNotification
			type="info"
			icon={faInfoCircle}
			position="bottom-right"
			duration={30000000}
		>
			Vencord has updated! Click{" "}
			<Button color="primary" tiny>
				here
			</Button>{" "}
			to restart
		</ToastNotification>
	),
};

export const VencordDemoKeyboard: Story = {
	render: () => (
		<ToastNotification
			type="info"
			icon={faInfoCircle}
			position="bottom-right"
			duration={30000000}
			nowrap
		>
			Vencord has updated! Press{" "}
			<div style={{ display: "flex", gap: "5px" }}>
				<Button tiny keyboard>
					⌘
				</Button>
				+
				<Button tiny keyboard>
					R
				</Button>
			</div>
			to restart
		</ToastNotification>
	),
};

export const AllPositions: Story = {
	render: () => (
		<>
			<ToastNotification
				type="info"
				icon={faInfoCircle}
				position="top-left"
				duration={0}
			>
				Top Left
			</ToastNotification>
			<ToastNotification
				type="success"
				icon={faCheckCircle}
				position="top-center"
				duration={0}
			>
				Top Center
			</ToastNotification>
			<ToastNotification
				type="warning"
				icon={faExclamationTriangle}
				position="top-right"
				duration={0}
			>
				Top Right
			</ToastNotification>
			<ToastNotification
				type="error"
				icon={faXmarkCircle}
				position="bottom-left"
				duration={0}
			>
				Bottom Left
			</ToastNotification>
			<ToastNotification
				type="info"
				icon={faInfoCircle}
				position="bottom-center"
				duration={0}
			>
				Bottom Center
			</ToastNotification>
			<ToastNotification
				type="success"
				icon={faCheckCircle}
				position="bottom-right"
				duration={0}
			>
				Bottom Right
			</ToastNotification>
		</>
	),
};

export const AutoClose: Story = {
	args: {
		type: "success",
		icon: faCheckCircle,
		duration: 3000,
		children: "This toast will auto-close in 3 seconds",
	},
};
