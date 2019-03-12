import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import "./index.css";
import {AuthUserContext} from '../Session';
import * as ROLES from '../../constants/roles';
import SignOut from "../SignOut";

/*Whenever TODO:
Implement search bar in the navigation bar.
Sprint 2 TODO:
User-protected routes, make sure registered users get access to messages, employees to employee-protected pages and so on.*/
const NavigationAuth = ({authUser}) => (
            <div>
                <Link to={ROUTES.LANDING}>
                    <button> Hjem</button>
                </Link>
                <Link to={ROUTES.MESSAGES}>
                    <button> Meldinger</button>
                </Link>
                <Link to={ROUTES.ABOUT}>
                    <button> Om oss</button>
                </Link>
                {authUser.role === ROLES.ADMIN &&
                <Link to={ROUTES.ADMIN}>
                    <button> Admin </button>
                </Link>
                }
                {authUser.role === ROLES.COUNSELOR &&
                  <Link to={ROUTES.BLACKBOARD}>
                      <button> Veiledertavle </button>
                  </Link>
                }
                {authUser.role === ROLES.ADMIN &&
                  <Link to={ROUTES.BLACKBOARD}>
                      <button> Vedlikeholdstavle </button>
                  </Link>
                }
                {authUser.role === ROLES.USER &&
                    <Link to={ROUTES.NEWMESSAGE}>
                        <button>Kontakt veileder</button>
                    </Link>
                }
                <SignOut/>
                <p>Logget inn som: {authUser.email}</p>
            </div>
        );


const NavigationNonAuth = () => (
    <div>
            <Link to={ROUTES.LANDING}>
                <button>Hjem</button>
            </Link>
            <Link to={ROUTES.ABOUT}>
                <button>Om oss</button>
            </Link>
            <Link to={ROUTES.SIGNIN}>
                <button>Logg inn</button>
            </Link>
            <Link to={{pathname: ROUTES.SIGNIN,
            error: "Du må være logget inn for å kontakte veileder."}}>
                <button>Kontakt veileder</button>
            </Link>
    </div>
);

const Navigation = ()=>(
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ?
                <NavigationAuth authUser={authUser}/>
                :
                <NavigationNonAuth/>}
    </AuthUserContext.Consumer>
);

export default Navigation;
