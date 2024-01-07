import { useState, useEffect } from "react";




function Media() {
const [media, setMedia] = useState([])

useEffect(() => {
    fetch('/me/media?fields=id,media_url,thumbnail_url,permalink,media_type&access_token=IGQWRNWFcxNTE5VEtfbWVWTVV3OWhCUTFkZADVNWHlHdlc4ZA0FOUzRVV2UzNG8wM1IySF9KZAjFES3FPcHpaU3d2NjVMNjY0ZAGI5SElJVUlmOHVBaFBncFE1UUlNRlF3ekUxcVZAON1V2M1V5SDBPNkNjaF9aVmstNnpLYkxrWFBLSVNlQQZDZD')
      .then(response => response.json())
      .then(responseData => {
        // Check if the responseData object has a 'data' key
        if (responseData.data && Array.isArray(responseData.data)) {
          setMedia(responseData.data); // Set media to the array inside 'data'
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