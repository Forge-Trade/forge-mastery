import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/courses/1-basic-training');
  }, []);

  return null;
};

export default Index;