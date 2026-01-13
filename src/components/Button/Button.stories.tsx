import type { Meta, StoryObj } from "@storybook/react";
import {
	faHome,
	faCheck,
	faTrash,
	faUser,
	faMoon,
	faCog,
	faSuperscript,
	faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import Button from ".";
import "./styles.css";
import "../../index.css";

// 1. Конфигурация компонента (Meta)
const meta = {
	title: "COMPONENTS/Button", // Название в боковой панели Storybook
	component: Button,
	parameters: {
		layout: "centered", // Центрируем кнопку на экране
	},
	tags: ["autodocs"], // Автоматически генерирует страницу Docs
	argTypes: {
		// Настройка контролов (элементов управления) в Storybook
		fill: { control: "boolean" },
		disabled: { control: "boolean" },
		onClick: { action: "clicked" }, // Логирует клики во вкладке Actions
		// Для иконок лучше скрыть сложный контрол или сделать выбор из списка (опционально)
		faIcon: { control: false },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 2. Истории (Stories)

// Базовая кнопка
export const Default: Story = {
	args: {
		children: "Sample Button",
	},
};

// Контрастная (синяя)
export const Contrast: Story = {
	args: {
		children: "Contrast Button",
		color: "secondary",
	},
};

// С иконкой FontAwesome
export const WithIcon: Story = {
	args: {
		children: "Icon Button",
		faIcon: faHome,
	},
};

// Только иконка (без текста)
export const IconOnly: Story = {
	args: {
		faIcon: faTrash,
		fill: true,
	},
};

// С картинкой (используя ваш проп href как src)
export const WithImage: Story = {
	args: {
		children: "With Image",
		href: "https://placehold.co/20x20/png",
	},
};

// Заблокированная (Disabled)
export const Disabled: Story = {
	args: {
		children: "Forbidden",
		disabled: true,
		fill: true,
	},
};

export const Bad: Story = {
	args: {
		children: "Discard",
		color: "bad",
	},
};

export const Good: Story = {
	args: {
		children: "Confirm",
		color: "good",
	},
};

export const Transparent: Story = {
	args: {
		children: "Transparent",
		color: "transparent",
	},
};

export const Tiny: Story = {
	args: {
		faIcon: faMoon,
		tiny: true,
	},
};

export const Keyboard: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
			<div style={{ display: "flex", gap: "5px" }}>
				<Button tiny keyboard>
					⌘
				</Button>
				+
				<Button tiny keyboard>
					R
				</Button>
			</div>
			<div style={{ display: "flex", gap: "5px" }}>
				<Button tiny keyboard>
					Alt
				</Button>
				+
				<Button tiny keyboard>
					Shift
				</Button>
			</div>
		</div>
	),
};

export const ButtonGroup: Story = {
	// Вместо просто args, мы используем функцию render
	render: () => (
		<div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
			{/* Ряд обычных кнопок */}
			<div style={{ display: "flex", gap: "10px" }}>
				<Button color="primary">Action</Button>
				<Button color="transparent">Action</Button>
				<Button color="secondary" fill>
					Submit
				</Button>
			</div>

			{/* Ряд статусных кнопок */}
			<div style={{ display: "flex", gap: "10px" }}>
				<Button color="good">Approve</Button>
				<Button color="bad">Reject</Button>
				<Button color="danger">Warning</Button>
			</div>

			<div style={{ display: "flex", gap: "10px" }}>
				<Button tiny faIcon={faMoon} />
				<Button tiny color="bad" faIcon={faTrash} />
				<Button tiny color="danger" faIcon={faCog} />
				<Button tiny color="good" faIcon={faCheck} />
				<Button tiny color="secondary" fill faIcon={faCheck}>
					Tiny Text
				</Button>
			</div>
		</div>
	),
};
