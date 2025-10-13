export function toYen(amount: number) {
	const localizedAmount = amount.toLocaleString("ja-JP");

	return `${localizedAmount}円`;
}
