
import React, { Component } from 'react';
import Directory from './DirectoryComponents';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect} from 'react-router-dom';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
        };
    }

    render() {

        const HomePage= () => {
            return (
                <Home />
                )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/Home' component={HomePage} />
                    <Route exact path= '/directory' render= {() => <Directory campsites={this.state.campsites} />} />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default Main;