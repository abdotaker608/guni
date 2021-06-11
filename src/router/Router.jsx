import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import routes from './routes';

function Router({location}) {
    return (
        <TransitionGroup className='scale-container'>
            <CSSTransition classNames='scale' timeout={300} key={location.key}>
                <Switch location={location}>
                    {
                        routes.map(({path, Component}) => (
                            <Route path={path} exact key={path}>
                                <div className='scale'>
                                    <Component />
                                </div>
                            </Route>
                        ))
                    }
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default withRouter(Router);
