import type { Transaction } from "../../../types/transaction";
import { CrossIcon } from "../../shared/Icons/CrossIcon";
import { EditIcon } from "../../shared/Icons/EditIcon";
import { Loading } from "../../shared/Loading";

interface TransactionRowProps {
	transaction: Transaction;
}

function onEdit() { }

export function TransactionRow({ transaction }: TransactionRowProps) {
	return (
		<div className="transaction-row">
			<p>{transaction.user[0]}</p>
			<p className="date">{transaction.date.toISOString()}</p>
			<p className="description">{transaction.description}</p>
			<p className="amount">{transaction.amount}</p>
			<button
				aria-label="Edit"
				disabled={transaction.status !== "completed"}
				onClick={onEdit}
			>
				<StatusIcon status={transaction.status} />
			</button>
		</div>
	);
}

interface StatusIconProps {
	status: Transaction["status"];
}

function StatusIcon({ status }: StatusIconProps) {
	switch (status) {
		case "completed":
			return <EditIcon />;
		case "loading":
			return <Loading />;
		case "error":
			return <CrossIcon />;
		default:
			return <>{status}</>;
	}
}
