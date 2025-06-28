
import React, { useState } from "react";
import { ShoppingCart, Star, X, Trash2 } from "lucide-react";

const products = [
  {
    id: 1,
    name: "عطر فاخر شرقي",
    price: 299,
    rating: 4.8,
    description: "عطر شرقي فاخر برائحة تدوم طويلًا.",
    image: "/images/perfume.jpg"
  },
  {
    id: 2,
    name: "ساعة يد رجالية",
    price: 450,
    rating: 4.6,
    description: "ساعة أنيقة بتصميم كلاسيكي ضد الماء.",
    image: "/images/watch.jpg"
  },
  {
    id: 3,
    name: "سماعة بلوتوث",
    price: 199,
    rating: 4.4,
    description: "سماعة لاسلكية بصوت نقي وعلبة شحن.",
    image: "/images/headphones.jpg"
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: "", address: "", card: "" });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert("تمت عملية الدفع بنجاح!");
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-right font-[Cairo] relative overflow-x-hidden">
      <div className="flex justify-between p-4 shadow bg-white">
        <h1 className="text-xl font-bold">متجري الاحترافي</h1>
        <button
          onClick={() => setShowCart(true)}
          className="text-sm bg-gray-100 hover:bg-gray-200 rounded-xl px-3 py-1"
        >
          <ShoppingCart className="w-5 h-5 inline-block ml-1" /> عرض السلة
        </button>
      </div>

      <section className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">المنتجات المميزة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="overflow-hidden shadow-md bg-white rounded-xl">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-600">{product.price} ريال</span>
                  <span className="flex items-center text-sm text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-400" /> {product.rating}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-3 bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600"
                >
                  أضف إلى السلة
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sidebar Cart */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">سلة المشتريات</h2>
            <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-red-500">
              <X />
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-600">سلتك فارغة.</p>
          ) : (
            <div className="flex-grow overflow-y-auto space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.price} ريال</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-4">
              <div className="font-bold text-lg text-gray-800 mb-4">الإجمالي: {total} ريال</div>
              <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="الاسم الكامل"
                  className="w-full p-2 border rounded-xl"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                />
                <input
                  type="text"
                  required
                  placeholder="العنوان"
                  className="w-full p-2 border rounded-xl"
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                />
                <input
                  type="text"
                  required
                  placeholder="رقم البطاقة"
                  className="w-full p-2 border rounded-xl"
                  value={checkoutForm.card}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, card: e.target.value })}
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white rounded-xl py-2 hover:bg-green-600"
                >
                  تأكيد الدفع
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
