import type { PropsWithChildren } from "react";

interface BubbleMenuItemProps {
	order: number;
	onClick: () => void;
}

export function BubbleMenuItem({
	order,
	onClick,
	children,
}: PropsWithChildren<BubbleMenuItemProps>) {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{ "--order": order } as React.CSSProperties}
			className="bubble-menu-item"
		>
			{children}
		</button>
	);
}
