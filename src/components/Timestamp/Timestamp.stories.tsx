import type { Meta, StoryObj } from "@storybook/react";
import Timestamp from "."; // Убедитесь, что импорт правильный (index.tsx или Timestamp.tsx)
import "./styles.css"; // Если у него есть свои стили
import "../../index.css"; // Глобальные стили (переменные цветов)

const meta = {
	title: "COMPONENTS/Timestamp",
	component: Timestamp,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		// Предполагаем, что компонент принимает ts (число или строку)
		ts: { control: "date" }, // Позволит выбирать дату в UI
		// Если есть проп format (например "long", "short")
		// format: { control: 'select', options: ['full', 'date-only', 'time-only'] }
	},
} satisfies Meta<typeof Timestamp>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Stories ---

// Текущее время
export const Now: Story = {
	args: {
		ts: String(new Date().getTime()), // Передаем текущий timestamp (число)
	},
};

// Прошлая дата (статичная, для скриншот-тестов полезна)
export const PastDate: Story = {
	args: {
		// 1 Января 2025, 12:00:00
		ts: "1735732800000",
	},
};

// Будущая дата
export const FutureDate: Story = {
	args: {
		// 1 Января 2030
		ts: "1893456000000",
	},
};

// Если компонент поддерживает строку ISO
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
