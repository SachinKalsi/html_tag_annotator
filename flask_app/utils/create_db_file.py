# NOTE

# ---------------------
# EXECUTE ONLY ONCE    |
# ---------------------

import sqlite3
db_file_name = "published_date_data.sqlite"

create_data_query = """CREATE TABLE annotated_data(
id INTEGER PRIMARY KEY AUTOINCREMENT,
url TEXT NOT NULL UNIQUE,
html TEXT NOT NULL,
selected_contents TEXT NOT NULL,
selected_contents_text TEXT NOT NULL,
is_computed INTEGER NOT NULL DEFAULT 0,
is_annotable INTEGER NOT NULL DEFAULT 0,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP)
"""

conn = sqlite3.connect(db_file_name)
cur = conn.cursor()

cur.execute(create_data_query)

conn.commit()
conn.close()
