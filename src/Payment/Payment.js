import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import './Payment.css';
import { useNavigate } from 'react-router-dom';
const Payment = () => {
    const [shippingAddress, setShippingAddress] = useState({
        country: '',
        name: '',
        phoneNumber: '',
        address: '',
    });

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);

    const [cardInfo, setCardInfo] = useState({
        cardNumber: '',
        cardName: '',
        cardExpiry: '',
        cardCVC: '',
    });

    const [orderSummary, setOrderSummary] = useState({
        items: 0,
        subtotal: 0,
        shippingHandling: 10, // Default shipping cost
        total: 0,
    });

    const navigate = useNavigate();
    useEffect(() => {
        const storedOrderSummary = JSON.parse(localStorage.getItem('orderSummary')) || {
            items: 0,
            subtotal: 0,
            shippingHandling: 10,
            total: 0,
        };
        setOrderSummary(storedOrderSummary);
    }, []);

    useEffect(() => {

        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const itemCount = storedProducts.length;
        const subtotal = storedProducts.reduce((total, product) => total + product.price, 0);
        const total = subtotal + orderSummary.shippingHandling;

        setOrderSummary((prevSummary) => ({
            ...prevSummary,
            items: itemCount,
            subtotal: subtotal,
            total: total,
        }));

        localStorage.setItem('orderSummary', JSON.stringify({
            items: itemCount,
            subtotal: subtotal,
            shippingHandling: orderSummary.shippingHandling,
            total: total,
        }));
    }, [orderSummary.shippingHandling]);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    };

    const handleUseAddress = () => {
        setShowPaymentMethods(true);
    };


    const handlePaymentSuccess = () => {
        // Perform payment logic here
        // If payment is successful, navigate to the success page
        navigate('/success');
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cardExpiry') {
            const [month, year] = value.split('/');
            setCardInfo((prevCardInfo) => ({ ...prevCardInfo, cardExpiryMonth: month, cardExpiryYear: year }));
        } else {
            setCardInfo((prevCardInfo) => ({ ...prevCardInfo, [name]: value }));
        }
    };
    return (
        <MDBContainer className="payment-page">
            <MDBRow>
                <MDBCol md="8">
                    <h2>Choose a shipping address</h2>
                    <div className="address-form">
                        <MDBInput label="Country" name="country" value={shippingAddress.country} onChange={handleAddressChange} />
                        <MDBInput label="Full Name" name="name" value={shippingAddress.name} onChange={handleAddressChange} />
                        <MDBInput label="Phone Number" name="phoneNumber" value={shippingAddress.phoneNumber} onChange={handleAddressChange} />
                        <MDBInput type="textarea" label="Address" name="address" value={shippingAddress.address} onChange={handleAddressChange} />
                    </div>
                    <MDBBtn color="primary" onClick={handleUseAddress}>
                        Use this address
                    </MDBBtn>

                    {showPaymentMethods && (
                        <div className="payment-methods">
                            <h2>Select a payment method</h2>
                            <div className="payment-icons">
                                <MDBIcon fab icon="cc-visa" onClick={() => handlePaymentMethodSelect('visa')} className={selectedPaymentMethod === 'visa' ? 'selected' : ''} />
                                <MDBIcon far icon="credit-card" onClick={() => handlePaymentMethodSelect('credit')} className={selectedPaymentMethod === 'credit' ? 'selected' : ''} />
                                <MDBIcon fas icon="money-bill-wave" onClick={() => handlePaymentMethodSelect('cash')} className={selectedPaymentMethod === 'cash' ? 'selected' : ''} />
                                <MDBIcon far icon="comment" onClick={() => handlePaymentMethodSelect('momo')} className={selectedPaymentMethod === 'momo' ? 'selected' : ''} />
                            </div>
                            {(selectedPaymentMethod === 'credit' || selectedPaymentMethod === 'visa') && (
                                <div className="card-info">
                                    <h3>Enter Card Information</h3>
                                    <div className="card-inputs">
                                        <div className="mb-3">
                                            <MDBInput label="Card Number" name="cardNumber" value={cardInfo.cardNumber} onChange={handleCardInfoChange} />
                                        </div>
                                        <div className="mb-3">
                                            <MDBInput label="Cardholder Name" name="cardName" value={cardInfo.cardName} onChange={handleCardInfoChange} />
                                        </div>
                                        <div className="expiration-cvc d-flex">
                                            <div className="mb-3 me-3">
                                                <MDBInput
                                                    label="Expiration Date"
                                                    name="cardExpiry"
                                                    value={`${cardInfo.cardExpiryMonth || ''}/${cardInfo.cardExpiryYear || ''}`}
                                                    onChange={handleCardInfoChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <MDBInput label="CVC" name="cardCVC" value={cardInfo.cardCVC} onChange={handleCardInfoChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <MDBBtn color="success" className="process-button" onClick={handlePaymentSuccess}>
                                Continue to Place Your Order
                            </MDBBtn>
                        </div>
                    )}
                </MDBCol>

                <MDBCol md="4">
                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <p>Items: {orderSummary.items}</p>
                        <p>Subtotal: ${orderSummary.subtotal.toFixed(2)}</p>
                        <p>Shipping & Handling: ${orderSummary.shippingHandling.toFixed(2)}</p>
                        <p>Total: ${orderSummary.total.toFixed(2)}</p>
                    </div>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Payment;
