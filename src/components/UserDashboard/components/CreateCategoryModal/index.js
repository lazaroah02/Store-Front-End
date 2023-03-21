import React, {useState, useContext} from 'react'
import createNewCategory from "../../../../services/createNewCategory";
import UpdateListOfCategoriesContext from '../../context/updateListOfCategories'
import ShowCreateCategoryModalContext from '../../context/showCreateCategoryModalContext'
import Modal from 'react-bootstrap/Modal'
import './index.css'

export default function CreateCategoryModal(){

    const {updateCategories, setUpdateCategories} = useContext(UpdateListOfCategoriesContext)
    const {showCreateCategoryModal, setShowCreateCategoryModal} = useContext(ShowCreateCategoryModalContext)
    const [categoryName, setCategoryName] = useState("");

     //funcion para crear una nueva categoria
     function createCategory() {
        createNewCategory(categoryName).then((res) => {
            if(res.status === 200){
                setUpdateCategories(updateCategories + 1);
            }else{
                alert("Create category error")
            }
        });
      }

    return(
        <div>
            <Modal show={showCreateCategoryModal}>
                <Modal.Header>
                Create new category
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        setShowCreateCategoryModal(false)
                        setCategoryName("")
                    }}
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
                        setShowCreateCategoryModal(false);
                        createCategory();
                        setCategoryName("")
                    }}
                    >
                    Submit
                    </button>
                </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}