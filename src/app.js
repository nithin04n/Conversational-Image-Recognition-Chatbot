import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa'; 
import './app.css';
import RobotImage from './logo.png'; 

const App = () => {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleFirstSubmit = async (event) => {
    event.preventDefault();
    if (!image || !question) {
      alert('Please provide both an image and a question.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('question', question);

    setLoading(true);
    setError('');
    try {
      console.log("Sending image and question to the server...");
      const response = await axios.post('http://localhost:5000/upload_image_and_ask', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.answer) {
        setConversation([...conversation, { question, answer: response.data.answer }]);
        setQuestion('');
        setImageUploaded(true); // Image uploaded successfully
      } else {
        setError('No answer received from the server.');
      }
    } catch (error) {
      setError('Failed to get the answer. Please try again.');
      console.error('Error fetching the answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/reset');
      setImage(null);
      setImagePreviewUrl(null);
      setImageUploaded(false); // Reset image upload state
      setConversation([]);
      setQuestion('');
    } catch (error) {
      setError('Failed to reset the conversation. Please try again.');
      console.error('Error resetting the conversation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <img src={RobotImage} alt="Robot" className="robot-image" />
        <div className="logo">
          <h1>Vision Dialog</h1>
          <h4>"Where vision meets conversation—seamlessly recognizing and discussing your images."</h4>
        </div>
      </div>
      <div className="main-content">
        <div className="chat-interface">
          <h2 className='vision-dialog-text'><FaRobot className="robot-icon" /> Vision Dialog</h2>
          <p className="online-status">• Online</p>

          {imagePreviewUrl && (
            <img src={imagePreviewUrl} alt="Uploaded" className="uploaded-image-chat" />
          )}

          <div className="chat-container">
            {conversation.map((chat, index) => (
              <div key={index}>
                <div className="chat-bubble user-bubble">
                  <p>{chat.question}</p>
                </div>
                <div className="chat-bubble bot-bubble">
                  <p>{chat.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Render the upload option only if the image has not been uploaded */}
          {!imageUploaded && (
            <div className="initial-ui">
              <div className="upload-box">
                <input type="file" onChange={handleImageUpload} className="file-input" />
                <p className="upload-text">ADD YOUR IMAGE HERE</p>
                <span className="plus-icon">+</span>
              </div>
              <input
                type="text"
                placeholder="Ask your first question!"
                value={question}
                onChange={handleQuestionChange}
                className="question-input"
              />
              <button onClick={handleFirstSubmit} disabled={loading} className="submit-button">
                {loading ? 'Processing...' : 'Ask me Anything!'}
              </button>
            </div>
          )}

          {/* Show question input and ask button after the image has been uploaded */}
          {imageUploaded && (
            <div className="input-section">
              <input
                type="text"
                placeholder="Ask another question!"
                value={question}
                onChange={handleQuestionChange}
                className="question-input"
              />
              <button onClick={handleFirstSubmit} disabled={loading} className="submit-button">
                {loading ? 'Processing...' : 'Ask'}
              </button>
            </div>
          )}

          {/* Show reset button only after the first answer is generated */}
          {conversation.length > 0 && (
            <button onClick={handleReset} disabled={loading} className="reset-button">
              {loading ? 'Reset' : 'Reset'}
            </button>
          )}

          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;