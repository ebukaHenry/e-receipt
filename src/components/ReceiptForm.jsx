import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js'; // or use window.html2pdf if using Option 2 from earlier
import ReceiptTemplate from './ReceiptTemplate';

export default function ReceiptForm() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Transfer');
  const [logo, setLogo] = useState(null);
  
  // Track multiple items in an array of objects
  const [items, setItems] = useState([
    { description: '', qty: 1, cost: '' }
  ]);

  const printRef = useRef();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Update a specific field inside a specific item row
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  // Add a new empty item row when user clicks the "+" button
  const addItemRow = () => {
    setItems([...items, { description: '', qty: 1, cost: '' }]);
  };

  // Remove an item row if added by mistake (keeps at least 1)
  const removeItemRow = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleShare = () => {
    const element = printRef.current;
    const safeName = (customerName || 'customer').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    const opt = {
      margin: 10,
      filename: `receipt_${safeName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save();
    } else {
      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <img src={logo || '/image_557d7efd.jpg'} alt="Logo Preview" className="w-20 h-20 mx-auto rounded-full object-cover mb-3" />
        <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <input type="text" placeholder="Customer Name" value={customerName} onChange={e => setCustomerName(e.target.value)} className="p-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-amber-500 outline-none" />
        <input type="tel" placeholder="Customer Phone" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="p-3 border border-slate-200 rounded-xl text-base focus:ring-2 focus:ring-amber-500 outline-none" />
      </div>

      {/* Dynamic Items Section */}
      <div className="space-y-4 border-t border-b border-slate-100 py-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Items / Perfumes Purchased</h3>
          <button type="button" onClick={addItemRow} className="bg-amber-500 hover:bg-amber-600 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition">
            <span>➕</span> Add Item
          </button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="bg-slate-50 p-3 rounded-xl border border-slate-100 relative space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400">Item #{index + 1}</span>
              {items.length > 1 && (
                <button type="button" onClick={() => removeItemRow(index)} className="text-red-500 text-xs font-medium hover:underline">
                  Remove
                </button>
              )}
            </div>
            
            <input 
              type="text" 
              placeholder="Perfume Name / Description" 
              value={item.description} 
              onChange={e => handleItemChange(index, 'description', e.target.value)} 
              className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-amber-500"
            />
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Qty</label>
                <input 
                  type="number" 
                  min="1" 
                  value={item.qty} 
                  onChange={e => handleItemChange(index, 'qty', parseInt(e.target.value) || 1)} 
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Unit Cost</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={item.cost} 
                  onChange={e => handleItemChange(index, 'cost', e.target.value)} 
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Payment Method</label>
        <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-white text-base focus:ring-2 focus:ring-amber-500 outline-none">
          <option value="Cash">💵 Cash</option>
          <option value="Transfer">🏦 Transfer</option>
        </select>
      </div>

      <button onClick={handleShare} className="w-full mt-2 bg-slate-900 text-amber-400 font-bold p-4 rounded-xl active:scale-95 transition text-base shadow-md flex items-center justify-center gap-2">
        <span>📄</span> Generate & Share PDF Receipt
      </button>

      {/* Hidden compilation engine targeting the shared element */}
      <div className="hidden">
        <div ref={printRef}>
          <ReceiptTemplate 
            customerName={customerName} 
            customerPhone={customerPhone} 
            paymentStatus={paymentStatus} 
            items={items} 
            logo={logo} 
          />
        </div>
      </div>
    </div>
  );
}
