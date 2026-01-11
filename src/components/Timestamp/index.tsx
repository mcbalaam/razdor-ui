import { useEffect, useState } from "react";
import "./styles.css";
import Tooltip from "../Tooltip";

interface TimestampProps {
	ts: string;
}

export default function Timestamp({ ts }: TimestampProps) {
	const [date, setDate] = useState<Date>(new Date());

	const parseTimestamp = (ts: string): Date => {
		const num = Number(ts);

		if (!Number.isNaN(num) && ts.length === 10) {
			return new Date(num * 1000);
		}

		const parsed = new Date(ts);

		if (!Number.isNaN(parsed.getTime())) {
			return parsed;
		}
		return new Date();
	};

	useEffect(() => {
		setDate(parseTimestamp(ts));
	}, [ts]);

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(parseTimestamp(ts));
		}, 60000);

		return () => clearInterval(interval);
	}, [ts]);

	const shortTime = date.toLocaleString("en-UK", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	const fullDateTime = date.toLocaleString("en-UK", {
		weekday: "short",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});

	return (
		<Tooltip text={fullDateTime}>
			<span className="timestamp">{shortTime}</span>
		</Tooltip>
	);
}
