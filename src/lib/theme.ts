type Theme = "light" | "dark";

export function changeThemeTo(theme: Theme) {
	document.documentElement.style.colorScheme = theme;
	localStorage.setItem("theme", theme);
}

export function currentTheme(): Theme {
	const theme =
		localStorage.getItem("theme") ||
		getComputedStyle(document.documentElement).colorScheme;

	if (theme === "light" || theme === "dark") return theme;

	return "dark";
}

export function toggleTheme() {
	const theme = currentTheme();
	theme === "light" ? changeThemeTo("dark") : changeThemeTo("light");
}
