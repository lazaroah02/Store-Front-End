import React, { useState, useEffect, useRef } from "react";
import { getSpecialPromotions } from "../../services/getSpecialPromotions";
import PromocionesEspecialesCard from "./PromocionesEspecialesCard";
import { useNavigateItemsWithInterval } from "../../customHooks/useNavigateItemsWithInterval";
import {debounce} from '../../helpFunctions/debounce'
import Loader from "../Loader";
import "./index.css";

export default function PromocionesEspeciales() {
  const scrollRef = useRef();
  const [specialPromotions, setSpecialPromotions] = useState([]);
  const { contador, updateCont } = useNavigateItemsWithInterval(scrollRef);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSpecialPromotions().then((data) => {
      setSpecialPromotions(data);
      setLoading(false);
    });
  }, []);

  function updateContByScroll(){
    if(scrollRef.current !== undefined && scrollRef.current !== null){
      updateCont(Math.round(scrollRef.current.scrollLeft/scrollRef.current.offsetWidth))
    }
  }
  //function to update the navigation status when the user make scroll
  const processScrollChange = debounce(() => updateContByScroll(), 50);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {specialPromotions.length > 0 ? (
            <div className="flex-container">
              <div className="special-promotions-container" ref={scrollRef} onScroll = {() => processScrollChange()}>
                {specialPromotions.map((promotion) => (
                  <PromocionesEspecialesCard
                    key={promotion.id}
                    {...promotion}
                  />
                ))}
              </div>
              <div className="points-container">
                {setSpecialPromotions.length > 0
                  ? specialPromotions.map((promotion, index) => (
                        <div
                            className={
                            contador === index
                                ? "point point-active"
                                : "point"
                            }
                            key={promotion.id}
                            onClick={() => updateCont(index)}
                        ></div>
                    ))
                  : null}
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
