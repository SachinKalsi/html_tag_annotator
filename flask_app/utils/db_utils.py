import sqlite3
db_file_name = "published_date_data.sqlite"

class DBObject():

    def __init__(self):
        self.conn = sqlite3.connect(db_file_name)
        self.cur = self.conn.cursor()

    def close(self):
        self.conn.close()

    def get_data_by_url(self, url):
        self.cur.execute("select id from annotated_data where url = (?)", (url,))
        data = self.cur.fetchall()
        if data:
            return dict(zip(['id'], data[0]))
        return None

    def upsert_data_info(self, data):
        """
        :param data: html, url, selected_contents, selected_contents_text
        :return:
        """
        html = data['html']
        url = data['url']
        selected_contents = '$$_$$ '.join(data['selected_contents']) # intentionally the seperator has kept as "$$_$$"
        selected_contents_text = ', '.join(data['selected_contents_text'])
        try:
            data_id = self.get_data_by_url(url)
            if data_id:
                data_id = data_id['id']
            update_query = """UPDATE annotated_data set html=?, selected_contents=?, selected_contents_text=? where url=?"""
            self.cur.execute(update_query, (html, selected_contents, selected_contents_text, url))
            if self.cur.rowcount:
                self.conn.commit()
                return True, "updated successfully";
            insert_query = """INSERT into annotated_data (url, html, selected_contents, selected_contents_text) values (?, ?, ?, ?)"""
            try:
                self.cur.execute(insert_query, (url, html, selected_contents, selected_contents_text));
                self.conn.commit()
                return True, "inserted successfully"
            except Exception as e:
                return True, "failed to insert"
        except Exception as e:
            print(e)
            return False, str(e)