import React, { useState } from 'react';
import { Modal } from './Modal';
import { useCart } from '../context/CartContext';
import { Cart } from './Cart';
import { Checkout } from './Checkout';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  description: string;
  imagePosition?: string;
}

export function ProductCard({ image, name, price, description, imagePosition = "object-[50%_40%]" }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: name.toLowerCase(),
      name,
      price,
      image
    });
    setShowCheckout(true);
  };

  const calculateTotal = () => {
    const priceValue = parseFloat(price.replace('$', ''));
    return (priceValue * quantity).toFixed(2);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow transform scale-120 flex flex-col h-full">
        <div className="aspect-square overflow-hidden relative">
          <div className="absolute inset-0 bg-black/5 z-10"></div>
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ${imagePosition} brightness-105 contrast-[1.02] saturate-[1.05]`}
          />
        </div>
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">{name}</h3>
          <p className="text-lg text-gray-600 mb-5 flex-grow">{description}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-3xl font-bold text-gray-900">{price}</span>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#dc3545] text-white px-8 py-3 rounded-full hover:bg-[#c82333] transition-colors text-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setShowCheckout(false);
        setQuantity(1);
      }}>
        <div className="p-4 sm:p-6 md:p-8 max-w-full w-full mx-auto">
          {!showCheckout ? (
            <>
              <div className="mb-6 sm:mb-8">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{name}</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6">{description}</p>
              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-semibold mb-3">Product Details:</h4>
                <ul className="list-disc list-inside text-base sm:text-lg text-gray-600 space-y-2">
                  <li>Premium quality materials</li>
                  <li>Spacious interior compartment</li>
                  <li>Adjustable shoulder strap</li>
                  <li>Interior zip pocket</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
                <div className="w-full sm:w-auto">
                  <span className="text-lg text-gray-600 block sm:inline mb-2 sm:mb-0 sm:mr-4">Quantity:</span>
                  <div className="flex items-center border rounded-lg w-full sm:w-auto">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100 text-lg"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100 text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right w-full sm:w-auto">
                  <div className="text-lg text-gray-600">Total:</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">${calculateTotal()}</div>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end w-full">
                <button 
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto bg-[#dc3545] text-white px-8 py-3 rounded-full hover:bg-[#c82333] transition-colors text-lg sm:text-xl"
                >
                  Add to Cart
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              <Cart />
              <Checkout />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}