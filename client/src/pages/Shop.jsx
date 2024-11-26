import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../assets/styles/shop.css';
import SingleProduct from '../components/SingleProduct';
import axios from 'axios';
import Loading from '../components/Loading';
import { useInView } from 'react-intersection-observer';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchProducts = (pageNumber) => {
        setIsLoading(true);
        axios
            .get(`${process.env.REACT_APP_API_KEY}/product/getProducts`, {
                params: { page: pageNumber, limit: 30 }
            })
            .then((res) => {
                const { products: newProducts, hasMore: newHasMore } = res.data;
                if (newProducts.length > 0) {
                    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
                    setHasMore(newHasMore);
                } else {
                    setHasMore(false);
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prevPage) => prevPage + 1); // Increment page when the user scrolls to the bottom
        }
    }, [inView]);

    return (
        <div className='shop'>
            <Header />
            {isLoading && <Loading />}

            <section className="shopProducts">
                <div className="container">
                    <div className="shopHeading">
                        <h3>Showing all products</h3>
                    </div>
                    <div className="productWrap">
                        {products.map((val, i) => (
                            <ScrollReveal key={i}>
                                <SingleProduct data={val} />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {hasMore && (
                <div ref={ref} className="loading-more">
                    {isLoading ? <Loading /> : 'Load more...'}
                </div>
            )}
        </div>
    );
};

const ScrollReveal = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div ref={ref} className={`reveal-item ${inView ? 'visible' : ''}`}>
            {children}
        </div>
    );
};

export default Shop;
