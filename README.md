# HTML Tag Annotator

This helps in annotating HTML tags from a web page using chrome extension & a flask app.

# How it works?

Annotator consists of 2 components.
1. A chrome extension: This helps in the annotation of HTML tags from a given webpage
2. A Flask app: This helps in storing of annotated HTML tag with the help of SQLite.

# Prerequisites
`Python 3.6 and above`

# How to use/install?

Running Flask app
  1. Clone the github repo: `git clone https://github.com/sachinkalsi/html_tag_annotator.git`
  2. `pip3 install -r flask_app/requirements.txt`
  3. `python3 flask_app/app.py`

Installing Chrome Extension
  1. Goto `chrome://extensions/` in the URL
  2. Click on `Load unpacked` button & choose the `chrome_extension` folder
![Installing Chrome Extension](install_chrome_extension.gif)
 
