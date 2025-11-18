import React, { useEffect, useState } from "react";
import "./App.css";

import next from "../src/assets/next.png"
import back from "../src/assets/back.png"

const ProductCard = ({ image, title }) => {
  
  return (
    <div className="product_card">
      <img src={image} alt={title} width={30} />

      <span>{title}</span>
    </div>
  );
};

const PAGE_SIZE = 7;

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("https://dummyjson.com/products?limit=43");
      const json = await data.json();
      setProducts(json.products);
    };
    fetchData();
  }, []);

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = currentPage * PAGE_SIZE;

  

  const Page = ({ page }) => {
    
    return (
      <span className={`page ${currentPage === page ?"active":""}`} onClick={() => handlePageChange(page)}>
        {page}
      </span>
    );
  };
  const handleLeftClick=()=>{
    setCurrentPage(currentPage => currentPage - 1);
  }
  const handleRightClick=()=>{
    setCurrentPage(currentPage =>currentPage + 1);
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return !products.length ? (
    <h1>No Products Found</h1>
  ) : (
    <div className="container">
      <h1>Pagination</h1>
      {products.slice(start, end).map((p) => {
        return <ProductCard key={p.id} title={p.title} image={p.images[0]} />;
      })}
        <div className="pages">
      {
        currentPage !== 1 && <span className="arrows" onClick={()=>handleLeftClick()}> <img src={back}></img> </span>
      }
        {new Array(noOfPages).fill(null).map((p, i) => {
          return <Page key={i} page={i + 1} />;
        })}
      {
        currentPage !== noOfPages && <span className="arrows" onClick={()=>handleRightClick()}> <img src={next}></img> </span>
      }
      </div>
    </div>
  );
}

export default App;
