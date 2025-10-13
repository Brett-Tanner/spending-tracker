export function shortDate(date: Date) {
	return `${date.toLocaleString(undefined, { weekday: "short" })} ${date.getDate()}`;
}
