import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "./components/Button";
import Badge from "./components/Badge";
import Input from "./components/Input";
import Textarea from "./components/Textarea";
import Select from "./components/Select";
import Toggle from "./components/Toggle";
import Accordion, { AccordionSection } from "./components/Accordion";
import Tooltip from "./components/Tooltip";
import ToastStack, { useCreateToast } from "./components/ToastStack";
import ModalPopup from "./components/ModalPopup";
import {
	faUser,
	faBell,
	faTrash,
	faCog,
	faCheck,
	faCheckCircle,
	faInfoCircle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const Cell = ({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			gap: "8px",
			padding: "16px",
			border: "1px solid var(--color-border-primary)",
			borderRadius: "10px",
			background: "var(--color-bg-secondary)",
			minWidth: 0,
		}}
	>
		<span
			style={{
				fontSize: "11px",
				textTransform: "uppercase",
				letterSpacing: "0.08em",
				color: "var(--color-text-secondary)",
				fontWeight: 600,
			}}
		>
			{label}
		</span>
		<div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
			{children}
		</div>
	</div>
);

const OverviewInner = () => {
	const [inputVal, setInputVal] = useState("");
	const [textareaVal, setTextareaVal] = useState("");
	const [selectVal, setSelectVal] = useState("");
	const [toggle, setToggle] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const { createSuccessToast, createErrorToast, createInfoToast } = useCreateToast();

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				gap: "12px",
				padding: "24px",
				maxWidth: "860px",
				background: "var(--color-bg-primary)",
				borderRadius: "14px",
				border: "1px solid var(--color-border-primary)",
			}}
		>
			<Cell label="Button">
				<Button>Button</Button>
				<Button color="contrast">Contrast</Button>
				<Button color="good">Good</Button>
				<Button color="bad">Bad</Button>
				<Button color="secondary" faIcon={faCog} />
			</Cell>

			<Cell label="Badge">
				<Badge src="https://placehold.co/20x20/png">GitHub</Badge>
				<Badge src="https://placehold.co/20x20/png" contrast>Steam</Badge>
				<Badge src="https://placehold.co/20x20/png" small>v1.0</Badge>
			</Cell>

			<Cell label="Tooltip">
				<Tooltip text=":trash:">
					<Button tiny faIcon={faTrash} color="bad" />
				</Tooltip>
				<Tooltip text=":cog:">
					<Button tiny faIcon={faCog} />
				</Tooltip>
				<Tooltip text=":check:">
					<Button tiny faIcon={faCheck} color="good" />
				</Tooltip>
			</Cell>

			<Cell label="Input">
				<div style={{ width: "100%" }}>
					<Input
						label="Name"
						value={inputVal}
						onChange={setInputVal}
						placeholder="Jane Doe"
						faIcon={faUser}
					/>
				</div>
			</Cell>

			<Cell label="Textarea">
				<div style={{ width: "100%" }}>
					<Textarea
						label="Message"
						value={textareaVal}
						onChange={setTextareaVal}
						placeholder="Write something..."
						rows={2}
					/>
				</div>
			</Cell>

			<Cell label="Select">
				<div style={{ width: "100%" }}>
					<Select
						label="Role"
						value={selectVal}
						onChange={setSelectVal}
						placeholder="Pick one"
						options={[
							{ value: "viewer", label: "Viewer" },
							{ value: "editor", label: "Editor" },
							{ value: "admin", label: "Admin" },
						]}
					/>
				</div>
			</Cell>

			<Cell label="Toggle">
				<Toggle checked={toggle} onChange={setToggle} label="Enable notifications" />
			</Cell>

			<Cell label="Toast">
				<Button
					tiny
					faIcon={faInfoCircle}
					onClick={() =>
						createInfoToast({ children: "Info message", icon: faInfoCircle, duration: 3000 })
					}
				/>
				<Button
					tiny
					color="good"
					faIcon={faCheckCircle}
					onClick={() =>
						createSuccessToast({ children: "Done!", icon: faCheckCircle, duration: 3000 })
					}
				/>
				<Button
					tiny
					color="bad"
					faIcon={faXmarkCircle}
					onClick={() =>
						createErrorToast({ children: "Something went wrong", icon: faXmarkCircle })
					}
				/>
			</Cell>

			<Cell label="Modal">
				<Button color="primary" faIcon={faBell} onClick={() => setModalOpen(true)}>
					Open
				</Button>
				<ModalPopup
					control={{
						isOpen: modalOpen,
						onClose: () => setModalOpen(false),
						title: "Modal Preview",
						size: "small",
						footerButtons: (
							<>
								<Button color="transparent" onClick={() => setModalOpen(false)}>Cancel</Button>
								<Button color="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
							</>
						),
					}}
				>
					<p>Modal content goes here.</p>
				</ModalPopup>
			</Cell>

			<div style={{ gridColumn: "1 / -1" }}>
				<Accordion mode="single">
					<AccordionSection eventKey="what" title="Section 1">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium alias, veritatis mollitia consectetur tempore totam cum error eum earum amet facere recusandae aliquam, asperiores debitis odit necessitatibus! Ut, quis a!
						Possimus, architecto? Rem, dolorum? Natus iste asperiores pariatur aut, delectus officia saepe enim minus numquam distinctio voluptate reiciendis ducimus illo laboriosam? Debitis in maxime voluptatem eligendi assumenda illo consequuntur inventore!
					</AccordionSection>
					<AccordionSection eventKey="theme" title="Section 2">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nihil repellendus veritatis molestias possimus, alias obcaecati neque rem explicabo, cumque tenetur iste ipsum dolorum vero, velit laboriosam odit commodi? Id.
					</AccordionSection>
				</Accordion>
			</div>
		</div>
	);
};

const Overview = () => (
	<ToastStack>
		<OverviewInner />
	</ToastStack>
);

const meta: Meta = {
	title: "Overview",
	component: Overview,
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const Showcase: StoryObj = {
	render: () => <Overview />,
};
