import React, { useState } from 'react';

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user_login: email,
    };

    try {
      const response = await fetch('https://your-wordpress-site/wp-json/wp/v2/users/lostpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(responseData.message);
        setEmail('');
        setError('');
      } else {
        setMessage('');
        setError(responseData.message);
      }
    } catch (error) {
      setMessage('');
      setError('Помилка підключення. Будь ласка, спробуйте пізніше.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}
      <button type="submit">Відновити пароль</button>
    </form>
  );
};

export default PasswordResetForm;
