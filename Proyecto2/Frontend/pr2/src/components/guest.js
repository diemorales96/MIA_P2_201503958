import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();


export class Guest extends React.Component {
    state = {
        puestos: [],
        busqueda: ''
    };
    componentDidMount = () => {
        this.getAllPuestos();
    };
    render() {
        return (
            <div>
                  <div class="input-group">
                    <input type="search" class="form-control rounded" placeholder="Search Puesto" aria-label="Search"
                    aria-describedby="search-addon" value={this.state.busqueda} onChange={(e) => { this.setState({ busqueda: e.target.value }); }} /> 
                    <button type="button" class="btn btn-outline-primary" onClick={() => this.buscarPuesto()}>Buscar</button>
                  </div>
                <br />
    
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                     <h1 class="display-4">BIENVENIDO A TOTONET SA</h1>
                      <p class="lead">TOTONET SA dispone de diferentes ofertas de empleo, abajo encontraras todas nuestras ofertas. Aplica ya!</p>
                    </div>
                </div>



                <Carousel>
                    {this.state.puestos.map(element =>
                        <>
                            <div className='card mt-4 px-2' key={element.num}>
                                <br />
                                <h4>{element.num}</h4>
                                <h4>_______________________</h4>
                                <h4 className='col'>Puesto</h4><p className="col">{element.PUESTO}</p>
                                <h4>_______________________</h4>

                                <h4 className='col'>Departamento</h4><p className="col">{element.DEPARTAMENTO}</p>
                                <h4>______</h4>
                                <h4 className='col'>Salario</h4><p className="col">Q.{element.SALARIO}.00</p>
                                <h4>______</h4>

                                 <img src="https://static.semrush.com/blog/uploads/media/20/b9/20b9fc4db7fe16be59032ff15883e98d/google-advertising.svg" alt="google advertising" height="288" width="388"/> 
                                <button type='button' className='btn btn-primary' onClick={() => { history.push('/aplicante'); }}>Postularse</button>
                                <br />

                                <br />
                                
                            </div>

                                                                
                            <div class="input-group">
                <input type="search" class="form-control rounded" placeholder="Calificar Puesto de 1 - 5" aria-label="Search"
                aria-describedby="search-addon" value={this.state.busqueda} onChange={(e) => { this.setState({ busqueda: e.target.value }); }} /> 
                <button type="button" class="btn btn-info" onClick={() => this.buscarPuesto()}>Calificar</button>
                </div>

                        </>)}
                </Carousel>
                
            </div>
        );
    }

    getAllPuestos() {
        var ruta = 'http://localhost:4000/puestos';
        fetch(ruta, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(async response => {
            var i = 1;
            const jsonInicial = await response.json();
            const json = jsonInicial.data;
            console.log(json);
            if (json != null) {
                json.forEach(element => {
                    element['num'] = i;
                    i++;
                });
                this.setState({ puestos: json });
            }
        });
    }



    buscarPuesto() {
        var busquedaConsult = {
            "nombre": this.state.busqueda
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(busquedaConsult)
        };
        fetch('http://localhost:4000/buscarPuesto', requestOptions).then(async response => {
            const json = await response.json();
            if (json.status == 200) {
                var mensaje= "Puesto "+this.state.busqueda+ " Hallado!!"
                alert(mensaje);
            } else {
                alert("No se encontro el Puesto en el sistema");
            }
        });
    }
};