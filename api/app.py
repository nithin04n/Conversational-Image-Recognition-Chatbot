from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
from PIL import Image
import io
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the model and tokenizer
model_id = "vikhyatk/moondream2"
model = AutoModelForCausalLM.from_pretrained(model_id, trust_remote_code=True)
tokenizer = AutoTokenizer.from_pretrained(model_id)

# Global storage for the encoded image (for simplicity, could be improved with sessions)
enc_image_global = None

def recognize_and_answer(enc_image, question):
    # Answer the question using the encoded image
    answer = model.answer_question(enc_image, question, tokenizer)
    return answer

@app.route('/upload_image_and_ask', methods=['POST'])
def upload_image_and_ask():
    global enc_image_global

    # Check if a file and question were uploaded
    if 'image' not in request.files or 'question' not in request.form:
        return jsonify({'error': 'Image and question are required'}), 400

    # Get the uploaded image
    image_file = request.files['image']
    
    # Open the image file and encode it
    image = Image.open(io.BytesIO(image_file.read()))
    enc_image_global = model.encode_image(image)

    # Get the question from the request
    question = request.form['question']
    
    # Get the answer to the question
    answer = recognize_and_answer(enc_image_global, question)
    
    return jsonify({'answer': answer})

@app.route('/reset', methods=['POST'])
def reset():
    global enc_image_global
    enc_image_global = None
    return jsonify({'status': 'Image encoding reset successfully'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)