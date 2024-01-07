import { useState, useEffect } from "react";




function Media() {
const [media, setMedia] = useState([])

useEffect(() => {
    fetch('/me/media?fields=id,media_url,thumbnail_url,permalink,media_type&access_token=IGQWRNNjVqeXNlQXpfVmFRZA0UxcVVuMnhWWm40ekxFTVBBTHAwU01IMGtMbW42QmptNmRVSlBsblczTUZAUQlhNdndBdFVFWTB1WW43SnpNSlVsUG1YSF8wZAEljQjBoQU5BdmFsdFRVUWx2VHpLR284ajI5NjBrZAmhfaXhQcFA3Q1B6dwZDZD')
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
        return <img key={media.id} src={media.media_url} alt={media.id} />
    } else if (media.media_type === "VIDEO") {
        return <img key={media.id} src={media.thumbnail_url} alt={media.id} /> 
    }
    return <img key={media.id} src={media.media_url} alt={media.id} />
    
})


return (
    <div className="media-container">
        {images}
    </div>
)

}


export default Media