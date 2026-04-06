import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Form from ".";
import Input from "../Input";
import Textarea from "../Textarea";
import Select from "../Select";
import Toggle from "../Toggle";
import CheckboxGroup from "../CheckboxGroup";
import Button from "../Button";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

const meta = {
	title: "COMPONENTS/Form",
	component: Form,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
	render: () => {
		const [email, setEmail] = useState("");
		const [password, setPassword] = useState("");
		const [remember, setRemember] = useState(false);
		return (
			<div style={{ width: 320 }}>
				<Form onSubmit={() => alert("Submitted!")}>
					<Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" faIcon={faEnvelope} />
					<Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" faIcon={faLock} />
					<Toggle checked={remember} onChange={setRemember} label="Remember me" />
					<Button color="secondary" fill type="submit">Sign in</Button>
				</Form>
			</div>
		);
	},
};

export const Registration: Story = {
	render: () => {
		const [name, setName] = useState("");
		const [email, setEmail] = useState("");
		const [password, setPassword] = useState("");
		const [country, setCountry] = useState("");
		const [bio, setBio] = useState("");
		const [interests, setInterests] = useState<string[]>([]);
		const [newsletter, setNewsletter] = useState(false);

		return (
			<div style={{ width: 360 }}>
				<Form onSubmit={() => alert("Registered!")}>
					<Input label="Full name" value={name} onChange={setName} placeholder="Jane Doe" faIcon={faUser} />
					<Input label="Email" type="email" value={email} onChange={setEmail} placeholder="jane@example.com" faIcon={faEnvelope} />
					<Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" faIcon={faLock} />
					<Select
						label="Country"
						value={country}
						onChange={setCountry}
						placeholder="Select a country"
						options={[
							{ value: "us", label: "United States" },
							{ value: "gb", label: "United Kingdom" },
							{ value: "de", label: "Germany" },
							{ value: "ru", label: "Russia" },
						]}
					/>
					<Textarea label="Bio" value={bio} onChange={setBio} placeholder="Tell us about yourself..." rows={3} />
					<CheckboxGroup
						items={[
							{ value: "tech", label: "Technology" },
							{ value: "design", label: "Design" },
							{ value: "science", label: "Science" },
						]}
						values={interests}
						onChange={setInterests}
					/>
					<Toggle checked={newsletter} onChange={setNewsletter} label="Subscribe to newsletter" />
					<Button color="secondary" fill type="submit">Create account</Button>
				</Form>
			</div>
		);
	},
};

export const WithValidation: Story = {
	render: () => {
		const [email, setEmail] = useState("");
		const [password, setPassword] = useState("");
		const [submitted, setSubmitted] = useState(false);

		const emailError = submitted && !email.includes("@") ? "Enter a valid email" : undefined;
		const passwordError = submitted && password.length < 8 ? "Password must be at least 8 characters" : undefined;

		return (
			<div style={{ width: 320 }}>
				<Form onSubmit={() => setSubmitted(true)}>
					<Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" faIcon={faEnvelope} error={emailError} />
					<Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" faIcon={faLock} error={passwordError} />
					<Button color="secondary" fill type="submit">Submit</Button>
				</Form>
			</div>
		);
	},
};
