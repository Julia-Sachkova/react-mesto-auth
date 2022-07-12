import logo from '../images/logo.svg';
import { Route, Link, Switch } from 'react-router-dom';

function Header({ email, onExit }) {
    return (
        <header className="header">
            <a href="#"><img className="header__logo" src={logo} alt="логотип." /></a>
            <div className="header__container">
                <Switch>
                    <Route exact path="/">
                        <p className='header__email'>{email}</p>
                        <Link to="/signin" className="header__exit" onClick={onExit}>Выйти</Link>
                    </Route>
                    <Route exact path="/signin">
                        <Link to="/signup" className="header__link">Регистрация</Link>
                    </Route>
                    <Route exact path="/signup">
                        <Link to="/signin" className="header__link">Войти</Link>
                    </Route>
                </Switch>
            </div>
        </header>
    )
}

export default Header;