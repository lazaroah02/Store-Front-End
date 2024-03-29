import React, {useState, useEffect, useContext} from 'react';
import Modal from 'react-bootstrap/Modal'
import getCategories from '../../../../services/getCategories'
import createNewProduct from '../../../../services/createNewProduct'
import ProgresGif from '../../../ProgresGif'
import InfoUserContext from '../../../../context/InfoUserContext';

export default function ({showModal, setShowModal, getProducts}){
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const {infoUser} = useContext(InfoUserContext)

    //error messages
    const [showEmptyName, setShowEmptyName] = useState(true);
    const [showErrorPrice, setShowErrorPrice] = useState(true);
    const [showErrorDescuento, setShowErrorDescuento] = useState(true);
    const [showErrorCantidad, setShowErrorCantidad] = useState(true);
    const [showErrorImg1, setShowImg1] = useState(true);

    useEffect(() => {
        getCategories().then((data) => {
          setCategories(data);
        });
      }, []);

    function handleAddProduct(e) {
        e.preventDefault();
    
        //recupero toda la info del formulario
        const info = {
          name: e.target[0].value,
          description: e.target[1].value,
          about: e.target[2].value,
          precio: e.target[3].value,
          descuento: e.target[4].value,
          in_stock: e.target[5].value,
          categoria_id: e.target[6].value,
          img1: document.getElementById("img1").files[0],
          img2: document.getElementById("img2").files[0],
          img3: document.getElementById("img3").files[0],
        };
        
        //validacion del formulario
        if (info.name === "") {
            setShowEmptyName(false)
        }else if(info.precio === "" || (info.precio.replace(/[^0-9]/g,"")).length !== info.precio.length){
            setShowErrorPrice(false)
        }else if((info.descuento.replace(/[^0-9]/g,"")).length !== info.descuento.length){
            setShowErrorDescuento(false)
        }else if((info.in_stock.replace(/[^0-9]/g,"")).length !== info.in_stock.length || info.in_stock === "0"){
            setShowErrorCantidad(false)
        }else if(info.img1 === undefined){
            setShowImg1(false)
        }
        else{
            setLoading(true)
            createNewProduct({info:info, token:infoUser.token, username:infoUser.info.username})
            .then(res => {
                if(res.status === 200){
                    setLoading(false)
                    getProducts()
                    setShowModal(false)
                }
                else{
                    alert('Error al crear el producto')
                }
            })
        }
      }

    return(
        <div>
            <Modal show={showModal}>
            <Modal.Header>
                Add new product
                <button className="btn btn-danger" onClick={() => setShowModal(false)}>
                    X
                </button>
            </Modal.Header>
            <Modal.Body>
                <form
                    className="AddProductForm"
                    onSubmit={(e) => handleAddProduct(e)}
                    encType="multipart/form-data"
                >
                    <label>Name:</label>
                    <input onChange={() => setShowEmptyName(true)}></input>
                    <p className = 'error-message' hidden={showEmptyName}>Debes ingresar un nombre</p>
                    <br />
                    <label>Short Description:</label>
                    <input></input>
                    <label>About:</label>
                    <textarea></textarea>
                    <label>Precio:</label>
                    <input onChange={() => setShowErrorPrice(true)}></input>
                    <p className = 'error-message' hidden={showErrorPrice}>Debes ingresar un precio valido</p>
                    <br />
                    <br />
                    <label>Descuento: 0 por defecto</label>
                    <input onChange={() => setShowErrorDescuento(true)}></input>
                    <p className = 'error-message' hidden={showErrorDescuento}>Debes ingresar un descuento valido</p>
                    <br />
                    <br />
                    <label>Cantidad: 1 por defecto</label>
                    <input onChange={() => setShowErrorCantidad(true)}></input>
                    <p className = 'error-message' hidden={showErrorCantidad}>Debes ingresar una cantidad valida mayor que cero</p>
                    <br/>
                    <br/>
                    <label>Categoria</label>
                    <br />
                    <select>
                    {categories.length === 0
                        ? null
                        : categories.map((category) => (
                            <option 
                            key = {category.id}
                            value = {category.id}
                            >
                            {category.nombre}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <input id="img1" type="file" accept=".png, .jpg" onChange={() => setShowImg1(true)}></input>
                    <p className = 'error-message' hidden={showErrorImg1}>Debes ingresar una imagen</p>
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