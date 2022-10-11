import React, {useEffect, useState} from 'react';
import getVideo from '../../services/getVideo'
import './index.css'
import {BASE_URL} from '../../settings'
import ProgresGif from '../ProgresGif'

export default function ShowVideo(){
    const [video , setVideo] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(function(){
        getVideo()
        .then(data => {
            setVideo(data)
            setLoading(false)
        } ) 
    },[])
    return(
        <div class = "container VideoContainer ">
            {loading?<ProgresGif/>:
            video.map(vid  => 
            <video className = "Video-video align-top " controls = "true" preload = 'false'>
                <source 
                className = "Video"
                src = {`${BASE_URL}${vid.video}`} 
                type = "video/mp4"/>
            </video> 
            )
         }   
        </div>
    )
}