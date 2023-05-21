import React, { FC, ReactNode, useState } from 'react';
import ChatComponent from './GptModal'; // Adjust the path as needed

interface ShowComponentProps {
  children: ReactNode;
}

const ShowComponent: FC<ShowComponentProps> = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {show && children}
      <button
        style={{
          position: 'fixed',
          bottom: '1em',
          right: '1em',
          borderRadius: '50%',
          // Any other styling for your floating button...
        }}
        onClick={() => setShow(!show)}
      >
        Chat
      </button>
    </div>
  );
};


const FloatingChat: FC = () => {
  return (
    <ShowComponent>
      <ChatComponent />
    </ShowComponent>
  );
};

export default FloatingChat;