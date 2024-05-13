import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import Header from '../components/Header'
import '../assets/styles/shop.css'
import SingleProduct from '../components/SingleProduct'
import axios from 'axios';
import Loading from '../components/Loading';



const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const Shop = () => {
    const [reservedProducts, setReservedProducts] = useState([])
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState("all")
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_API_KEY}/product/getProducts`).then(res => {
            // const revData = res.data.reverse()
            // Generate an array of indices
            let indices = Array.from({ length: res.data.length }, (_, i) => i);
            // Shuffle indices
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            // Create a new array using shuffled indices
            const shuffledArray = indices.map(index => res.data[index]);
            setReservedProducts(shuffledArray);

            setProducts(shuffledArray)
            setIsLoading(false)
        }).catch(err => {
            console.log(err);
            setIsLoading(false)
        })
    }, [])

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

    const handleCategory = (val) => {
        setCategory(val)
        if (val === "all") {
            setProducts(reservedProducts)
        } else {
            const filteredVal = reservedProducts.filter(item => {
                return item.category === val
            })
            setProducts(filteredVal)
        }
    }


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
                        <select value={category} onChange={e => handleCategory(e.target.value)}>
                            <option value="all">All</option>
                            <option value="panjabi">Panjabi</option>
                            <option value="shirt">Shirt</option>
                            <option value="pant">Pant</option>
                            <option value="others">Others</option>
                        </select>
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

export default Shop