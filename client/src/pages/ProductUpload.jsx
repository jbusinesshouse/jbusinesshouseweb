import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/productUpload.css'
import Header from '../components/Header'
import closeIcon from '../assets/images/close.png'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const ProductUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedSize, setSelectedSize] = useState([])
  const [preImg, setPreImg] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("select")
  const [weight, setWeight] = useState(0)
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState(0)
  const [wholeMinQuan, setWholeMinQuan] = useState(0)
  const [wholePrice, setWholePrice] = useState(0)
  const [hasDis, setHasDis] = useState(false)
  const [disPrice, setDisPrice] = useState(0)
  const [storeId, setStoreId] = useState("")


  const [isLoading, setIsLoading] = useState(false)
  const { userVal } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    setStoreId(userVal?._id)
  }, [userVal])

  const handleSizeUpdate = (e) => {
    if (!selectedSize.includes(e.target.value)) {
      setSelectedSize(prev => [...prev, e.target.value])
    }
  }
  const handleSizeDel = (i) => {
    const filterSize = selectedSize.filter((item, ind) => {
      return ind !== i
    })
    setSelectedSize(filterSize);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreImg(URL.createObjectURL(file));
      setImage(file)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name && description && category !== "select" && weight > 0 && image && price > 0 && wholeMinQuan > 0 && wholePrice > 0 && hasDis && disPrice > 0 && storeId) {
      setIsLoading(true)
      const fileExtension = image.name.split('.').pop();
      const currentDate = new Date();
      const uniqueFilename = `${image.name.split('.')[0]}-${currentDate.getTime()}.${fileExtension}`;
      const imageFile = new FormData()
      imageFile.append("image", image, uniqueFilename)

      axios.post(`${process.env.REACT_APP_API_KEY}/uploadImage`, imageFile).then(res => {
        axios.post(`${process.env.REACT_APP_API_KEY}/product/saveProduct`, { name, description, category, size: selectedSize, weight, image: uniqueFilename, price, disPrice, wholeMinQuan, wholePrice, storeId }).then(res => {
          // console.log(res.data);
          setIsLoading(false)
          navigate("/")
        }).catch(err => {
          setIsLoading(false)
          window.alert("Something went wrong!")
          console.log("Product error");
        })
      }).catch(err => {
        setIsLoading(false)
        window.alert("Something went wrong!")
        console.log("Image error");
      })
    } else if (name && description && category !== "select" && weight > 0 && image && price > 0 && wholeMinQuan > 0 && wholePrice > 0 && !hasDis && storeId) {
      setIsLoading(true)
      const fileExtension = image.name.split('.').pop();
      const currentDate = new Date();
      const uniqueFilename = `${image.name.split('.')[0]}-${currentDate.getTime()}.${fileExtension}`;
      const imageFile = new FormData()
      imageFile.append("image", image, uniqueFilename)

      axios.post(`${process.env.REACT_APP_API_KEY}/uploadImage`, imageFile).then(res => {
        axios.post(`${process.env.REACT_APP_API_KEY}/product/saveProduct`, { name, description, category, size: selectedSize, weight, image: uniqueFilename, price, wholeMinQuan, wholePrice, storeId }).then(res => {
          // console.log(res.data);
          setIsLoading(false)
          navigate("/")
        }).catch(err => {
          setIsLoading(false)
          window.alert("Something went wrong!")
          console.log("Product error");
        })
      }).catch(err => {
        setIsLoading(false)
        window.alert("Something went wrong!")
        console.log("Image error");
      })
    } else {
      window.alert("Please fill in all required fields!")
    }
  }

  return (
    <div className='productUpload'>
      <Header />
      {
        isLoading && <Loading />
      }
      <div className="productUpWrap">
        <div className="container">
          <h1>Upload your product</h1>
          <form onSubmit={handleSubmit}>
            <div className="proUpInp">
              <label htmlFor="name">Product name</label>
              <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="proUpInp">
              <label htmlFor="desc">Product description</label>
              <textarea type="text" name="desc" id="desc" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="proUpInp">
              <label htmlFor="proCat">Product category</label>
              <select name="proCat" id="proCat" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="select" disabled>Select an option</option>
                <option value="shirt">Shirt</option>
                <option value="pant">Pant</option>
                <option value="panjabi">Panjabi</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="proUpInp">
              <label htmlFor="size">Product size</label>
              <select type="text" name="size" id="size" defaultValue={'select'} onChange={e => handleSizeUpdate(e)}>
                <option value="select" disabled>Select an option</option>
                <option value="30">30</option>
                <option value="31">31</option>
                <option value="32">32</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
                <option value="37">37</option>
                <option value="38">38</option>
                <option value="39">39</option>
                <option value="40">40</option>
                <option value="41">41</option>
                <option value="42">42</option>
                <option value="43">43</option>
                <option value="44">44</option>
                <option value="45">45</option>
                <option value="46">46</option>
                <option value="47">47</option>
                <option value="48">48</option>
                <option value="49">49</option>
                <option value="50">50</option>
              </select>
              <div className="proSizePre">
                {
                  selectedSize.map((val, i) => {
                    return <span key={i} onClick={() => handleSizeDel(i)}>{val} <img src={closeIcon} alt="" /></span>
                  })
                }
              </div>
            </div>
            <div className="proUpInp">
              <label htmlFor="weight">Product weight (gram)</label>
              <input type="number" name="weight" id="weight" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
            <div className="proUpInp proUpImgInp">
              <label htmlFor="image">Product image</label>
              <input type="file" name="image" id="image" accept='image/*' onChange={e => handleImageChange(e)} />
              {
                preImg && <img src={preImg} alt="" className='proPrevImg' />
              }
            </div>
            <div className="proUpInp">
              <label htmlFor="price">Product price</label>
              <input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            <div className="wholeSalePart">
              <div className="proUpInp">
                <label htmlFor="wholeQuan">Wholesale minimum quantity</label>
                <input type="number" name="wholeQuan" id="wholeQuan" value={wholeMinQuan} onChange={e => setWholeMinQuan(e.target.value)} />
              </div>
              <div className='proUpInp'>
                <label htmlFor="wholePrice">Wholesale price</label>
                <input type="number" name="wholePrice" id="wholePrice" value={wholePrice} onChange={e => setWholePrice(e.target.value)} />
              </div>
            </div>
            <div className="disCon">
              <input type="checkbox" name='disCheck' id='disCheck' value={hasDis} onChange={e => setHasDis(e.target.checked)} />
              <label htmlFor="disCheck">Add single product discount</label>
            </div>
            {
              hasDis &&
              <div className="proUpInp">
                <label htmlFor="disPrice">Discounted price</label>
                <input type="number" name="disPrice" id="disPrice" value={disPrice} onChange={e => setDisPrice(e.target.value)} />
              </div>
            }
            <button type='submit'>Upload Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductUpload