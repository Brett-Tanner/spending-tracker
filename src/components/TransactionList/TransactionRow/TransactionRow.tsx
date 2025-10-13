import { shortDate } from "../../../lib/shortDate";
import { toYen } from "../../../lib/toYen";
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
			<p className="user">{transaction.user[0]}</p>
			<p className="date">{shortDate(transaction.date)}</p>
			<p className="description">{transaction.description}</p>
			<p className="amount">{toYen(transaction.amount)}</p>
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
