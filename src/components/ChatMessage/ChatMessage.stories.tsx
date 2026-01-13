import type { Meta, StoryObj } from "@storybook/react";
import ChatMessage from ".";
import Button from "../Button";
import {
	faReply,
	faHeart,
	faTrash,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";

const meta = {
	title: "COMPONENTS/ChatMessage",
	component: ChatMessage,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		status: {
			control: { type: "select" },
			options: ["sending", "sent", "delivered", "read", "failed"],
		},
		isOwnMessage: {
			control: { type: "boolean" },
		},
		isHighlighted: {
			control: { type: "boolean" },
		},
		isPinned: {
			control: { type: "boolean" },
		},
		forwarded: {
			control: { type: "boolean" },
		},
		showTimestamp: {
			control: { type: "boolean" },
		},
		isEdited: {
			control: { type: "boolean" },
		},
	},
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultControls = () => (
	<div style={{ display: "flex", gap: "4px" }}>
		<Button icon={faReply} color="transparent" />
		<Button icon={faHeart} color="transparent" />
		<Button icon={faEdit} color="transparent" />
		<Button icon={faTrash} color="danger" />
	</div>
);

// Default story
export const Default: Story = {
	args: {
		username: "john_doe",
		avatar: "https://via.placeholder.com/40x40/4a90e2/ffffff?text=JD",
		content: "Hello, this is a test message!",
		timestamp: "1704123456",
		isOwnMessage: false,
		status: "sent",
		showTimestamp: true,
	},
};

export const Multiple: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<ChatMessage
				timestamp="1704123456"
				username="mcbalaam"
				avatar="https://via.placeholder.com/40x40/7ed321/ffffff?text=Y"
				status="read"
			>
				hey yall
			</ChatMessage>
			<ChatMessage
				timestamp="1704123456"
				username="mcbalaam"
				avatar="https://via.placeholder.com/40x40/7ed321/ffffff?text=Y"
				status="read"
			>
				wassup
			</ChatMessage>
		</div>
	),
};

// Own message
export const OwnMessage: Story = {
	args: {
		...Default.args,
		username: "you",
		avatar: "https://via.placeholder.com/40x40/7ed321/ffffff?text=Y",
		isOwnMessage: true,
		status: "read",
	},
};

// With mentions
export const WithMentions: Story = {
	args: {
		...Default.args,
		content: "Hey @alice and @bob, check this out!",
		mentions: [
			{ userId: "1", username: "alice", highlighted: false },
			{ userId: "2", username: "bob", highlighted: true },
		],
	},
};

// With user ping
export const WithUserPing: Story = {
	args: {
		...Default.args,
		content: "Important update for the team",
		userPing: { userId: "3", username: "team" },
	},
};

// Forwarded message
export const Forwarded: Story = {
	args: {
		...Default.args,
		forwarded: true,
		forwardedFrom: "alice",
		content: "This message was forwarded from another conversation",
	},
};

// Pinned message
export const Pinned: Story = {
	args: {
		...Default.args,
		isPinned: true,
		content: "This is an important pinned message for everyone to see",
	},
};

// Edited message
export const Edited: Story = {
	args: {
		...Default.args,
		content: "This message has been edited after being sent",
		isEdited: true,
		editedAt: "1704123500",
	},
};

// Highlighted message
export const Highlighted: Story = {
	args: {
		...Default.args,
		isHighlighted: true,
		content: "This message is highlighted for emphasis",
	},
};

// Failed message
export const Failed: Story = {
	args: {
		...Default.args,
		content: "This message failed to send",
		status: "failed",
	},
};

// With read receipts
export const WithReadReceipts: Story = {
	args: {
		...OwnMessage.args,
		status: "read",
		readBy: ["alice", "bob", "charlie"],
	},
};

