from flask import Flask , request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyC4lcxIz79dfmfoUbvp06FHlem3FHp412M")
model = genai.GenerativeModel("gemini-2.5-flash")

@app.route('/chat',methods=['POST'])
def chat():
  try:
    user_input=request.json['message']
    response = model.generate_content(user_input)
    return jsonify({"response": response.text})
  except Exception as e:
    return jsonify({"error": str(e)}), 500
  
if __name__ == '__main__':
  app.run(debug=True, port =5000)

print ("hello")
