import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import { APP_URL } from '../util';

function PaymentForm() {
  const location = useLocation();
  const [eventId, setEventId] = useState(null);
  const [ticketType, setTicketType] = useState('');
  const [price, setPrice] = useState('');
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setEventId(params.get('id'));

    const ticketTypeParam = params.get('type');
    if (ticketTypeParam === 'basic') {
      setTicketType(1);
    } else if (ticketTypeParam === 'standard') {
      setTicketType(2);
    } else if (ticketTypeParam === 'premium') {
      setTicketType(3);
    } else {
      setTicketType('');
    }

    setPrice(params.get('price'));
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const ticketData = {
      ticketType,
      price: parseFloat(price),
      payment: {
        paymentType: 'card',
        amount: parseFloat(price),
        paymentStatus: 'Completed',
      },
    };

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${APP_URL}/ticket/register/${eventId}`, ticketData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201 || response.status === 200) {
        // Show success message immediately
        setSuccessMessage('Payment successful! Redirecting to your dashboard...');
        setPaymentSuccessful(true);

        // Redirect after a short delay to allow users to see the message
        setTimeout(() => {
          setRedirectToDashboard(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (redirectToDashboard) {
    return <Navigate to="/dashboard?p=3" />;
  }

  return (
    <section className="flex justify-center pt-20 h-screen antialiased">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mx-auto max-w-5xl">
          {paymentSuccessful ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-green-600">{successMessage}</h2>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900">Payment</h2>

              <div className="mt-6 lg:flex lg:items-start lg:gap-12">
                <form
                  onSubmit={handleSubmit}
                  className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:max-w-xl lg:p-8"
                >
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900">
          
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Bonnie Green"
                        required
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900">
                        Card number*
                      </label>
                      <input
                        type="text"
                        id="card-number-input"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900">
                        Card expiration*
                      </label>
                      <input
                        type="text"
                        id="card-expiration-input"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="12/23"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900">
                        CVV*
                      </label>
                      <input
                        type="number"
                        id="cvv-input"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="•••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-700 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing payment..." : `$${price} Pay now`}
                  </button>
                </form>
              </div>

              <p className="mt-6 text-center text-gray-500 lg:text-left">
                Payment processed by <a href="#" className="font-medium text-primary-700 underline hover:no-underline">Paddle</a> for <a href="#" className="font-medium text-primary-700 underline hover:no-underline">Flowbite LLC</a> - United States Of America
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default PaymentForm;
