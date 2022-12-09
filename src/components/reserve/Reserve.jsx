import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import StripeCheckout from "react-stripe-checkout";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const KEY ="pk_test_51L8n14SHuogYXHIU3uWvlDwpEkxj1rXHckGYg59RVBgpm6rgHjIqC3mQQ2NZHrr3h8RyNiQWnrCaj0joL8vlSTWM00GIAv5nzh";
const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [stripeToken, setStripeToken] = useState(null);
  const { data, loading, error } = useFetch(`https://bookingapp-server.vercel.app/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };
const onToken = (token) => {
  setStripeToken(token);
}
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const { options } = useContext(SearchContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  console.log(days)
  
  const navigate = useNavigate();
  const handlePayment=()=>{
    navigate("/");
  }

  // const handleClick = async () => {
  //   try {
  //     await Promise.all(
  //       selectedRooms.map((roomId) => {
  //         const res = axios.put(`https://bookingapp-server.herokuapp.com/api/rooms/availability/${roomId}`, {
  //           dates: alldates,
  //         });
  //         return res.data;
  //       })
  //     );
  //     setOpen(false);
  //     navigate("/");
  //   } catch (err) {}
  // };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        <div className="rContainerBox">
        <div className="rContainerLeft">
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div key={roomNumber._id} className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
        <div className="rContainerRight"> {data.map((item) => (<StripeCheckout
              name="MakemyTravel"
              image="https://5.imimg.com/data5/HF/NI/MY-46973070/international-payment-gateway-500x500.png"
              // billingAddress
              // shippingAddress
              description={`Your total is ${days*item.price}`}
              token={onToken}
              stripeKey={KEY}
            >
              <button className="rButton" onClick={handlePayment}>Reserve Now</button>
            </StripeCheckout>))}</div>
        </div>
       
      
       
 
            
       
      </div>
    </div>
  );
};

export default Reserve;
