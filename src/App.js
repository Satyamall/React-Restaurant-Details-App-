
import './App.css';
import data from "./data.json";
import RestaurantDetails from './Components/RestaurantDetails/RestaurantDetails';
import { useState } from 'react';
import Pagination from './Components/Pagination';

function App() {
  const [state, setState]=useState({
      filterRating: 0,
  })
  const [payment, setPayment]=useState({
     paymentMethod: "All",
  })
  const [cost, setCost]=useState({
      sortMethod: null
  })
  const [page,setPage]= useState(1);

  const handleRating=(rating)=>{
    setState({filterRating: rating});
  }
  const handlePayment = (payment)=>{
    setPayment({paymentMethod: payment})
  }
  
  const handleSort=(order)=>{
    setCost({sortMethod: order})
  }

  const changePageTo = (num) => {
    if (num <= 1) {
      setPage(1);
      return;
    }
    setPage(num);
  };
  var perPage = 5;
  // lowerBound
  // upperBound
  // const filteredResults = data.filter(
  //   (_, i) => i >= (page - 1) * perPage && i < page * perPage
  // );

  return (
    <div className="App">
      <h1>RESTAURANT WEBSITE</h1>
      <div style={{color: "gray",fontSize: "20px", fontWeight: "500"}}>
        Ratings:
        {
          [4,3,2,1,0].map(rating=>{
            return <button key={rating} onClick={()=> handleRating(rating)}>
              {rating===0 ? "All" : rating}
            </button>
          })
        }
      </div>
      <div style={{color: "gray",fontSize: "20px", fontWeight: "500"}}>
        Payment Methods:
        {
          ["All", "Cash", "Card"].map(method=>{
            return <button key={method} onClick={()=>handlePayment(method)}>{method}</button>
          })
        }
      </div>
      <div style={{color: "gray",fontSize: "20px", fontWeight: "500"}}>
        Cost:
        {
           ["Low To High","High To Low","unsorted"].map(order=> {
             return <button key={order} onClick={() =>handleSort(order)}>
                {order}
              </button>
            })
        }
      </div>
      <div>
        <Pagination
          currentPage={page}
          onClickCallback={(page) => changePageTo(page)}
          total={Math.floor(data.length/5)}
        />
      </div>
      {
        data
        .filter(({rating,payment_methods}) => {
          const { cash, card } = payment_methods;
          let paymentCondition = true;
          if (payment.paymentMethod === "Cash") {
            paymentCondition = cash ? true : false;
          } else if (payment.paymentMethod === "Card") {
            paymentCondition = card ? true : false;
          }
          return rating >= state.filterRating && paymentCondition;
        })
        .filter(
          (_, i) => i >= (page - 1) * perPage && i < page * perPage
        )
        .sort((a, b) =>{
          if (cost.sortMethod === "Low To High") {
            return a.costForTwo - b.costForTwo;
          }
          if (cost.sortMethod === "High To Low") {
            return b.costForTwo - a.costForTwo;
          }
          return 0;
        })
        .map((item) =>{
          return <RestaurantDetails data={item} key={item.id}/>
        })
      }
    </div>
  );
}

export default App;
