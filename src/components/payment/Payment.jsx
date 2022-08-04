import StripeCheckout from "react-stripe-checkout";
import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
const KEY ="stripetokenkey";
const Payment = ({ hotelId }) => {
    const [stripeToken, setStripeToken] = useState(null);
    const { dates } = useContext(SearchContext);
    const { data, loading, error } = useFetch(`https://makemytravel-backend.herokuapp.com/api/hotels/room/${hotelId}`);
    const navigate = useNavigate();
    const onToken = (token) => {
      setStripeToken(token);
    };
    const handlePayment=()=>{
      navigate("/");
    }
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
      return diffDays;
    }
    const days = dayDifference(dates[0].endDate, dates[0].startDate);
    console.log(days)
    {data.map((item) => (<StripeCheckout
        name="bookyourhotel"
        image="https://www.vapulus.com/en/wp-content/uploads/2021/02/Faber-payment-gateway.jpg"
        // billingAddress
        // shippingAddress
        description={`Your total is ${days*item.price}`}
        token={onToken}
        stripeKey={KEY}
      >
        <button onClick={handlePayment}>Reserve Now</button>
      </StripeCheckout>))}
  
}

export default Payment