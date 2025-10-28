import { useState } from "react";
import { currentTheme, toggleTheme } from "../../../lib/theme";
import { DarkIcon } from "../../shared/Icons/DarkIcon";
import { LightIcon } from "../../shared/Icons/LightIcon";
import { BubbleMenuItem } from "./BubbleMenuItem";

export function ThemeToggle() {
	const [theme, setTheme] = useState(currentTheme());

	const onClick = () => {
		toggleTheme();
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return (
		<BubbleMenuItem onClick={onClick} order={1}>
			{theme === "dark" ? <LightIcon /> : <DarkIcon />}
		</BubbleMenuItem>
	);
}
