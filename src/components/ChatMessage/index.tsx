import type { PropsWithChildren, CSSProperties, ReactNode } from "react";
import { Box } from "../Box";
import "./styles.css";
import Timestamp from "../Timestamp";

export interface ChatMessageProps {
	// User information
	username?: string;
	avatar?: string;
	avatarAlt?: string;

	// Message content
	content?: ReactNode;
	children?: ReactNode;

	// Status indicators
	forwarded?: boolean;
	forwardedFrom?: string;
	isEdited?: boolean;
	editedAt?: string;

	// Mentions and pings
	mentions?: Array<{
		userId: string;
		username: string;
		highlighted?: boolean;
	}>;
	userPing?: {
		userId: string;
		username: string;
	};

	// Timestamp
	timestamp: string;
	showTimestamp?: boolean;

	// Visual states
	isOwnMessage?: boolean;
	isHighlighted?: boolean;
	isSelected?: boolean;
	isPinned?: boolean;

	// Actions and controls
	actions?: ReactNode;
	controls?: ReactNode;

	// Styling
	className?: string;
	style?: CSSProperties;

	// Message state
	status?: "sending" | "sent" | "delivered" | "read" | "failed";
	readBy?: string[];
}

export default function ChatMessage({
	username,
	avatar,
	avatarAlt = "User avatar",
	content,
	children,
	forwarded = false,
	forwardedFrom,
	isEdited = false,
	editedAt,
	mentions = [],
	userPing,
	timestamp,
	showTimestamp = true,
	isOwnMessage = false,
	isHighlighted = false,
	isSelected = false,
	isPinned = false,
	actions,
	controls,
	className,
	style,
	status = "sent",
	readBy = [],
}: PropsWithChildren<ChatMessageProps>) {
	const renderAvatar = () => {
		if (!avatar && !username) return null;

		return (
			<div className="chat-message-avatar">
				{avatar ? (
					<img
						src={avatar}
						alt={avatarAlt}
						className="chat-message-avatar-img"
					/>
				) : (
					<div className="chat-message-avatar-placeholder">
						{username?.charAt(0).toUpperCase()}
					</div>
				)}
			</div>
		);
	};

	const renderUsername = () => {
		if (!username) return null;

		return (
			<div className="chat-message-header">
				<div className="chat-message-username">
					{username}
					{isPinned && (
						<span
							className="chat-message-pinned-indicator"
							title="Pinned message"
						>
							📌
						</span>
					)}
				</div>
				{showTimestamp && (
					<div className="chat-message-timestamp-inline">
						<Timestamp ts={timestamp} />
						{isEdited && editedAt && (
							<span className="chat-message-timestamp-edited"> (edited)</span>
						)}
					</div>
				)}
			</div>
		);
	};

	const renderForwardedInfo = () => {
		if (!forwarded || !forwardedFrom) return null;

		return (
			<div className="chat-message-forwarded">
				<span className="chat-message-forwarded-icon">↪</span>
				Forwarded from {forwardedFrom}
			</div>
		);
	};

	const renderContent = () => {
		const messageContent = content || children;

		if (!messageContent) return null;

		return (
			<div className="chat-message-content">
				{messageContent}
				{isEdited && editedAt && (
					<span className="chat-message-edited" title={`Edited at ${editedAt}`}>
						(edited)
					</span>
				)}
			</div>
		);
	};

	const renderMentions = () => {
		if (mentions.length === 0) return null;

		return (
			<div className="chat-message-mentions">
				{mentions.map((mention, index) => (
					<span
						key={mention.userId}
						className={`chat-message-mention${mention.highlighted ? " highlighted" : ""}`}
					>
						@{mention.username}
						{index < mentions.length - 1 && ", "}
					</span>
				))}
			</div>
		);
	};

	const renderUserPing = () => {
		if (!userPing) return null;

		return (
			<div className="chat-message-ping">
				<span className="chat-message-ping-text">@{userPing.username}</span>
			</div>
		);
	};

	const renderTimestamp = () => {
		return null; // Timestamp is now inline with username
	};

	const renderReadBy = () => {
		if (readBy.length === 0 || status !== "read") return null;

		return (
			<div className="chat-message-read-by">
				{readBy.map((user, index) => (
					<span key={user} className="chat-message-read-user">
						{user}
						{index < readBy.length - 1 && ", "}
					</span>
				))}
			</div>
		);
	};

	const messageClass = [
		"chat-message",
		isOwnMessage ? "chat-message-own" : "chat-message-other",
		isHighlighted ? "chat-message-highlighted" : "",
		isSelected ? "chat-message-selected" : "",
		forwarded ? "chat-message-forwarded-message" : "",
		className || "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<Box className={messageClass} style={style} actions={actions}>
			<div className="chat-message-wrapper">
				{renderAvatar()}

				<div className="chat-message-body">
					{renderUsername()}
					{renderForwardedInfo()}
					{renderContent()}
					{renderMentions()}
					{renderUserPing()}
				</div>

				{controls && <div className="chat-message-controls">{controls}</div>}
			</div>
		</Box>
	);
}
