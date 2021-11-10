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

                <br />
    
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                     <h1 class="display-4">BIENVENIDO</h1>
                      <p class="lead">Aqui puede verificar los diferentes puesto existentes en TOTONET SA</p>
                    </div>
                </div>

                <Carousel>
                    {this.state.puestos.map(element =>
                        <>
                            <div className='card mt-4 px-2' key={element.num}>
                                <br />
                                <h4>No. {element.num}</h4>
                                <h4>_______________________</h4>
                                <h4 className='col'>Puesto</h4><p className="col">{element.PUESTO}</p>
                                
                                <h4>_______________________</h4>
                                <h4 className='col'>Salario</h4><p className="col">Q.{element.SALARIO}.00</p>
                                <h4>_______________________</h4>
                                <h4 className='col'>Departamento</h4><p className="col">{element.DEPARTAMENTO}</p>
                                
                                
                                <br />

                                <br />
                                
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