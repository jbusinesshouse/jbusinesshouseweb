import React, { useContext, useEffect, useRef, useState } from 'react'
import '../assets/styles/productUpload.css'
import Header from '../components/Header'
import closeIcon from '../assets/images/close.png'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const ProductUpload = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [sizeType, setSizeType] = useState("letter")
  const [selectedSize, setSelectedSize] = useState([])
  const [preImg, setPreImg] = useState(null)
  const [preMultiImg, setPreMultiImg] = useState([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [weight, setWeight] = useState(0)
  const [image, setImage] = useState(null)
  const [subImages, setSubImages] = useState([])
  const [price, setPrice] = useState(0)
  const [wholeMinQuan, setWholeMinQuan] = useState(0)
  const [wholePrice, setWholePrice] = useState(0)
  const [hasDis, setHasDis] = useState(false)
  const [disPrice, setDisPrice] = useState(0)
  const [storeId, setStoreId] = useState("")


  const [isLoading, setIsLoading] = useState(false)
  const { userVal } = useContext(AuthContext)
  const navigate = useNavigate()
  const numberSelectRef = useRef(null);
  const letterSelectRef = useRef(null);

  useEffect(() => {
    setStoreId(userVal?._id)
  }, [userVal])


  const handleSizeType = (type) => {
    numberSelectRef.current.value = "select";
    letterSelectRef.current.value = "select";
    setSelectedSize([])
    setSizeType(type)
  }
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

  const handleSubImageChage = (e) => {
    setPreMultiImg([])
    const files = e.target.files
    if (files.length > 5) {
      e.target.value = ""
      return window.alert("You can upload upto 5 images!")
    }
    for (let i = 0; i < files.length; i++) {
      const item = files[i];
      setPreMultiImg(prev => [...prev, URL.createObjectURL(item)])
    }
    setSubImages(files)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name &&
      description &&
      weight > 0 &&
      image &&
      price > 0 &&
      wholeMinQuan > 0 &&
      wholePrice > 0 &&
      storeId
    ) {
      setIsLoading(true);

      try {
        // Create unique filename for main image
        const fileExtension = image.name.split(".").pop();
        const uniqueFilename = `${image.name.split(".")[0]}-${Date.now()}.${fileExtension}`;

        // Create FormData for main image
        const imageFile = new FormData();
        imageFile.append("image", image, uniqueFilename);

        // Upload main image
        await axios.post(`${process.env.REACT_APP_API_KEY}/uploadImage`, imageFile);

        let newSubImages = [];
        let subFormData = new FormData();

        // Upload subImages only if there are any
        if (subImages.length > 0) {
          for (let i = 0; i < subImages.length; i++) {
            const item = subImages[i];
            const subFileExtension = item.name.split(".").pop();
            const subUniqueFilename = `${item.name.split(".")[0]}-${Date.now()}.${subFileExtension}`;

            subFormData.append("subImages", item, subUniqueFilename);
            newSubImages.push(subUniqueFilename);
          }

          await axios.post(`${process.env.REACT_APP_API_KEY}/uploadImages`, subFormData);
        }

        // Prepare product data
        const productData = {
          name,
          description,
          category: category || "",
          size: selectedSize,
          weight,
          image: uniqueFilename,
          subImages: newSubImages, // Only send if there are subImages
          price,
          wholeMinQuan,
          wholePrice,
          storeId,
        };

        if (hasDis && disPrice > 0) productData.disPrice = disPrice;

        // Save product
        await axios.post(`${process.env.REACT_APP_API_KEY}/product/saveProduct`, productData);

        setIsLoading(false);
        navigate("/");
      } catch (err) {
        setIsLoading(false);
        window.alert("Something went wrong!");
        console.error(err);
      }
    } else {
      window.alert("Please fill in all required fields!");
    }
  };


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
              <label htmlFor="name">Product name <span>*</span></label>
              <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="proUpInp">
              <label htmlFor="desc">Product description <span>*</span></label>
              <textarea type="text" name="desc" id="desc" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="proUpInp">
              <label htmlFor="proCat">Product category name</label>
              <input type="text" name="proCat" id="proCat" value={category} onChange={e => setCategory(e.target.value)} />
            </div>
            <div className="proUpInp">
              <label>Product size</label>
              <div className="proUpSizeTog">
                <button type='button' className={sizeType === "letter" ? "active" : ""} onClick={() => handleSizeType("letter")}>Letter size</button>
                <button type='button' className={sizeType === "number" ? "active" : ""} onClick={() => handleSizeType("number")}>Number size</button>
              </div>
              <div style={{ display: sizeType === "number" ? "block" : "none" }}>
                <select type="text" name="sizeNum" id="sizeNum" defaultValue={'select'} onChange={e => handleSizeUpdate(e)} ref={numberSelectRef}>
                  <option value="select" disabled>Select options</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
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
              </div>
              <div style={{ display: sizeType === "letter" ? "block" : "none" }}>
                <select type="text" name="sizeLet" id="sizeLet" defaultValue={'select'} onChange={e => handleSizeUpdate(e)} ref={letterSelectRef}>
                  <option value="select" disabled>Select options</option>
                  <option value="XXS">XXS</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL (2XL)</option>
                  <option value="XXXL">XXXL (3XL)</option>
                </select>
              </div>
              <div className="proSizePre">
                {
                  selectedSize.map((val, i) => {
                    return <span key={i} onClick={() => handleSizeDel(i)}>{val} <img src={closeIcon} alt="" /></span>
                  })
                }
              </div>
            </div>
            <div className="proUpInp">
              <label htmlFor="weight">Product weight (gram) <span>*</span></label>
              <input type="number" name="weight" id="weight" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
            <div className="proUpInp proUpImgInp">
              <label htmlFor="image">Product main image <span>*</span></label>
              <input type="file" name="image" id="image" accept='image/*' onChange={e => handleImageChange(e)} />
              {
                preImg && <img src={preImg} alt="" className='proPrevImg' />
              }
            </div>
            <div className="proUpInp proUpImgInp">
              <label htmlFor="image">Product extra images - upto 5</label>
              <input type="file" name="subimage" id="subimage" accept='image/*' multiple onChange={e => handleSubImageChage(e)} />

              {
                preMultiImg.length > 0 && (
                  <div className="proPrevMultiImgWrap">
                    {
                      preMultiImg.map((url, i) => {
                        return <img src={url} alt="" className='proPrevMultiImg' key={i} />
                      })
                    }
                  </div>
                )
              }
            </div>
            <div className="proUpInp">
              <label htmlFor="price">Product price <span>*</span></label>
              <input type="number" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            <div className="wholeSalePart">
              <div className="proUpInp">
                <label htmlFor="wholeQuan">Wholesale minimum quantity <span>*</span></label>
                <input type="number" name="wholeQuan" id="wholeQuan" value={wholeMinQuan} onChange={e => setWholeMinQuan(e.target.value)} />
              </div>
              <div className='proUpInp'>
                <label htmlFor="wholePrice">Wholesale price <span>*</span></label>
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
                <label htmlFor="disPrice">Discounted price <span>*</span></label>
                <input type="number" name="disPrice" id="disPrice" value={disPrice} onChange={e => setDisPrice(e.target.value)} />
              </div>
            }
            <button type='submit'>Upload Product</button>
            <small className="mustInp"><span>*</span> চিহ্ন দেয়া ইনপুট গুলো আবশ্যক</small>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProductUpload