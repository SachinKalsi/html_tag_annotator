# HTML Tag Annotator

This helps in annotating HTML tags of a web page using chrome extension & a flask app.

# How it works?

Annotator consists of 2 components.
1. A chrome extension: This helps in the annotation of HTML tags from a given webpage
2. A Flask app: This helps in storing annotated HTML tag with the help of SQLite.

# Prerequisites
`Python 3.6 and above`

# How to install?

Running Flask app
  1. Clone the Github repo: `git clone https://github.com/sachinkalsi/html_tag_annotator.git`
  2. `pip3 install -r flask_app/requirements.txt`
  3. `python3 flask_app/app.py` to start the server.
  4. Flask server should be running on the port `5000`. Check `http://localhost:5000/` to verify.

Installing Chrome Extension
  1. Goto `chrome://extensions/` in the URL
  2. Click on `Load unpacked` button & choose the `chrome_extension` folder
![Installing Chrome Extension](install_chrome_extension.gif)

# How to use?
1. Make sure, flask server is running on the `5000` port
2. Create DB file if not created already (`python3 utils/create_db_file.py`)
3. Go to URL in chrome for which you need annotation
4. Press capital `S` to start annotation
5. Once started, mouse hovers through the web page & click on the tag which needs annotation. (in the following demo, it is the publication date)
6. Once selected, click on the `Save` button
7. Press capital `S` to stop annotation.
8. Look into `how_to_use.ipynb` notebook to know about the reading of the stored annotated data

Watch the following YouTube Playlist videos to know more about the usage and the installation:

Playlist link: https://www.youtube.com/playlist?list=PLfSv7CK7EjD2XmStXvZthQjGn1DAhfOaK

Installation link: https://youtu.be/MtQ1glIuzZ8
# youtube-live-chat-analyser
