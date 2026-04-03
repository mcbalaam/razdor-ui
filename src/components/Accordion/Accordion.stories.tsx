import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Accordion, { AccordionSection } from ".";

const meta = {
	title: "Components/Accordion",
	component: Accordion,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		mode: { control: "select", options: ["single", "multi"] },
	},
	args: {
		mode: "single",
	},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
	{
		key: "s1",
		title: "General",
		content: <div>Some general settings content.</div>,
	},
	{
		key: "s2",
		title: "Security",
		content: <div>Manage security-related preferences.</div>,
	},
	{
		key: "s3",
		title: "Appearance",
		content: <div>Theme and appearance options.</div>,
		disabled: true,
	},
];

export const SingleDefaultOpen: Story = {
	args: {
		mode: "single",
		items,
		defaultOpenKeys: ["s2"],
	},
	render: (args) => <Accordion {...args} />,
};

export const MultiControlled: Story = {
	args: {
		mode: "multi",
		items,
		defaultOpenKeys: ["s1"],
	},
	render: (args) => {
		const [openKeys, setOpenKeys] = useState<string[]>(["s1"]);
		return <Accordion {...args} openKeys={openKeys} onChange={setOpenKeys} />;
	},
};

export const ChildrenSlot: Story = {
	args: {
		mode: "single",
		defaultOpenKeys: ["c2"],
	},
	render: (args) => (
		<Accordion {...args}>
			<AccordionSection eventKey="c1" title="Step 1">
				<div>Content for step 1.</div>
			</AccordionSection>
			<AccordionSection eventKey="c2" title="Step 2">
				<div>Content for step 2.</div>
			</AccordionSection>
			<AccordionSection eventKey="c3" title="Step 3" disabled>
				<div>Disabled section content.</div>
			</AccordionSection>
		</Accordion>
	),
};

