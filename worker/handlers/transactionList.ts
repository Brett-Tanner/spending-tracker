const baseListQuery = `
  SELECT
    transactions.amount, transactions.date, transactions.description,
	users.name AS user, categories.name AS category
  FROM transactions
  INNER JOIN categories ON categories.id = category_id
  INNER JOIN users ON users.id = user_id
  ORDER BY date DESC;
`;

export async function handleTransactionList(db: D1Database) {
	const { results } = await db.prepare(baseListQuery).run();

	return Response.json(results);
}
