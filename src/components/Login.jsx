import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const secureUser = import.meta.env.VITE_AUTH_USERNAME;
    const securePass = import.meta.env.VITE_AUTH_PASSWORD;

    if (username === secureUser && password === securePass) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password configuration.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">
        <div className="text-center mb-6">
          <img src="/image_557d7efd.jpg" alt="Logo" className="w-20 h-20 mx-auto rounded-full object-cover mb-3" />
          <h2 className="text-2xl font-bold text-slate-800 mt-2">Staff Portal</h2>
          <p className="text-sm text-slate-500">Sign in to generate receipts</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Username</label>
            <input 
              type="text" 
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.value || e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.value || e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}

          <button type="submit" className="w-full bg-slate-900 text-amber-400 font-bold p-3.5 rounded-xl active:scale-95 transition text-base shadow-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
