CREATE TABLE IF NOT EXISTS transactions (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	amount INTEGER,
	category_id INTEGER,
	date INTEGER,
	description TEXT,
	user_id INTEGER,

	FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT
);
