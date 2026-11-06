import React from 'react';

export default function ReceiptTemplate({ customerName, customerPhone, paymentStatus, items, logo }) {
  
  // Clean calculations
  const grandTotal = items.reduce((sum, item) => {
    const itemCost = window.parseFloat(item.cost || 0);
    return sum + (item.qty * itemCost);
  }, 0).toFixed(2);

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // Explicit safe standard hex fallback colors for html2pdf
  const colors = {
    white: '#ffffff',
    slate900: '#0f172a',
    slate800: '#1e293b',
    slate700: '#334155',
    slate600: '#475569',
    slate500: '#64748b',
    slate400: '#94a3b8',
    slate200: '#e2e8f0',
    slate100: '#f1f5f9',
    slate50: '#f8fafc',
    amber600: '#d97706',
    greenBg: '#dcfce7',
    greenText: '#166534',
    blueBg: '#dbeafe',
    blueText: '#1e40af'
  };

  return (
    // We replace complex Tailwind layout structures with robust HTML attributes & inline hex styles
    <div style={{ 
      padding: '48px', 
      backgroundColor: colors.white, 
      color: colors.slate900, 
      fontFamily: 'sans-serif', 
      maxWidth: '210mm', 
      margin: '0 auto',
      boxSizing: 'border-box' 
    }}>
      
      {/* Brand Header */}
      <div style={{ textAlign: 'center', borderBottom: `2px solid ${colors.amber600}`, paddingBottom: '24px', marginBottom: '32px' }}>
        {logo && <img src="/image_557defd.jpg" alt="Biz Logo" style={{ width: '80px', height: '80px', margin: '0 auto 12px auto', borderRadius: '50%', objectFit: 'cover' }} />}
          <img 
            src={`${window.location.origin}/image_557defd.jpg`} 
            alt="Her Global Collections Logo" 
            crossOrigin="anonymous"
            style={{ width: '80px', height: '80px', margin: '0 auto 12px auto', borderRadius: '50%', objectFit: 'cover' }} 
          />
        <h1 style={{ fontSize: '28px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.slate800, margin: 0 }}>
          Her Global Collections
        </h1>
        <p style={{ fontSize: '12px', color: colors.slate500, trackingWider: '0.05em', marginTop: '4px' }}>
          Dawaki Abuja
        </p>
      </div>

      {/* Meta Details Row */}
      <table style={{ width: '100%', marginBottom: '32px', fontSize: '14px' }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: 'top', width: '50%' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: colors.slate400, margin: '0 0 4px 0' }}>Bill To:</h3>
              <p style={{ fontWeight: 'bold', fontSize: '16px', color: colors.slate800, margin: 0 }}>{customerName || 'Valued Client'}</p>
              <p style={{ color: colors.slate600, fontWeight: '500', marginTop: '2px', margin: 0 }}>{customerPhone || 'N/A'}</p>
            </td>
            <td style={{ verticalAlign: 'top', textAlign: 'right', width: '50%' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: colors.slate400, margin: '0 0 4px 0' }}>Receipt Details:</h3>
              <p style={{ color: colors.slate600, margin: 0 }}>
                <span style={{ fontWeight: '600', color: colors.slate700 }}>Date:</span> {formattedDate}
              </p>
              <p style={{ marginTop: '4px', margin: 0 }}>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '2px 10px', 
                  borderRadius: '4px', 
                  fontSize: '12px', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase',
                  backgroundColor: paymentStatus === 'Cash' ? colors.greenBg : colors.blueBg,
                  color: paymentStatus === 'Cash' ? colors.greenText : colors.blueText
                }}>
                  Paid via {paymentStatus}
                </span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Itemized Table */}
      <table style={{ width: '100%', textCombineUpright: 'left', marginBottom: '32px', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${colors.slate200}`, backgroundColor: colors.slate50 }}>
            <th style={{ padding: '12px', fontWeight: 'bold', color: colors.slate700, textAlign: 'left' }}>Item Description</th>
            <th style={{ padding: '12px', fontWeight: 'bold', color: colors.slate700, textAlign: 'center', width: '60px' }}>Qty</th>
            <th style={{ padding: '12px', fontWeight: 'bold', color: colors.slate700, textAlign: 'right', width: '100px' }}>Unit Price</th>
            <th style={{ padding: '12px', fontWeight: 'bold', color: colors.slate700, textAlign: 'right', width: '120px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            const itemTotal = (item.qty * window.parseFloat(item.cost || 0)).toFixed(2);
            return (
              <tr key={idx} style={{ borderBottom: `1px solid ${colors.slate100}` }}>
                <td style={{ padding: '12px', fontWeight: '500', color: colors.slate800 }}>{item.description || 'Premium Fragrance Selection'}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: colors.slate600 }}>{item.qty}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: colors.slate600 }}>₦{window.parseFloat(item.cost || 0).toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: colors.slate800 }}>₦{itemTotal}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Totals Summary */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: `1px solid ${colors.slate200}`, paddingTop: '16px', marginBottom: '48px' }}>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: colors.slate500, marginRight: '16px' }}>Grand Total:</span>
          <span style={{ fontSize: '24px', fontWeight: '900', color: colors.slate900 }}>₦{grandTotal}</span>
        </div>
      </div>

      {/* Aesthetic Footer */}
      <div style={{ textAlign: 'center', borderTop: `1px dashed ${colors.slate300}`, paddingTop: '16px', fontSize: '12px', fontStyle: 'italic', color: colors.slate400 }}>
        Don’t just show up, make an impression.
      </div>
    </div>
  );
}




// import React from 'react';

// export default function ReceiptTemplate({ customerName, customerPhone, paymentStatus, items, logo }) {
  
//   // High precision row and aggregate math calculations
//   const grandTotal = items.reduce((sum, item) => {
//     const itemCost = window.parseFloat(item.cost || 0);
//     return sum + (item.qty * itemCost);
//   }, 0).toFixed(2);

//   const formattedDate = new Date().toLocaleDateString('en-GB', {
//     day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
//   });

//   return (
//     <div className="p-12 text-slate-900 bg-white font-sans max-w-[210mm] mx-auto" style={{ boxSizing: 'border-box' }}>
//       {/* Brand Header */}
//       <div className="text-center border-b-2 border-amber-600 pb-6 mb-8">
//         {logo && <img src={logo} alt="Biz Logo" className="w-20 h-20 mx-auto rounded-full object-cover mb-3" />}
//         <h1 className="text-3xl font-black uppercase tracking-widest text-slate-800">Her Global Collections</h1>
//         <p className="text-xs text-slate-500 tracking-wider mt-1">Dakwa Abuja.</p>
//       </div>

//       {/* Meta details */}
//       <div className="flex justify-between items-start mb-8 text-sm">
//         <div>
//           <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Bill To:</h3>
//           <p className="font-bold text-base text-slate-800">{customerName || 'Valued Client'}</p>
//           <p className="text-slate-600 font-medium mt-0.5">{customerPhone || 'N/A'}</p>
//         </div>
//         <div className="text-right">
//           <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Receipt Details:</h3>
//           <p className="text-slate-600"><span className="font-semibold text-slate-700">Date:</span> {formattedDate}</p>
//           <p className="mt-1">
//             <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase ${paymentStatus === 'Cash' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
//               Paid via {paymentStatus}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Itemized Table mapping out rows dynamically */}
//       <table className="w-full text-left mb-8 border-collapse text-sm">
//         <thead>
//           <tr className="border-b-2 border-slate-200 bg-slate-50">
//             <th className="p-3 font-bold text-slate-700">Item Description</th>
//             <th className="p-3 font-bold text-slate-700 text-center">Qty</th>
//             <th className="p-3 font-bold text-slate-700 text-right">Unit Price</th>
//             <th className="p-3 font-bold text-slate-700 text-right">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, idx) => {
//             const itemTotal = (item.qty * window.parseFloat(item.cost || 0)).toFixed(2);
//             return (
//               <tr key={idx} className="border-b border-slate-100">
//                 <td className="p-3 font-medium text-slate-800">{item.description || 'Premium Fragrance Selection'}</td>
//                 <td className="p-3 text-center text-slate-600">{item.qty}</td>
//                 <td className="p-3 text-right text-slate-600">{window.parseFloat(item.cost || 0).toFixed(2)}</td>
//                 <td className="p-3 text-right font-bold text-slate-800">₦{itemTotal}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* Grand Aggregations */}
//       <div className="flex justify-end border-t border-slate-200 pt-4 mb-12">
//         <div className="text-right space-x-4">
//           <span className="text-base font-bold text-slate-500">Grand Total:</span>
//           <span className="text-2xl font-black text-slate-900">₦{grandTotal}</span>
//         </div>
//       </div>

//       <div className="text-center border-t border-dashed border-slate-300 pt-4 text-xs italic text-slate-400">
//         Thank you for your patronage. Elevate your presence with every spray.
//       </div>
//     </div>
//   );
// }
