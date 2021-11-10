import React from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends React.Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg  navbar-light bg-warning">
                    <div class='container'>
                        <a class="navbar-brand" href='/'>TOTONET SA</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item active">
                                    <Link to='/login'>
                                        <a class="nav-link">Login</a>
                                    </Link>
                                </li>
                                <li class="nav-item active">
                                    <Link to='/aplicante'>
                                        <a class="nav-link" >Aplicante</a>
                                    </Link>
                                </li>
                                <li class="nav-item active">
                                    <Link to='/coordinador'>
                                        <a class="nav-link" >Coordinador</a>
                                    </Link>
                                </li>
                                <li class="nav-item active">
                                    <Link to='/revisor'>
                                        <a class="nav-link" >Revisor</a>
                                    </Link>
                                </li>
                                <li class="nav-item active">
                                    <Link to='/usuarios'>
                                        <a class="nav-link" >Usuarios</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}