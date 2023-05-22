import { NextPage } from 'next';
import ChatComponent from '../components/Gpt';

const AskMinimalPage: NextPage = () => {
  return (
    <div>
      <ChatComponent />
    </div>
  );
};

export default AskMinimalPage;