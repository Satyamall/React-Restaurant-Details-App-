function Pagination({ total, currentPage, onClickCallback }) {
    const pages = new Array(total).fill(0).map((value, index) =>
      currentPage === index + 1 ? (
        <button disabled key={index} style={{background: "gray"}}>
          {index + 1}
        </button>
      ) : (
        <button key={index} onClick={() => onClickCallback(index + 1)}>
          {" "}
          {index + 1}
        </button>
      )
    );
    return <div style={{color: "gray",fontSize: "20px", fontWeight: "500", marginBottom: 10}}>Pages: {pages}</div>;
  }
  
  export default Pagination;
  