import { useState, useEffect } from "react";

function Media() {
const [media, setMedia] = useState([])

useEffect(() => {
    fetch('/me/media?fields=id,media_url,thumbnail_url,permalink,media_type')
      .then(response => response.json())
      .then(responseData => {
       
        if (responseData.data && Array.isArray(responseData.data)) {
          setMedia(responseData.data);
        }
      })
      .catch(error => console.error("Error fetching media:", error));
  }, []);

console.log(media)

const images = media && media.map((media) => {
    if (media.media_type === "IMAGE"){
        return <img key={media.id} src={media.media_url} alt={media.id} onClick={() => window.open(media.permalink)} />
    } else if (media.media_type === "VIDEO") {
        return <img key={media.id} src={media.thumbnail_url} alt={media.id} onClick={() => window.open(media.permalink)} /> 
    }
    return <img key={media.id} src={media.media_url} alt={media.id} onClick={() => window.open(media.permalink)} />
    
})


return (
    <div className="media-container" >
        {images}
    </div>
)

}


export default Media