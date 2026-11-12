import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      const orderId = `KBFC-SHOP-${Date.now().toString(36).toUpperCase()}`;
      setOrderComplete(orderId);
      clearCart();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD100', '#0C2340', '#FFFFFF'],
      });
    }, 1200);
  };

  const closeDrawer = () => {
    setOrderComplete(null);
    setIsCartOpen(false);
  };

  const freeShippingThreshold = 2499;
  const progressToFreeShipping = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-kbfc-dark/95 border-l border-kbfc-yellow/30 shadow-2xl glass-panel flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/30">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-kbfc-yellow" />
              <h3 className="font-display font-black text-lg text-white">
                KBFC Official Store ({totalItems})
              </h3>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {cart.length > 0 && !orderComplete && (
            <div className="px-5 py-3 bg-kbfc-blue/40 border-b border-white/5">
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>
                  {totalPrice >= freeShippingThreshold ? (
                    <span className="text-emerald-400 font-bold">🎉 FREE Express Delivery unlocked!</span>
                  ) : (
                    <>Add <strong className="text-kbfc-yellow">₹{freeShippingThreshold - totalPrice}</strong> more for Free Shipping</>
                  )}
                </span>
                <span>{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-kbfc-yellow to-kbfc-gold h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Item List or Order Success */}
          <div className="p-5 overflow-y-auto flex-1">
            {orderComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-display font-black text-xl text-white">Order Confirmed!</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Thank you for backing Kerala Blasters FC! Your official kit is being packed at our Kochi warehouse.
                </p>
                <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs">
                  <span className="text-slate-400 block">Order Number</span>
                  <strong className="text-kbfc-yellow font-mono text-sm">{orderComplete}</strong>
                </div>
                <button
                  onClick={closeDrawer}
                  className="px-6 py-2.5 rounded-xl bg-kbfc-yellow text-kbfc-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-white text-base">Your Bag is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Explore the 2025/26 official match kits and Manjappada merchandise to wear your yellow pride.
                </p>
                <button
                  onClick={() => {
                    closeDrawer();
                    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 rounded-lg bg-kbfc-yellow text-kbfc-dark font-extrabold text-xs uppercase tracking-wider hover:brightness-110"
                >
                  Browse Store
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((cartItem) => (
                  <div
                    key={`${cartItem.item.id}-${cartItem.selectedSize}`}
                    className="p-3 bg-white/5 border border-white/10 rounded-xl flex space-x-3 items-center"
                  >
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-slate-800 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-white truncate">
                        {cartItem.item.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-slate-400 mt-0.5">
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-kbfc-yellow font-semibold">
                          Size: {cartItem.selectedSize}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-white font-bold">
                          ₹{cartItem.item.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center border border-white/20 rounded-md bg-black/40">
                          <button
                            onClick={() =>
                              updateQuantity(
                                cartItem.item.id,
                                cartItem.selectedSize,
                                cartItem.quantity - 1
                              )
                            }
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-white font-mono">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                cartItem.item.id,
                                cartItem.selectedSize,
                                cartItem.quantity + 1
                              )
                            }
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(cartItem.item.id, cartItem.selectedSize)
                          }
                          className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-white text-sm font-mono">
                        ₹{cartItem.item.price * cartItem.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && !orderComplete && (
            <div className="p-5 border-t border-white/10 bg-black/40 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="text-emerald-400 font-mono">
                    {totalPrice >= freeShippingThreshold ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-base font-bold text-white">
                  <span>Total Due</span>
                  <span className="text-kbfc-yellow font-display text-lg">
                    ₹{totalPrice >= freeShippingThreshold ? totalPrice : totalPrice + 99}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full py-3.5 bg-gradient-to-r from-kbfc-yellow to-kbfc-gold text-kbfc-dark font-display font-extrabold text-sm uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-kbfc-yellow/20"
              >
                {checkingOut ? (
                  <div className="w-5 h-5 border-2 border-kbfc-dark border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Proceed to Express Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Authentic Official Club Merchandise • Secure Pay</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
