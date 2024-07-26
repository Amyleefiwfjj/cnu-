import React, { useState, useEffect } from 'react';
import './App.css';
import PasswordRecovery from './PasswordRecovery';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isFindingPassword, setIsFindingPassword] = useState(false);


  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('아이디와 비밀번호를 입력해주세요.');
    }
  };

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    setIsLoggedIn(false);
    setError('');
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === 'Enter') {
        if (isLoggedIn) {
          handleLogout();
        } else {
          handleLogin();
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isLoggedIn, username, password]);

  const handleFindCredentials = () => {
    setIsFindingPassword(true);
  };

  const handleSignUp = () => {
    console.log('회원가입하기');
    // 이곳에 회원가입 로직을 추가하세요.
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <>
          <h2>로그인되었습니다!</h2>
          <button className="logout-button"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </>
      ) : isFindingPassword ? (
        <PasswordRecovery onCancel={() => setIsFindingPassword(false)} />
      ) : (
        <>
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-box"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-box"
          />
          <button
            className="login-button"
            onClick={handleLogin}
          >로그인</button>
          {error && <p className="error-message">{error}</p>}
          <div className="extra-buttons">
            <button className="text-button" onClick={handleFindCredentials}>
              비밀번호 찾기
            </button>
            <button className="text-button" onClick={handleSignUp}>
              회원가입하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
