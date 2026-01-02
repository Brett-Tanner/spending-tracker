import { useState, type Dispatch, type SetStateAction } from "react";
import { currentTheme, toggleTheme } from "../../../lib/theme";
import { DarkIcon } from "../../shared/Icons/DarkIcon";
import { LightIcon } from "../../shared/Icons/LightIcon";
import { BubbleMenuItem } from "./BubbleMenuItem";

interface ThemeToggleProps {
	setBubblemenuOpen: Dispatch<SetStateAction<boolean>>;
}

export function ThemeToggle({ setBubblemenuOpen }: ThemeToggleProps) {
	const [theme, setTheme] = useState(currentTheme());

	const onClick = () => {
		toggleTheme();
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
		setBubblemenuOpen(false);
	};

	return (
		<BubbleMenuItem onClick={onClick} order={1}>
			{theme === "dark" ? <LightIcon /> : <DarkIcon />}
		</BubbleMenuItem>
	);
}
