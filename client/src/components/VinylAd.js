import { useNavigate } from "react-router-dom"

function VinylAd() {
    const navigate = useNavigate()
    return (
        <div className='vinyl-ad-card' onClick={() => navigate('/product/1')}>
            <img className="vinyl-ad-img" src='/build/pictures/albumcover.png' alt='vinyl' />
            <h1 className='vinyl-ad-text' >Buy our new vinyl!</h1>
        </div>
    )
}

export default VinylAd