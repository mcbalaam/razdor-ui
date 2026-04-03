import ToastStack, { useCreateToast } from ".";
import Button from "../Button";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function App() {
	return (
		<ToastStack maxToasts={5}>
			<DemoComponent />
		</ToastStack>
	);
}

function DemoComponent() {
	const { createToast, createInfoToast, createSuccessToast } = useCreateToast();

	return (
		<div style={{ padding: "20px", display: "flex", gap: "10px" }}>
			<Button
				color="primary"
				onClick={() =>
					createInfoToast({
						children: "Info message",
						icon: faInfoCircle,
						duration: 3000,
					})
				}
			>
				Show Info Toast
			</Button>

			<Button
				color="good"
				onClick={() =>
					createSuccessToast({
						children: "Success message",
						duration: 3000,
					})
				}
			>
				Show Success Toast
			</Button>

			<Button
				color="secondary"
				onClick={() => {
					createToast({
						children: "First toast",
						type: "info",
						position: "top-right",
						duration: 5000,
					});

					setTimeout(() => {
						createToast({
							children: "Second toast (pushes first down)",
							type: "success",
							position: "top-right",
							duration: 5000,
						});
					}, 1000);
				}}
			>
				Show Stacking
			</Button>
		</div>
	);
}

export default App;
