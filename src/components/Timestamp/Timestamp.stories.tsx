import type { Meta, StoryObj } from "@storybook/react";
import Timestamp from ".";
import "./styles.css";
import "../../index.css";
const meta = {
	title: "COMPONENTS/Timestamp",
	component: Timestamp,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		ts: { control: "date" },
	},
} satisfies Meta<typeof Timestamp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Now: Story = {
	args: {
		ts: String(new Date().getTime()),
	},
};

export const PastDate: Story = {
	args: {
		ts: "1735732800000",
	},
};


export const FutureDate: Story = {
	args: {
		ts: "1893456000000",
	},
};

export const ISOString: Story = {
	args: {
		ts: "2025-10-15T14:30:00Z",
	},
};

export const WithContext: Story = {
	render: (args) => (
		<div>
			Создано в <Timestamp {...args} />
		</div>
	),
	args: {
		ts: String(Date.now()),
	},
};
