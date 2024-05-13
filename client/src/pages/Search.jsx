import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Header from '../components/Header'
import '../assets/styles/shop.css'
import SingleProduct from '../components/SingleProduct'
import axios from 'axios';
import Loading from '../components/Loading';




const Search = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const productName = window.location.pathname.split("/search/")[1].replace("%20"," ")
    console.log(productName);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_API_KEY}/product/search`, { name: productName }).then(res => {
            const revData = res.data.reverse()
            setProducts(revData)
            setIsLoading(false)
        }).catch(err => {
            console.log(err);
            setIsLoading(false)
        })
    }, [productName])

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + 12;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / 12);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * 12) % products.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };



    return (
        <div className='shop'>
            <Header />
            {
                isLoading &&
                <Loading />
            }
            <section className="shopProducts">
                <div className="container">
                    <div className="shopHeading">
                        <h3>Showing {products.length} results</h3>
                    </div>
                    <div className="productWrap">
                        {
                            currentItems.map((val, i) => {
                                return <SingleProduct data={val} key={i} />
                            })
                        }
                    </div>
                </div>
            </section>

            <section className="paginationWrap">
                <div className="container">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </section>
        </div>
    )
}

export default Search