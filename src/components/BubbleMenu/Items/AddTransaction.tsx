import type { Dispatch, RefObject, SetStateAction } from "react";
import { PlusIcon } from "../../shared/Icons/PlusIcon";
import { BubbleMenuItem } from "./BubbleMenuItem";

export interface AddTransactionProps {
	dialogRef: RefObject<HTMLDialogElement | null>;
	setBubblemenuOpen: Dispatch<SetStateAction<boolean>>;
}

export function AddTransactionButton({
	dialogRef,
	setBubblemenuOpen,
}: AddTransactionProps) {
	const onClick = () => {
		if (!dialogRef.current) return;

		dialogRef.current.showModal();
		setBubblemenuOpen(false);
	};

	return (
		<>
			<BubbleMenuItem order={2} onClick={onClick}>
				<PlusIcon />
			</BubbleMenuItem>
		</>
	);
}
