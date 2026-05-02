import google.generativeai as genai
from app.config import settings

# Initialize the Gemini API
genai.configure(api_key=settings.GEMINI_API_KEY)

# Update this for your new project's specific goals
SYSTEM_PROMPT = """You are a helpful AI Mentor. 
Provide clear, actionable advice in 3-5 sentences. 
Always be encouraging and never fabricate data."""

def get_chat_response(messages: list, user_context: dict = None) -> str:
    try:
        # Inject user data as context to make the bot personalized
        context = ""
        if user_context:
            context = f"\n\nCurrent User Context: {user_context}"

        # Fix: Using 'models/gemini-1.5-flash' prevents the 404 error
        model = genai.GenerativeModel(
            model_name="gemini-3.1-flash-lite-preview", # Current stable hackathon model
            system_instruction=SYSTEM_PROMPT + context,
        )

        # Build chat history (excluding the very last message)
        history = []
        for m in messages[:-1]:
            history.append({
                "role": m["role"],
                "parts": m["parts"] if isinstance(m["parts"], list) else [m["parts"]]
            })

        # Start a session with the built history
        chat_session = model.start_chat(history=history)

        # Send the latest message
        last_msg = messages[-1]["parts"]
        final_text = last_msg[0] if isinstance(last_msg, list) else last_msg

        response = chat_session.send_message(final_text)
        return response.text

    except Exception as e:
        # Returns the error so you can see it in your frontend UI as seen in image_3cbbd9.png
        return f"I'm having trouble connecting right now. Error: {str(e)}"