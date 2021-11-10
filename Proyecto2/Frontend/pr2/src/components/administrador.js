import React from 'react';
import { Link } from 'react-router-dom';
import xml2js from 'xml2js'
import axios from 'axios';
import  Parser  from 'xml2js';
const util=require('util');


export class Administrador extends React.Component {

    state = {
        masiva: '',
        xml_value: ''
    };


    render() {
        return (
            <div className='container'>
                
                <div className='card'>
                    <h4>APARTADO DE CARGA MASIVA</h4>
                    <div className='col-sm'>
                        <textarea cols='120' rows='15' value={this.state.masiva} onChange={(e) => { this.setState({ masiva: e.target.value }); }}></textarea>
                    </div>
                    <br />
                    <div>
                        <button type='button'  onClick={() => this.cargaMasiva()}>CARGAR XML</button>
                    </div>
                </div>


                <div className='col-sm'>

                <div>
                <Link to='/'>
                <button type="button" >Cerrar Sesion</button>
                </Link>
                </div>
                

                </div>

            </div>
        );
    }


    cargaMasiva() {

       

       var resulta;
       var parser = require('xml2js');
       parser.Parser().parseString(this.state.masiva, (e, r) => {resulta = r});
       var hola=util.inspect(resulta,false,null);
       var atencion= "_________ATENCION_________\n             *SE CARGARA LA SIGUIENTE INFORMACION** \n  _____________________\n \n \n  ";
       var show=atencion+hola;
       var opc= window.confirm(show);


       if(opc){

        var cargaConsult = {
            "xml": this.state.masiva
        };
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cargaConsult)
        };
        fetch('http://localhost:4000/consult/cargaMasiva', requestOptions).then(async response => {
            console.log("REGRESOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            const json = await response.json();
            if (json.text != 'error') {
                alert('se han ingresado los datos de manera correcta');
            } else {
                alert("el usuario y contrasena no coinciden por favor revisar");
            }
        });

       }else{
           alert("Carga no ejecutada")
       }


    }


}