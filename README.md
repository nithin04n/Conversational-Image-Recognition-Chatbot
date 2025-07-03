
# Conversational Image Recognition Chatbot done by - Kaarthic VR

This project is an interactive AI system that allows users to upload an image and ask questions about its content through a chat interface. It uses a combination of vision-language models and a conversational frontend to simulate an intelligent image understanding system.

---

## Features

- Upload an image and ask natural language questions related to it
- Uses a vision-language transformer model to interpret and answer queries
- Built with a Python Flask backend and a React.js frontend
- Clean, modern chat-based UI with image preview and reset functionality

---

## Technologies Used

- **Python (Flask)**: Backend API for image handling and model inference
- **React.js**: Frontend interface for chat and image upload
- **transformers (Hugging Face)**: Vision-Language model (`vikhyatk/moondream2`)
- **PIL (Pillow)**: Image processing
- **CORS**: Enable frontend-backend communication

---

## System Architecture

```
User -> React Frontend -> Flask API -> Vision Model -> Response
```

---

## Directory Structure

```
project/
│
├── backend/
│   ├── app.py                    # Flask backend API
│
├── frontend/
│   ├── App.js                    # React frontend logic
│   ├── app.css                   # Styling for chat UI
│   └── logo.png                  # Robot logo image
│
├── README.md                     # Project documentation
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
https://github.com/kaarthicvr/Conversational-Image-Recognition-Chatbot.git
cd conversational-image-bot
```

---

### 2. Backend Setup (Flask)

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install flask flask-cors transformers torch pillow
```

Run the Flask server:

```bash
python app.py
```

---

### 3. Frontend Setup (React)

Navigate to the frontend directory:

```bash
cd ../frontend
npm install
npm start
```

Ensure the Flask server is running on `http://localhost:5000` and React on `http://localhost:3000`.

---

## How It Works

- The user uploads an image and submits a question.
- The image and question are sent to the Flask backend using `axios`.
- The backend encodes the image and passes it to the `moondream2` model along with the question.
- The model generates an answer which is returned and displayed in the frontend chat interface.

---

## API Endpoints

### `POST /upload_image_and_ask`

Accepts multipart form-data with:

- `image`: uploaded image file
- `question`: text question related to the image

Returns:

```json
{ "answer": "This is a dog playing with a ball." }
```

### `POST /reset`

Resets the stored image encoding on the server.

---

## Sample Usage

1. Upload image of an object, e.g. `dog.jpg`
2. Ask questions like:
   - "What is this animal?"
   - "What is it doing?"
   - "What color is the object?"

---

## UI Preview

- Chat bubble design (user and bot)
- Sidebar with robot logo and branding
- Inline image preview and follow-up questions

---

## Notes

- The `moondream2` model is loaded from HuggingFace. Ensure internet access on first run.
- For production, replace hardcoded localhost URLs with environment configs.
- This is a minimal setup. Add security, error handling, and optimization as needed.

---

## Future Improvements

- Enable continuous multi-turn conversation with memory
- Integrate image captioning and OCR
- Support audio-based questions
- Add user authentication and conversation history

---

## License

This project is intended for academic and demo use only.

---

## Credits

- [Vikhyat Moondream2](https://huggingface.co/vikhyatk/moondream2)
- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [HuggingFace Transformers](https://huggingface.co/transformers/)
# Conversational-Image-Recognition-Chatbot
