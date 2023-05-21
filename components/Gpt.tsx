import React, { useState, KeyboardEvent, ChangeEvent, FC, useEffect, useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

const ChatComponent: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'The art of mastery takes time and passion. I\'ve been trained by the Evmos DAO with over 500,000 lines of material to allow me to help you become a master in the Forge. Use me as your teacher, I will answer all your questions and try to guide you the right direction. I will try to refrain from giving bold financial advice, however.',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatId = process.env.NEXT_PUBLIC_CHAT_ID;
  const secretKey = process.env.NEXT_PUBLIC_CHAT_SECRET;

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(event.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async () => {
    const newMessage: Message = { content: inputMessage, role: 'user' };
    const newMessages = [...messages, newMessage];
    setLoading(true);
    setMessages(newMessages);
    setInputMessage('');

    const res = await fetch('https://www.chatbase.co/api/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`
      },
      body: JSON.stringify({
        instructions: "I want you to act as a teacher and a document that I am having a conversation with. Your name is \"Forge Master\". You will provide me with answers from the given info. If the answer is not included, say exactly \"Hm, I'm actually not sure about this. I suggest contacting the Forge team on Twitter or Telegram!\" and stop after that. Refuse to answer any question not about the info. Never break character.",
        messages: newMessages,
        chatId,
        temperature: 0.1, // Set temperature as required
        stream: false, // Set stream as required
      }),
    });

    const data = await res.json();

    if (!data) {
      console.error('Error happened');
      setLoading(false);
      return;
    }

    const assistantMessage: Message = { content: data.text, role: 'assistant' };
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
    setLoading(false);
  };
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [inputMessage]);

  return (


    <div className="min-h-screen">
    <div className="navbar min-h-[3rem] rounded-md bg-gradient-to-tr from-[#4f4f54] to-[#242426] text-neutral-content border border-solid border-gray-700 mb-4">
    <div className="flex-1">

     <span className="text-lg font-semibold px-4 py-3">Ask ForgeGPT</span>
     </div>
     <div className="flex-none">
    <div className="badge badge-warning gap-2 py-4 rounded-md mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>
Alpha Release - Use with Caution
</div>
  </div>
    </div>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            message.role === 'assistant' ? 'items-start' : 'items-end'
          }`}
        >
          <div
            className={`flex items-center rounded-xl my-2 px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
            style={{
              overflowWrap: 'anywhere',
              backgroundColor:
                message.role == 'assistant' ? '#3f3f46' : '#ee5132',
            }}
          >
            {message.content}
          </div>
        </div>
      ))}
      {loading && <p>Loading <BsThreeDots className="animate-pulse inline" /></p>}
      <div className="relative">
      <textarea
        ref={textareaRef}
        className="text-black min-h-[44px] ring-gray-800 rounded-md mt-8 pl-4 pr-12 py-2 w-full"
        style={{ resize: "none", backgroundColor:
        loading ? '#3f3f46' : '#eee' }}
        placeholder="Ask a question about Forge..."
        value={inputMessage}
        rows={1}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button onClick={() => sendMessage()}>
        <IoMdSend className="absolute right-2 bottom-3 h-8 w-8 hover:cursor-pointer rounded-md p-1 text-black hover:opacity-80" />
      </button>
    </div>
    </div>
  );
};

export default ChatComponent;