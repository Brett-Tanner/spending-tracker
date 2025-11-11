import { useRef } from "react";
import { PlusIcon } from "../../shared/Icons/PlusIcon";
import { BubbleMenuItem } from "./BubbleMenuItem";
import { TransactionDialog } from "../../shared/TransactionDialog/TransactionDialog";
import type { Category } from "../../../types/category";
import type { User } from "../../../types/user";
import type { FormValues } from "../../../types/form";

interface AddTransactionProps {
	categories: Category[];
	users: User[];
	addTransaction: (v: FormValues) => void;
}

export function AddTransactionButton({
	categories,
	users,
	addTransaction,
}: AddTransactionProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	const onClick = () => {
		if (!dialogRef.current) return;

		dialogRef.current.showModal();
	};

	return (
		<>
			<BubbleMenuItem order={2} onClick={onClick}>
				<PlusIcon />
			</BubbleMenuItem>
			<TransactionDialog
				ref={dialogRef}
				categories={categories}
				users={users}
				submitCallback={addTransaction}
			/>
		</>
	);
}
