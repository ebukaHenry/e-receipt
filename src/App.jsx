import React, { useState } from 'react';
import Login from './components/Login';
import ReceiptForm from './components/ReceiptForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 font-sans antialiased">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <header className="bg-slate-900 text-white py-4 px-6 text-center">
          <h1 className="text-xl font-bold tracking-wide uppercase text-amber-400">
            Her Global Collections
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Mobile Receipt Generator</p>
        </header>
        
        <main className="p-5">
          <ReceiptForm />
        </main>
      </div>
    </div>
  );
}

export default App;
