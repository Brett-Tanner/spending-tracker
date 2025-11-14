import type { RefObject } from "react";
import { PlusIcon } from "../../shared/Icons/PlusIcon";
import { BubbleMenuItem } from "./BubbleMenuItem";

export interface AddTransactionProps {
	dialogRef: RefObject<HTMLDialogElement | null>;
}

export function AddTransactionButton({ dialogRef }: AddTransactionProps) {
	const onClick = () => {
		if (!dialogRef.current) return;

		dialogRef.current.showModal();
	};

	return (
		<>
			<BubbleMenuItem order={2} onClick={onClick}>
				<PlusIcon />
			</BubbleMenuItem>
		</>
	);
}
