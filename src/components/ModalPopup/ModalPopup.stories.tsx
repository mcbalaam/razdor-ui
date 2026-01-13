import type { Meta, StoryObj } from "@storybook/react";
import ModalPopup, { type ModalControl } from "./";
import { useState } from "react";
import Button from "../Button";

const ModalTemplate = ({ control }: { control: ModalControl }) => {
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
				<p>This is the modal content.</p>
				<p>It can contain any React elements or components.</p>
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
	argTypes: {
		control: {
			control: { type: "object" },
		},
	},
} satisfies Meta<typeof ModalPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
	render: () => (
		<ModalTemplate
			control={{
				isOpen: true,
				onClose: () => {},
				size: "small",
			}}
		/>
	),
};

export const Medium: Story = {
	render: () => (
		<ModalTemplate
			control={{
				isOpen: true,
				onClose: () => {},
				size: "medium",
			}}
		/>
	),
};

export const Large: Story = {
	render: () => (
		<ModalTemplate
			control={{
				isOpen: true,
				onClose: () => {},
				size: "large",
			}}
		/>
	),
};

export const Fullscreen: Story = {
	render: () => (
		<ModalTemplate
			control={{
				isOpen: true,
				onClose: () => {},
				size: "fullscreen",
			}}
		/>
	),
};

export const WithTitle: Story = {
	render: () => (
		<ModalTemplate
			control={{
				isOpen: true,
				onClose: () => {},
				title: "Modal Title",
				size: "medium",
			}}
		/>
	),
};

export const WithFooter: Story = {
	render: () => (
		<ModalTemplate
			control={{
				isOpen: true,
				onClose: () => {},
				title: "Modal with Footer",
				size: "medium",
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
	render: () => (
		<ModalTemplate
			control={{
				isOpen: true,
				onClose: () => {},
				title: "Custom Content Modal",
				size: "large",
			}}
		>
			<div style={{ padding: "20px" }}>
				<h3>Custom Content</h3>
				<p>
					This modal contains custom content with different styling and layouts.
				</p>
				<div
					style={{
						display: "flex",
						gap: "10px",
						justifyContent: "space-between",
					}}
				>
					<div style={{ flex: 1, padding: "10px", background: "#2a2a2a" }}>
						Column 1
					</div>
					<div style={{ flex: 1, padding: "10px", background: "#2a2a2a" }}>
						Column 2
					</div>
				</div>
			</div>
		</ModalTemplate>
	),
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
      setIsOpen(false);
    };

    return (
      <div style={{ padding: "20px" }}>
        <Button color="primary" onClick={() => setIsOpen(true)}>
          Open Interactive Modal
        </Button>
        <ModalPopup
          control={{
            isOpen,
            onClose: handleClose,
            title: "Interactive Modal",
            size: "medium",
            footerButtons: (
              <Button color="primary" onClick={handleClose}>
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
            <input
              type="text"
              placeholder="You can interact with form elements"
              style={{
                width: "100%",
                padding: "8px",
                background: "#3a3a3a",
                border: "1px solid #555",
                color: "white",
                borderRadius: "4px",
              }}
            />
          </div>
        </ModalPopup>
      </div>
    );
  },
};
