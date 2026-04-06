import type { Meta, StoryObj } from "@storybook/react";
import type { PropsWithChildren } from "react";
import ModalPopup, { type ModalControl } from "./";
import { useState } from "react";
import Button from "../Button";
import Form from "../Form";
import Input from "../Input";
import Textarea from "../Textarea";
import Select from "../Select";
import Toggle from "../Toggle";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

const ModalTemplate = ({ control, children }: PropsWithChildren<{ control: ModalControl }>) => {
	const [isOpen, setIsOpen] = useState(control.isOpen || false);

	const modalControl: ModalControl = {
		...control,
		isOpen,
		onClose: () => {
			setIsOpen(false);
			control.onClose?.();
		},
	};

	return (
		<>
			<Button color="primary" onClick={() => setIsOpen(true)}>
				Open Modal
			</Button>
			<ModalPopup control={modalControl}>
				{children ?? (
					<>
						<p>This is the modal content.</p>
						<p>It can contain any React elements or components.</p>
					</>
				)}
			</ModalPopup>
		</>
	);
};

const meta = {
	title: "COMPONENTS/ModalPopup",
	component: ModalPopup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		control: { isOpen: false, onClose: () => {} },
	},
} satisfies Meta<typeof ModalPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
	args: { control: { isOpen: false, onClose: () => {}, size: "small" } },
	render: ({ control }) => <ModalTemplate control={control} />,
};

export const Medium: Story = {
	args: { control: { isOpen: false, onClose: () => {}, size: "medium" } },
	render: ({ control }) => <ModalTemplate control={control} />,
};

export const Large: Story = {
	args: { control: { isOpen: false, onClose: () => {}, size: "large" } },
	render: ({ control }) => <ModalTemplate control={control} />,
};

export const Fullscreen: Story = {
	args: { control: { isOpen: false, onClose: () => {}, size: "fullscreen" } },
	render: ({ control }) => <ModalTemplate control={control} />,
};

export const WithTitle: Story = {
	args: { control: { isOpen: false, onClose: () => {}, title: "Modal Title", size: "medium" } },
	render: ({ control }) => <ModalTemplate control={control} />,
};

export const WithFooter: Story = {
	args: { control: { isOpen: false, onClose: () => {}, title: "Modal with Footer", size: "medium" } },
	render: ({ control }) => (
		<ModalTemplate
			control={{
				...control,
				footerButtons: (
					<>
						<Button color="secondary" onClick={() => {}}>
							Cancel
						</Button>
						<Button color="primary" onClick={() => {}}>
							Confirm
						</Button>
					</>
				),
			}}
		/>
	),
};

export const CustomContent: Story = {
	args: { control: { isOpen: false, onClose: () => {}, title: "Custom Content Modal", size: "large" } },
	render: ({ control }) => (
		<ModalTemplate control={control}>
			<div style={{ padding: "20px" }}>
				<h3>Custom Content</h3>
				<p>This modal contains custom content with different styling and layouts.</p>
				<div style={{ display: "flex", gap: "10px", justifyContent: "space-between" }}>
					<div style={{ flex: 1, padding: "10px", background: "#2a2a2a" }}>Column 1</div>
					<div style={{ flex: 1, padding: "10px", background: "#2a2a2a" }}>Column 2</div>
				</div>
			</div>
		</ModalTemplate>
	),
};

export const WithForm: Story = {
	args: { control: { isOpen: false, onClose: () => {} } },
	render: () => {
		const [isOpen, setIsOpen] = useState(false);
		const [name, setName] = useState("");
		const [email, setEmail] = useState("");
		const [role, setRole] = useState("");
		const [message, setMessage] = useState("");
		const [notify, setNotify] = useState(true);
		const [submitted, setSubmitted] = useState(false);

		const nameError = submitted && !name.trim() ? "Name is required" : undefined;
		const emailError = submitted && !email.includes("@") ? "Enter a valid email" : undefined;

		const handleSubmit = () => {
			setSubmitted(true);
			if (name.trim() && email.includes("@")) {
				setIsOpen(false);
				setSubmitted(false);
			}
		};

		return (
			<div style={{ padding: 20 }}>
				<Button color="secondary" onClick={() => setIsOpen(true)}>
					Send invite
				</Button>
				<ModalPopup
					control={{
						isOpen,
						onClose: () => setIsOpen(false),
						title: "Invite team member",
						size: "small",
						footerButtons: (
							<>
								<Button color="transparent" onClick={() => setIsOpen(false)}>
									Cancel
								</Button>
								<Button color="secondary" onClick={handleSubmit}>
									Send invite
								</Button>
							</>
						),
					}}
				>
					<Form gap={14}>
						<Input
							label="Full name"
							value={name}
							onChange={setName}
							placeholder="Jane Doe"
							faIcon={faUser}
							error={nameError}
						/>
						<Input
							label="Email"
							type="email"
							value={email}
							onChange={setEmail}
							placeholder="jane@example.com"
							faIcon={faEnvelope}
							error={emailError}
						/>
						<Select
							label="Role"
							value={role}
							onChange={setRole}
							placeholder="Select a role"
							options={[
								{ value: "viewer", label: "Viewer" },
								{ value: "editor", label: "Editor" },
								{ value: "admin", label: "Admin" },
							]}
						/>
						<Textarea
							label="Personal message (optional)"
							value={message}
							onChange={setMessage}
							placeholder="Add a welcome note..."
							rows={3}
						/>
						<Toggle checked={notify} onChange={setNotify} label="Notify via email" />
					</Form>
				</ModalPopup>
			</div>
		);
	},
};

export const Interactive: Story = {
	args: { control: { isOpen: false, onClose: () => {} } },
	render: () => {
		const [isOpen, setIsOpen] = useState(false);

		return (
			<div style={{ padding: "20px" }}>
				<Button color="primary" onClick={() => setIsOpen(true)}>
					Open Interactive Modal
				</Button>
				<ModalPopup
					control={{
						isOpen,
						onClose: () => setIsOpen(false),
						title: "Interactive Modal",
						size: "medium",
						footerButtons: (
							<Button color="primary" onClick={() => setIsOpen(false)}>
								Close
							</Button>
						),
					}}
				>
					<div style={{ padding: "20px" }}>
						<p>This modal demonstrates:</p>
						<ul>
							<li>Clicking outside closes the modal</li>
							<li>Pressing Escape closes the modal</li>
							<li>Custom footer buttons</li>
							<li>Interactive content</li>
						</ul>
					</div>
				</ModalPopup>
			</div>
		);
	},
};
