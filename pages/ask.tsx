import { NextPage } from 'next';
import ChatComponent from '../components/Gpt';

const AskPage: NextPage = () => {
  return (
    <div>
      <ChatComponent />
    </div>
  );
};

export default AskPage;