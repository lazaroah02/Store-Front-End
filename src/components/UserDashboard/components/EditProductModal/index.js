import React, {useState, useEffect} from 'react';
import getCategories from "../../../../services/getCategories";
import updateProduct from '../../../../services/updateProduct'
import Modal from 'react-bootstrap/Modal'
import './index.css'
import ProgresGif from '../../../ProgresGif'

export default function EditProductModal({infoProduct, showModal, setShowModal, updateProductDetail, setUpdateProductDetail}){
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    //Info of the form
    const [productName, setProductName] = useState(infoProduct.product_name);
    const [productDescription, setProductDescription] = useState(infoProduct.product_description);
    const [productAbout, setProductAbout] = useState(infoProduct.about);
    const [productPrice, setProductPrice] = useState(infoProduct.precio);
    const [productCategory, setProductCategory] = useState(infoProduct.categoria);
    //error messages
    const [showEmptyName, setShowEmptyName] = useState(true);
    const [showErrorPrice, setShowErrorPrice] = useState(true);

    useEffect(() => {
        getCategories().then((data) => {
          setCategories(data);
        });
      }, []);

    useEffect(() => {
        setProductName(infoProduct.product_name)
        setProductDescription(infoProduct.product_description)
        setProductAbout(infoProduct.about)
        setProductPrice(String(infoProduct.precio))
        setProductCategory(infoProduct.categoria)
        
        //obtengo el option que tiene la misma categoria del producto y lo selecciono
        let option = document.getElementById(productCategory)
        if(option !== null && option !== undefined){
            option.setAttribute("selected",true)
        }
    },[infoProduct])  

    function handleEditProduct(e) {
        e.preventDefault();
    
        //recupero toda la info del formulario
        const info = {
          id:infoProduct.id,  
          name: productName,
          description: productDescription,
          about: productAbout,
          precio: productPrice,
          categoria_id: e.target[4].value,
          img1: document.getElementById("img1").files[0],
          img2: document.getElementById("img2").files[0],
          img3: document.getElementById("img3").files[0],
        };
        
        //validacion del formulario
        if (info.name === "") {
            setShowEmptyName(false)
        }else if(info.precio === "" || ((String(info.precio)).replace(/[^0-9]/g,"")).length !== info.precio.length){
            setShowErrorPrice(false)
        }
        else{
            setLoading(true)
            updateProduct(info)
            .then(res => {
                if(res.status === 200){
                    setLoading(false)
                    setShowModal(false)
                    setUpdateProductDetail(updateProductDetail + 1)
                    alert('Product updated successfully')
                }
                else{
                    alert('Error al editar el producto')
                }
            })
        }
      }

    return(
        <div>
            <Modal show={showModal}>
                <Modal.Header>
                Edit product
                <button className="btn btn-danger" onClick={() => setShowModal(false)}>
                    X
                </button>
                </Modal.Header>
                <Modal.Body>
                <form
                    className="AddProductForm"
                    onSubmit={(e) => handleEditProduct(e)}
                    encType="multipart/form-data"
                >
                    <label>Name:</label>
                    <input onChange={(e) => {
                        setShowEmptyName(true)
                        setProductName(e.target.value)
                        }} value = {productName}></input>
                    <p className = 'error-message' hidden={showEmptyName}>Debes ingresar un nombre</p>
                    <br />
                    <label>Short Description:</label>
                    <input value = {productDescription} onChange={(e) => setProductDescription(e.target.value)}></input>
                    <label>About:</label>
                    <textarea value = {productAbout} onChange={(e) => setProductAbout(e.target.value)}></textarea>
                    <label>Precio:</label>
                    <input onChange={(e) => {
                        setShowErrorPrice(true)
                        setProductPrice(e.target.value)
                        }} value = {productPrice}></input>
                    <p className = 'error-message' hidden={showErrorPrice}>Debes ingresar un precio valido</p>
                    <br />
                    <br />
                    <label>Categoria</label>
                    <br />
                    <select defaultValue={productCategory}>
                    {categories.length === 0
                        ? null
                        : categories.map((category) => 
                            <option 
                            key = {category.id}
                            value={category.id}
                            >
                            {category.nombre}
                            </option>   
                        )}
                    </select>
                    <br />
                    <br />
                    <input id="img1" type="file" accept=".png, .jpg"></input>
                    <br />
                    <br />
                    <input id="img2" type="file" accept=".png, .jpg" ></input>
                    <br />
                    <br />
                    <input id="img3" type="file" accept=".png, .jpg" ></input>
                    <br />
                    <br />
                    {loading === true?<ProgresGif/>:null}
                    <button className="btn btn-primary">
                    Submit
                    </button>
                </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}