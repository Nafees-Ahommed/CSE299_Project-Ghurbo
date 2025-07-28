import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';

const PaymentMethod = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { axios, getToken } = useAppContext();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [fetchingBooking, setFetchingBooking] = useState(true);

  // Bangladeshi payment methods (change icons as needed)
  const paymentMethods = [
    { 
      id: 'bKash', 
      name: 'bKash', 
      icon: assets.bKash, 
      description: 'Pay with bKash Mobile Banking'
    },
    { 
      id: 'Nagad', 
      name: 'Nagad', 
      icon: assets.Nagad, 
      description: 'Pay with Nagad Digital Payment'
    },
    { 
      id: 'Bank Transfer', 
      name: 'Bank Transfer', 
      icon: assets.Bank, 
      description: 'Direct bank transfer or online banking'
    },
    { 
      id: 'Card', 
      name: 'Debit/Credit Card', 
      icon: assets.Card, 
      description: 'Visa, MasterCard, or local cards'
    }
  ];

  useEffect(() => {
    fetchBookingDetails();
    // eslint-disable-next-line
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user', {
        headers: {
          'Authorization': `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        const booking = data.bookings.find(b => b._id === bookingId);
        if (booking) {
          setBookingData(booking);
          if (booking.isPaid) {
            toast('This booking is already paid');
            navigate('/my-bookings');
            return;
          }
        } else {
          toast.error('Booking not found');
          navigate('/my-bookings');
        }
      } else {
        toast.error('Failed to fetch booking details');
        navigate('/my-bookings');
      }
    } catch (error) {
      toast.error('Failed to load booking details');
      navigate('/my-bookings');
    } finally {
      setFetchingBooking(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post('/api/bookings/confirm-payment', {
        bookingId,
        paymentMethod: selectedMethod
      }, {
        headers: {
          'Authorization': `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        toast.success(`Payment confirmed via ${selectedMethod}!`);
        setTimeout(() => {
          navigate('/my-bookings');
        }, 2000);
      } else {
        toast.error(data.message || 'Payment confirmation failed');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // While loading booking data
  if (fetchingBooking) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-500">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-8 pt-24">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-center mb-3 text-gray-800">
            Complete Your Payment
          </h1>
          <p className="text-center text-gray-500 mb-6 text-lg">
            Choose your preferred payment method
          </p>
          {/* Booking Summary */}
          {bookingData && (
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-100 shadow-sm mb-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <div className="w-1.5 h-4 bg-orange-500 rounded-full mr-2"></div>
                Booking Summary
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-medium">{bookingData.existingPackage?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span className="font-medium">{bookingData.guests} person(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {new Date(bookingData.ArrivalDate).toLocaleDateString()} - {new Date(bookingData.DepartureDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-800">Total Amount:</span>
                  <span className="font-bold text-orange-500 text-lg">৳ {bookingData.totalPrice?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment Methods - Modern Card Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
            <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
            Select Payment Method
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`payment-card border-2 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all
                  ${selectedMethod === method.id
                    ? 'border-orange-500 ring-2 ring-orange-300 bg-orange-50 shadow-lg scale-[1.04]'
                    : 'border-gray-200 hover:border-orange-400 hover:ring-2 hover:ring-orange-100 hover:scale-[1.03] bg-white'
                  }`}
                onClick={() => setSelectedMethod(method.id)}
                tabIndex={0}
                role="button"
                aria-pressed={selectedMethod === method.id}
                onKeyDown={e => { if (e.key === 'Enter') setSelectedMethod(method.id) }}
              >
                <img
                  src={method.icon}
                  alt={method.name}
                  className="w-14 h-14 object-contain mb-2"
                  draggable={false}
                  style={{ filter: "none" }}
                />
                <div className="font-semibold text-gray-800 mb-1">{method.name}</div>
                <div className="text-xs text-gray-500 text-center">{method.description}</div>
                {selectedMethod === method.id && (
                  <div className="mt-2 w-6 h-6 rounded-full border-2 border-orange-500 flex items-center justify-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Payment Note */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="text-orange-500 mr-2">ℹ️</div>
              <div className="text-sm text-orange-800">
                <p className="font-medium mb-1">Important Note:</p>
                <p>This is a demo payment system. No actual transaction will be processed. Your booking will be marked as paid for demonstration purposes.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={loading || !selectedMethod}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200
                ${loading || !selectedMethod
                  ? 'bg-orange-200 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 shadow-lg hover:shadow-xl'
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </div>
              ) : (
                `Confirm Payment via ${selectedMethod || 'Selected Method'}`
              )}
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              disabled={loading}
              className="w-full py-3 px-4 border border-orange-300 rounded-lg text-orange-500 hover:bg-orange-50 transition-all duration-200 font-medium"
            >
              Cancel & Go Back
            </button>
          </div>
        </div>
        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-orange-400">
            🔒 Your payment information is secure and encrypted
          </p>
        </div>
      </div>
      {/* Extra Card Animation for Shadow */}
      <style>{`
        .payment-card {
          transition:
            border-color 0.18s cubic-bezier(0.4,0,0.2,1),
            box-shadow 0.22s cubic-bezier(0.4,0,0.2,1),
            transform 0.18s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default PaymentMethod;
