import type { Meta, StoryObj } from "@storybook/react";
import ToastStack, { useCreateToast } from ".";
import Button from "../Button";
import {
	faInfoCircle,
	faCheckCircle,
	faExclamationTriangle,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import "../../index.css";

const meta: Meta<typeof ToastStack> = {
	title: "Components/ToastStack",
	component: ToastStack,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToastStack>;

export const BasicUsage: Story = {
	render: () => {
		const DemoComponent = () => {
			const {
				createToast,
				createInfoToast,
				createSuccessToast,
				createWarningToast,
				createErrorToast,
			} = useCreateToast();

			return (
				<div
					style={{
						padding: "20px",
						display: "flex",
						gap: "10px",
						flexDirection: "column",
					}}
				>
					<h3>Toast Stack Demo</h3>
					<p>сюда слыш. жми кароче и будет нотификейшн</p>

					<div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
						<Button
							color="primary"
							onClick={() =>
								createInfoToast({
									children: "This is an info message",
									icon: faInfoCircle,
									duration: 3000,
								})
							}
						>
							Info Toast
						</Button>

						<Button
							color="good"
							onClick={() =>
								createSuccessToast({
									children: "Configuration reloaded!",
									icon: faCheckCircle,
									duration: 3000,
								})
							}
						>
							Success Toast
						</Button>

						<Button
							color="danger"
							onClick={() =>
								createWarningToast({
									children:
										"1 duplicate property in the configuration: examine the log output",
									icon: faExclamationTriangle,
									duration: 5000,
								})
							}
						>
							Warning Toast
						</Button>

						<Button
							color="bad"
							onClick={() =>
								createErrorToast({
									children:
										"Failed to fetch configuration: examine the log output",
									icon: faXmarkCircle,
									duration: 0,
								})
							}
						>
							Error Toast
						</Button>
					</div>

					<Button
						color="secondary"
						onClick={() => {
							createToast({
								children: "First toast",
								type: "info",
								position: "top-right",
								duration: 2000,
							});

							setTimeout(() => {
								createToast({
									children: "Second toast appears after delay",
									type: "success",
									position: "top-right",
									duration: 2000,
								});
							}, 500);
						}}
					>
						Multiple Toasts
					</Button>

					<Button
						color="transparent"
						onClick={() => {
							createToast({
								children: "This toast is at bottom-left",
								type: "info",
								position: "bottom-left",
								icon: faInfoCircle,
								duration: 3000,
							});
						}}
					>
						Bottom-Left Toast
					</Button>
				</div>
			);
		};

		return (
			<ToastStack>
				<DemoComponent />
			</ToastStack>
		);
	},
};

export const DifferentPositions: Story = {
	render: () => {
		const PositionDemo = () => {
			const { createToast } = useCreateToast();

			return (
				<div style={{ padding: "20px" }}>
					<h3>Toast Position Demo</h3>
					<p>Create toasts in different screen positions</p>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "repeat(3, 1fr)",
							gap: "10px",
						}}
					>
						{(
							[
								"top-left",
								"top-center",
								"top-right",
								"bottom-left",
								"bottom-center",
								"bottom-right",
							] as const
						).map((position) => (
							<Button
								key={position}
								onClick={() =>
									createToast({
										children: `Toast at ${position}`,
										type: "info",
										position,
										duration: 3000,
									})
								}
							>
								{position}
							</Button>
						))}
					</div>
				</div>
			);
		};

		return (
			<ToastStack>
				<PositionDemo />
			</ToastStack>
		);
	},
};

export const CustomContent: Story = {
	render: () => {
		const CustomDemo = () => {
			const { createToast } = useCreateToast();

			return (
				<div style={{ padding: "20px" }}>
					<h3>Custom Toast Content</h3>

					<Button
						color="primary"
						onClick={() =>
							createToast({
								children: (
									<div>
										<h4>Custom Content</h4>
										<p>This toast has rich HTML content</p>
										<small>With multiple elements</small>
									</div>
								),
								type: "info",
								duration: 5000,
							})
						}
					>
						Rich Content Toast
					</Button>

					<Button
						color="secondary"
						onClick={() =>
							createToast({
								children: "Toast with custom image",
								iconUrl: "https://placehold.co/30x30/png",
								type: "success",
								duration: 3000,
							})
						}
					>
						Image Icon Toast
					</Button>

					<Button
						color="good"
						onClick={() =>
							createToast({
								children:
									"This is a very long toast message that demonstrates how the toast handles multi-line content and wrapping. It should maintain good readability even with longer text.",
								type: "info",
								duration: 5000,
							})
						}
					>
						Long Message Toast
					</Button>
				</div>
			);
		};

		return (
			<ToastStack>
				<CustomDemo />
			</ToastStack>
		);
	},
};
