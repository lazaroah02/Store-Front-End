import React, { useState, useEffect } from "react";
import GenerateCardsOfProducts from "../GenerateCardsOfProducts";
import Modal from "react-bootstrap/Modal";
import getCategories from "../../../../services/getCategories";
import createNewCategory from "../../../../services/createNewCategory";
import createNewProduct from "../../../../services/createNewProduct";
import "./index.css";

export default function InfoUser() {
  const [showModal, setShow] = useState(false);
  const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [updateCategories, setUpdateCategories] = useState(0);
  const [updateProducts, setUpdateProducts] = useState(true);

  //error messages
  const [showEmptyName, setShowEmptyName] = useState(true);
  const [showErrorPrice, setShowErrorPrice] = useState(true);
  const [showErrorImg1, setShowImg1] = useState(true);
  const [showErrorImg2, setShowImg2] = useState(true);
  const [showErrorImg3, setShowImg3] = useState(true);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  }, [updateCategories]);

  //funcion para crear una nueva categoria
  function createCategory() {
    createNewCategory(categoryName).then((res) => console.log(res));
    setUpdateCategories(updateCategories + 1);
  }


  function handleAddProduct(e) {
    e.preventDefault();

    //recupero toda la info del formulario
    const info = {
      name: e.target[0].value,
      description: e.target[1].value,
      about: e.target[2].value,
      precio: e.target[3].value,
      categoria_id: document.getElementById(e.target[5].value).value,
      img1: document.getElementById("img1").files[0],
      img2: document.getElementById("img2").files[0],
      img3: document.getElementById("img3").files[0],
    };

    //validacion del formulario
    if (info.name === "") {
        setShowEmptyName(false)
    }else if(info.precio === "" || isNaN(parseInt(info.precio))){
        setShowErrorPrice(false)
    }else if(info.img1 === undefined){
        setShowImg1(false)
    }else if(info.img2 === undefined){
        setShowImg2(false)
    }else if(info.img3 === undefined){
        setShowImg3(false)
    }
    else{
        createNewProduct(info)
        .then(res => {
            if(res.status === 200){
                setUpdateProducts(true)
                setShow(false)
            }
            else{
                alert('Error al crear el producto')
            }
        })
    }
  }
  return (
    <div className="your-products">
        <div className = 'div-container-button'>
            <button className = 'btn btn-primary' onClick={() => {
            setShow(true)
            setUpdateProducts(false)
            }}>Add new product</button>
        </div>
      
      <GenerateCardsOfProducts updateProducts = {updateProducts}/>
      <Modal show={showModal}>
        <Modal.Header>
          Add new product
          <button className="btn btn-danger" onClick={() => setShow(false)}>
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <form
            className="AddProductForm"
            onSubmit={(e) => handleAddProduct(e)}
            enctype="multipart/form-data"
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
            <label>Categoria</label>
            <button
              className="btn btn-success btn-add-category"
              onClick={() => setShowModalCreateCategory(true)}
              type="button"
            >
              +
            </button>
            <br />
            <select>
              {categories.length === 0
                ? null
                : categories.map((category) => (
                    <option>
                      {category.name}
                      <input
                        id={category.name}
                        hidden="true"
                        value={category.id}
                      ></input>
                    </option>
                  ))}
            </select>
            <br />
            <br />
            <input id="img1" type="file" accept=".png, .jpg" onChange={() => setShowImg1(true)}></input>
            <p className = 'error-message' hidden={showErrorImg1}>Debes ingresar una imagen</p>
            <br />
            <br />
            <input id="img2" type="file" accept=".png, .jpg" onChange={() => setShowImg2(true)}></input>
            <p className = 'error-message' hidden={showErrorImg2}>Debes ingresar una imagen</p>
            <br />
            <br />
            <input id="img3" type="file" accept=".png, .jpg" onChange={() => setShowImg3(true)}></input>
            <p className = 'error-message' hidden={showErrorImg3}>Debes ingresar una imagen</p>
            <br />
            <br />
            <button className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showModalCreateCategory}>
        <Modal.Header>
          Create new category
          <button
            className="btn btn-danger"
            onClick={() => setShowModalCreateCategory(false)}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <form className="AddProductForm">
            <label>Name:</label>
            <input
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
            ></input>
            <br />
            <br />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                setShowModalCreateCategory(false);
                createCategory();
              }}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
