interface HandleTransactionsParams {
	db: D1Database;
	request: Request;
}

export async function handleTransactions({
	db,
	request,
}: HandleTransactionsParams) {
	switch (request.method) {
		case "GET":
			return getTransactions(db);
		case "POST":
			return createTransaction({ db, request });
		default:
			return new Response(null, { status: 404 });
	}
}

async function getTransactions(db: D1Database) {
	const query = `
	  SELECT
		transactions.amount, transactions.date, transactions.description,
		transactions.id, users.name AS user, categories.name AS category
	  FROM transactions
	  INNER JOIN categories ON categories.id = category_id
	  INNER JOIN users ON users.id = user_id
	  ORDER BY date DESC;
	`;

	const { results } = await db.prepare(query).run();
	return Response.json(results);
}

interface CreateTransactionBody {
	amount: number;
	categoryId: number;
	date: number;
	description: string;
	userId: number;
}

async function createTransaction({ db, request }: HandleTransactionsParams) {
	const query = `
		INSERT INTO transactions
		  (amount, date, description, user_id, category_id)
		VALUES
		  (?1, ?2, ?3, ?4, ?5);
	`;
	const { amount, date, description, categoryId, userId } =
		(await request.json()) as CreateTransactionBody;

	const { success, results, meta } = await db
		.prepare(query)
		.bind(amount, date, description, userId, categoryId)
		.run();

	if (success) return Response.json({ results, success, id: meta.last_row_id });

	return Response.json({ status: 500 });
}
