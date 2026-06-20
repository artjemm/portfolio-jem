from flask import Flask, request, jsonify, send_from_directory
import os

app = Flask(__name__)
UPLOAD_DIR = os.path.expanduser('~/portfolio-jem/assets')
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.pdf'}

@app.route('/')
def upload_page():
    return send_from_directory(os.path.dirname(__file__), 'upload.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file'}), 400
    f = request.files['file']
    ext = os.path.splitext(f.filename)[1].lower()
    if ext not in ALLOWED:
        return jsonify({'error': f'Type {ext} not allowed'}), 400
    safe_name = f.filename.replace(' ', '-').lower()
    path = os.path.join(UPLOAD_DIR, safe_name)
    f.save(path)
    return jsonify({'ok': True, 'name': safe_name, 'path': f'/portfolio/assets/{safe_name}'})

@app.route('/list')
def list_files():
    files = []
    for f in sorted(os.listdir(UPLOAD_DIR)):
        ext = os.path.splitext(f)[1].lower()
        if ext in ALLOWED:
            size = os.path.getsize(os.path.join(UPLOAD_DIR, f))
            files.append({'name': f, 'path': f'/portfolio/assets/{f}', 'size': size})
    return jsonify(files)

@app.route('/delete', methods=['POST'])
def delete():
    name = request.json.get('name', '')
    path = os.path.join(UPLOAD_DIR, os.path.basename(name))
    if os.path.exists(path):
        os.remove(path)
        return jsonify({'ok': True})
    return jsonify({'error': 'Not found'}), 404

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5450)
