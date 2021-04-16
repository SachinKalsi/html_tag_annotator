from flask import render_template, jsonify
import math
from utils.db_utils import DBObject

def insert_data_info(data):
    """
    :param data: html, url, selected_contents, selected_contents_text
    :return:
    """
    db = DBObject()
    success, message = db.upsert_data_info(data)
    db.close()
    return jsonify({'success': success, 'message': message})