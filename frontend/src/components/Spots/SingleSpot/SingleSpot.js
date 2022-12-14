import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from '../../../store/spots'
import * as reviewActions from "../../../store/reviews";
import ReserveForm from "./ReserveForm";
import "./SingleSpot.css"
import Reviews from "./Reviews";
import CreateReviewForm from "./Reviews/CreateReviewForm";

function SingleSpot () {


    const dispatch = useDispatch()
    const { id } = useParams()

    const user = useSelector(state => state.session.user)

    const [ showForm, setShowForm ] = useState(false)

    const formClick = () => {
        if(showForm) setShowForm(false)
        else setShowForm(true)
    }

    useEffect(() => {
        dispatch(spotActions.getSpotById(id))
        dispatch(reviewActions.spotReviews(id))
    }, [id, dispatch])

    const spot = useSelector(state => state.spots.singleSpot)
    const rating = spot.avgStarRating
    const reviews = Object.values(useSelector(state => state.reviews.spot))

    if(!spot.Owner) return null
    return (
        <div className="wrapper-for-info">
            <div className="header">
                <h2 className="text spot-header">
                    {spot.name}
                </h2>
                <div className="sub-info width-for-info">
                    <div className='ratings'>
                        <span style={{"width":"4rem"}}><i className="fa-sharp fa-solid fa-star"></i>{isNaN(rating) ? 0 : rating}</span>
                        {spot.numReviews === 1 ? <span style={{"width":"5rem"}}>{spot.numReviews} review </span> : <span style={{"width":"5rem"}}>{spot.numReviews} reviews </span>}
                        <span style={{"width":"20rem"}}>{spot.city}, {spot.state}, {spot.country}</span>
                    </div>
                    {/* <div className="share">
                        <span><i className="fa-solid fa-arrow-up-from-bracket"></i> Share</span>
                        <span><i className="fa-regular fa-heart"></i> Save</span>
                    </div> */}
                </div>
            </div>
            <div className="image-container">
                <img className="first-spot-image" src={spot.SpotImages[0].url} alt='first'/>
                {/* {spot.SpotImages?.map((image, i) => (
                    (i === 0 ?
                    <div key={i}><img className="first-spot-image" src={image.url} alt={i}/></div>
                    : <img key={i} className="spot-image" src={image.url} alt={i}/>)
                ))} */}
            </div>
            <div className="details">
                <div className="host">
                    <h3 style={{"width":"20.15rem"}}>This home hosted by {spot.Owner.firstName}</h3>
                    <div></div>
                </div>
                <div className="reserve-form"><ReserveForm {...spot} /></div>
            </div>
            <div>
                {showForm ? (
                    <CreateReviewForm hideForm={() => setShowForm(false)}/>
                ) : (
                    user && user.id !== spot.ownerId && <button className="create-review-button" onClick={formClick}>Create a review</button>
                )}
                {reviews.length ? (
                    <Reviews reviews={reviews}/>
                ) : (<div>No Reviews</div>)}
            </div>
        </div>
    )
}

export default SingleSpot
