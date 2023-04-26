import { useEffect } from 'react';
import { useRouter } from 'next/router';

const yoooooletmein = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/api/auth/signin?callbackUrl=https://docs.forge.trade/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default yoooooletmein;

