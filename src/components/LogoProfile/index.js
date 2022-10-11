import React, { useState, useContext, useEffect } from "react";
import {Link} from 'wouter'
import "./index.css";
import Modal from "react-bootstrap/Modal";
import InfoUserContext from "../../context/InfoUserContext";
import UserTokenContext from "../../context/UserTokenContext";
import getInfoUser from "../../services/getInfoUser";
import { getUserProfileInfo } from "../../services/getInfoUser";
import Cart from "../Cart";

export default function LogoProfile() {
  const [showModal, setShowModal] = useState(false);
  const [info, setInfo] = useState(undefined);
  const { infoUser, setInfoUser } = useContext(InfoUserContext);
  const { token } = useContext(UserTokenContext);

  useEffect(
    function() {
      if (infoUser === undefined || infoUser === null) {
        if (token != null) {
          getInfoUser(token).then((inf) => {
            getUserProfileInfo(token).then((infoProfile) => {
              setInfo({
                username: inf.username,
                email: inf.email,
                name: infoProfile.name,
                last_name: infoProfile.last_name,
                country: infoProfile.country,
                state: infoProfile.state,
                address: infoProfile.address,
                zip_code: infoProfile.zip_code,
                phone: infoProfile.phone,
              });
              setInfoUser({
                username: inf.username,
                email: inf.email,
                name: infoProfile.name,
                last_name: infoProfile.last_name,
                country: infoProfile.country,
                state: infoProfile.state,
                address: infoProfile.address,
                zip_code: infoProfile.zip_code,
                phone: infoProfile.phone,
              });
            });
          });
        }
      } else {
        setInfo(infoUser);
      }
    },
    [token]
  );

  return (
    <div>
      <div>
        <Cart />
        <div className="LogoProfile" onClick={() => setShowModal(true)}></div>
      </div>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Info User</Modal.Title>
          <button
            class="CloseModalButton btn btn-danger"
            onClick={() => setShowModal(false)}
          >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Username: {info ? info.username : ""}</p>
            <p>Email: {info ? info.email : ""}</p>
            <p>Name: {info ? info.name : ""}</p>
            <p>Last name: {info ? info.last_name : ""}</p>
          </div>
          <Link className="btn btn-primary" to = '/info-user'>
            All Info
          </Link>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
