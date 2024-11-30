const API_URL = 'http://127.0.0.1:8000';

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/upload-image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  return response.json();
}

export async function sendQuestion(message, imageData, context = {}) {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      message,
      tourist_type: context.touristType || null,
      weather: context.weather || null,
      transportation: context.transportation || null
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send question');
  }

  return response.json();
}