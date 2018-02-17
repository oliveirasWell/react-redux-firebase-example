import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import NavigationWrapper from "../NavigationWrapper/NavigationWrapper";
import Header from "../Header/Header";
import {login, logout} from "../../actions/actionCreator";
import {connect} from "react-redux";
import {routes} from "../../utils/routes";
import Welcome from "../Welcome/Welcome";
import {NoMatch} from "../NoMatch/NoMatch";
import Login from "../Login/Login";
import NavigationLoggedWrapper from "../NavigationWrapper/NavigationLoggedWrapper";
import DataTable from "../DataTable/DataTable";
import {compose} from "recompose";
import {FirebaseService} from "../../services/FirebaseService";
import {Footer} from "../Footer/Footer";
import NewUser from "../NewUser/NewUser";
import FirebaseNodeElement from "../FirebaseNodeElement/FirebaseNodeElement";


class App extends React.Component {

    componentDidMount() {
        FirebaseService.onAuthChange(
            (authUser) => this.props.login(authUser),
            () => this.props.logout()
        );
    };

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Switch>
                    <Route exact path={routes.login}
                           render={(props) => <NavigationLoggedWrapper component={Login} {...props}/>}/>

                    <Route exact path={routes.newUser}
                           render={(props) => <NavigationLoggedWrapper component={NewUser} {...props}/>}/>

                    <Route exact path={routes.welcome}
                           render={(props) => <NavigationWrapper component={Welcome}     {...props}/>}/>

                    <Route exact path={routes.data}
                           render={(props) => <NavigationWrapper component={DataTable}   {...props}/>}/>

                    <Route exact path={routes.edit}
                           render={(props) => <NavigationWrapper component={FirebaseNodeElement}   {...props}/>}/>

                    <Redirect exact from={routes.root} to={routes.welcome}/>

                    <Route render={(props) => <NavigationWrapper component={NoMatch}   {...props}/>}/>
                </Switch>
                <Footer/>
            </React.Fragment>
        );
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: authUser => dispatch(login(authUser)),
        logout: () => dispatch(logout()),
    }
};

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)(App);
