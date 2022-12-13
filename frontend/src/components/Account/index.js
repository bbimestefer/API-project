// import { useEffect } from "react"
import { NavLink, Route, Switch } from "react-router-dom"
import EditUserSpot from "./EditUserSpot"
import SpotsOfUser from './SpotsOfUser'
import UserReviews from "./UserReviews"

export default function Account () {

    // useEffect(() => {
    //     // dispatch the get current reviews or users with if statement
    // })


    return (
        <div style={{'display':'flex', "justifyContent":"space-around", "width":"50%" }}>
            <nav style={{'display':'flex', 'flexDirection':'column', "gap":"25px"}}>
                <NavLink to={'/account/spots'}>Spots</NavLink>
                <NavLink to={'/account/reviews'}>Reviews</NavLink>
            </nav>
            <div>

            <Switch>
                <Route exact path='/account/spots'>
                    <SpotsOfUser />
                </Route>

                <Route path='/account/reviews'>
                    <UserReviews />
                </Route>

                <Route path='/account/spots/edit/:id'>
                    <EditUserSpot />
                </Route>
            </Switch>
            </div>


        </div>
    )
}