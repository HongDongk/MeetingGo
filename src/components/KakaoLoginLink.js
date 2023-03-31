import { API_URL, CLIENT_URL } from '../config/constants';

export default function KakaoLoginLink({ children }) {
  return (
    <a
      href={`${API_URL}/auth/signin/kakao?redirectUrl=${CLIENT_URL}/auth/signin/kakao/success`}
    >
      {children}
    </a>
  );
}
