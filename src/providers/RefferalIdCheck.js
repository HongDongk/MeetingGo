import { useEffect } from 'react';

export default function RefferalIdCheck() {
  const params = new URLSearchParams(window.location.search);
  const referralId = params.get('referralId');

  useEffect(() => {
    if (referralId !== null) {
      sessionStorage.setItem('referralId', referralId);
    }
  }, []);
}
