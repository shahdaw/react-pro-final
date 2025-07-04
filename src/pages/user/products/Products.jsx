import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products?page=1&limit=10`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const productsPerPage = 4;
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setPaginatedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, products]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

 
    if (isLoading) {
       return (
         <div className="loaderContainer">
           <div className="spinner"></div>
         </div>
       );
     }

  return (
    <section className="products-section">
      <h2 className="title">All Products</h2>
      <div className="products-flex">
        {paginatedProducts.map(product => (
          <div className="product-card" key={product._id}>
            <div className="image-container">
              <img className="product-image" src={product.mainImage.secure_url} alt={product.name} />
            </div>
            <h2 className="product-name">{product.name}</h2>
            <Link className="details-btn" to={`/product/${product._id}`}>Details</Link>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(products.length / 4)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active-page"
        />
      </div>
    </section>
  );
}