// Complex message with all features
export const ComplexMessage: Story = {
	args: {
		username: "project_manager",
		avatar: "https://via.placeholder.com/40x40/f5a623/ffffff?text=PM",
		content:
			"Team, we need to review the Q4 projections and update our strategy. Please check the attached document and provide your feedback by EOD.",
		timestamp: "1704123456",
		isOwnMessage: false,
		isPinned: true,
		forwarded: false,
		isHighlighted: true,
		mentions: [
			{ userId: "1", username: "alice", highlighted: true },
			{ userId: "2", username: "bob", highlighted: true },
			{ userId: "3", username: "charlie", highlighted: false },
		],
		status: "read",
		readBy: ["alice", "bob"],
		showTimestamp: true,
		isEdited: false,
	},
	render: (args) => (
		<div style={{ width: "600px" }}>
			<ChatMessage {...args} />
		</div>
	),
};

// Message with controls
export const WithControls: Story = {
	args: {
		...Default.args,
		content: "This message has interactive controls",
		controls: <DefaultControls />,
	},
};

// Message with actions
export const WithActions: Story = {
	args: {
		...Default.args,
		content: "This message has hover actions",
		actions: <Button icon={faHeart} color="transparent" />,
	},
};

// Long message with wrapping
export const LongMessage: Story = {
	args: {
		...Default.args,
		content:
			"This is a very long message that will test the text wrapping functionality of the ChatMessage component. It should wrap properly and maintain readability while preserving the overall layout and design of the component. The message should be easy to read and the text should wrap naturally without breaking words inappropriately.",
	},
	render: (args) => (
		<div style={{ width: "400px" }}>
			<ChatMessage {...args} />
		</div>
	),
};

// Message without avatar
export const WithoutAvatar: Story = {
	args: {
		...Default.args,
		username: "anonymous_user",
		avatar: undefined,
		content: "This message comes from a user without an avatar",
	},
};

// Message with emoji content
export const WithEmoji: Story = {
	args: {
		...Default.args,
		content:
			"Great work everyone! 🎉 Let's keep this momentum going. 🚀 #teamwork",
	},
};

// Discord-style message examples
export const DiscordStyleMessage: Story = {
	args: {
		username: "discord_user",
		avatar: "https://via.placeholder.com/40x40/5865f2/ffffff?text=DU",
		content:
			"Hey everyone! Just finished the new feature update. Check out the changes and let me know what you think!",
		timestamp: "1704123456",
		isOwnMessage: false,
		status: "read",
		showTimestamp: true,
		mentions: [
			{ userId: "1", username: "dev_team", highlighted: true },
			{ userId: "2", username: "qa_team", highlighted: false },
		],
	},
	render: (args) => (
		<div
			style={{
				width: "600px",
				background: "#36393f",
				padding: "20px",
				borderRadius: "8px",
			}}
		>
			<ChatMessage {...args} />
		</div>
	),
};

export const DiscordStyleOwnMessage: Story = {
	args: {
		username: "you",
		avatar: "https://via.placeholder.com/40x40/7ed321/ffffff?text=Y",
		content: "Looking good! Ready to merge when you are.",
		timestamp: "1704123500",
		isOwnMessage: true,
		status: "read",
		showTimestamp: true,
	},
	render: (args) => (
		<div
			style={{
				width: "600px",
				background: "#36393f",
				padding: "20px",
				borderRadius: "8px",
			}}
		>
			<ChatMessage {...args} />
		</div>
	),
};

export const DiscordStylePingedMessage: Story = {
	args: {
		username: "admin",
		avatar: "https://via.placeholder.com/40x40/f5a623/ffffff?text=A",
		content: "Important announcement for all team members",
		timestamp: "1704123600",
		isOwnMessage: false,
		isPinned: true,
		userPing: { userId: "team", username: "everyone" },
		showTimestamp: true,
	},
	render: (args) => (
		<div
			style={{
				width: "600px",
				background: "#36393f",
				padding: "20px",
				borderRadius: "8px",
			}}
		>
			<ChatMessage {...args} />
		</div>
	),
};
