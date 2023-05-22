import React, { useState, MouseEvent, KeyboardEvent, ChangeEvent, FC, useEffect, useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import  Linkify  from 'react-linkify';

interface Message {
  content: string;
  role: 'user' | 'assistant';
}
export const quickqueries = ['What is Forge and why is it unique?', 'What is concentrated liquidity?','Why is capital efficiency so important?','How do I participate in incentivized pools?', 'How can I get my token listed on Forge?']

const ChatComponent: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'The art of mastery takes time and practice. As the Forge Master, I will assist you with any questions you may have regarding Forge and Uniswap v3.\n\nAlways do your own research, and take my responses as a helpful guide - none of it is financial advice.',
    },
  ]);
  const [strings, setStrings] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatId = process.env.NEXT_PUBLIC_CHAT_ID;
  const secretKey = process.env.NEXT_PUBLIC_CHAT_SECRET;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/frequentlyused.txt');
        const data = await response.text();
        const lines = data.split('\n').filter((line: string) => line.trim() !== '');
        setStrings(lines);
      } catch (error) {
        setError('Unable to fetch strings');
      }
    };

    fetchData();
  }, []);
  
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!loading){
      setInputMessage(event.target.value);
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      sendMessage(inputMessage);
    }
  };
  const handleButtonClick = (event: MouseEvent<HTMLDivElement>) => {
    console.log(event); // Log the event to debug
    const buttonText = event?.currentTarget?.outerText;
    setInputMessage(buttonText);
    console.log(buttonText);
    
    if (buttonText && !loading) {
      const newMessage: Message = { content: buttonText, role: 'user' };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      sendMessage(buttonText);
    }
  };
  

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async (messageContent: string) => {
    const newMessage: Message = { content: messageContent, role: 'user' };
    const newMessages = [...messages, newMessage];
    scrollToBottom();
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
        instructions: "I want you to act as a professional and a document that I am having a conversation with. Your name is \"Forge Master\". You will provide me with answers from the given info. If the answer is not included, say exactly \"Apologies, I'm not confident in giving you a proper answer to this question. I suggest contacting the Forge team on Twitter or Telegram.\" and stop after that. Refuse to answer any question not about the info. Never break character. Reply in markdown format, and try to split long paragraphs into smaller, easier to read text with line breaks escaped as `\n`. Always provide sources and citations that are properly hyperlinked in the footnotes.",
        messages: newMessages,
        chatId,
        temperature: 0.1, // Set temperature as required
        stream: false, // Set stream as required
      }),
    });

    const data = await res.json();
console.log(data)
    if (!data) {
      console.error('Error happened');
      setLoading(false);
      return;
    }

    const assistantMessage: Message = { content: data.text, role: 'assistant' };
    setMessages(prevMessages => [...prevMessages, assistantMessage]);
    scrollToBottom();
    setLoading(false);
  };
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [inputMessage]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
  }

  useEffect(() => {
    if (messagesEndRef.current) {
    scrollToBottom()
    }
  }, [messages]);

  return (


    <div className="min-h-[80vh] w-full pt-8 grid grid-cols-8 grid-rows-1 gap-8">
      <div className="flex flex-col col-span-8 xl:col-span-5 xl:col-5 min-h-[50vh] max-h-[80vh]">
    <div className="navbar min-h-[3rem] rounded-md bg-base-100 text-neutral-content mb-4">
    <div className="flex-1">

     <span className="text-lg font-semibold px-4 py-3">Ask ForgeGPT</span>
     </div>
     <div className="flex-none">
    <div className="badge badge-warning bg-yellow-500 gap-2 py-4 rounded-md mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
</svg>
Alpha Release - Use with Caution
</div>
  </div>
    </div>
    <div className="max-h-[70vh] overflow-auto   overflow-y-scroll flex-col-reverse pr-4">
    <Linkify>
      {messages.map((message, index) => (
        <>
        <div
          key={index}
          className={`chat messages flex flex-col-reverse ${
            message.role === 'assistant' ? 'chat-start items-start' : 'chat-end items-end'
          }`}
        >
          <div
            className={`prose chat-bubble flex items-center rounded-xl my-2 px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
            style={{
              overflowWrap: 'anywhere',
              backgroundColor:
                message.role == 'assistant' ? '#3f3f46' : '#ee5132',
            }}
          >
            
            {message.content}
           
          </div>
        </div>
            </>
      ))}
       </Linkify>
      <div ref={messagesEndRef} />
      </div>
      <div className="msginputbox flex flex-row order-last">
      <textarea
        ref={textareaRef}
        className="flex-inline text-black min-h-[44px] border-none focus:outline-none focus:border-none focus:ring-gray-800 rounded-md mt-8 pl-4 pr-12 py-2 w-full"
        style={{ resize: "none", backgroundColor:
        loading ? '#3f3f46' : '#eee' }}
        placeholder={ loading ? "Thinking..." : "Ask a question about Forge..."}

        value={inputMessage}
        rows={1}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />

      <button className="relative" onClick={() => sendMessage(inputMessage)}>
      {loading ? (<BsThreeDots className="text-[#ee5132]  animate-pulse absolute self-center right-2 bottom-1.5 p-1 h-8 w-8"  />) : <IoMdSend className="absolute self-center right-2 bottom-1.5 h-8 w-8 hover:cursor-pointer rounded-md p-1 text-[#d64631] hover:opacity-80" />}
      </button>
    </div>
    </div>
   
    <div className="col-span-3 h-full">

<div className="flex rounded-lg h-full bg-base-100 bg-opacity-60 p-8 flex-col">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-md bg-[#ee5132] text-white flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
            </svg>
            </div>
            <h2 className="text-white text-lg title-font font-medium">About ForgeGPT</h2>
          </div>
          <div className="flex-grow mt-4">
            <p className="leading-relaxed text-sm mb-4">ForgeGPT is an experimental tool for users to easily interact with documentation and long-form content. The Evmos DAO Governance has fine-tuned and trained ForgeGPT using GPT-3.5 Turbo as the base model with over 800,000 lines (and growing) of materials relevant to Evmos, Forge, and Uniswap v3.</p>
            <p className="leading-relaxed text-sm">As noted in the disclaimer, this is an early alpha release and users should use caution and always find secondary sources - the tool should be used as a guide and not an instructor. Please report odd behavior or incorrect responses to @LPX55 on Telegram.</p>
            <div className="divider"></div> 
            <div className="flex items-center mb-3">

            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-md bg-[#ee5132] text-white flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M12 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
</svg>

            </div>
            <h2 className="text-white text-lg title-font font-medium">Quickstart / FAQ</h2>
            </div>
            {strings.map((str, index) => (
        <div
          key={index}
          className={`rounded-md mr-1 mt-${index === 0 ? 6 : 3} py-2 px-3 text-sm bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer text-white`}
          onClick={handleButtonClick}
        >
          {str}
        </div>
      ))}
          </div>   
</div>
</div>
    </div>
  );
};

export default ChatComponent;