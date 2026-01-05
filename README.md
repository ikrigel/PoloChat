# App deployed on render 
# link: https://polochat.onrender.com/

# Instachat Exercise

This is a buggy, AI-generated, _real_-time chat app. Practice your AI-copiloting by completing the tasks below.

For a free copilot with minimal setup, you can install Gemini CLI by running this: `npm i -g @google/gemini-cli`

Then run `gemini` in your project directory and login with your Google account - that's it! Then you can chat with it and it will have access to your code.

## Running the app

Simply run `npm run dev`, and open `http://localhost:8080/` on two separate browser windows to see the chat interface

## Tasks

Fork the repo and complete the following locally:

1. Fix the bug

   - The main "live chat" feature only works on the first message. Ensure that any time any user types, their text appears in real time on the other client
   - See the bug [here](https://drive.google.com/file/d/19l0Gn4moBGrtqbkO3NbZ2SElCVT-c_7v/view?usp=sharing)
   - **Note**: the bug only occurs if you leave the username fields *empty*

2. Refactor the code

   - The client logic is all crammed into one big class. Break it up, name things clearly, remove duplication, and make it easier to follow

3. New feature
   - Currently anyone who opens the app joins the same chat session
   - Implement one-to-one direct messages, so you can start a chat with a single other user (like sending a message to a friend on Whatsapp)
   - No need to implement group chats
   - These instructions are deliberatly missing technical details, which you need to figure out - but remember: you **do not need expertise** in real-time applications to implement this feature. Consult with the LLM. Plan. Work in small iterations

## Notes

While the goal is for you to practice using your coding copilot (claude, gemini, codex - whichever), remember that **you are the captain**; guide the LLM.

It was blindly trusting an LLM that created this messy codebase in the first place, so let's not make the same mistake ;)

<img width="808" height="609" alt="image" src="https://github.com/user-attachments/assets/fb0cd20b-575c-4476-916f-b5a033bc463a" />
