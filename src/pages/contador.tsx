import { useEffect, useState } from 'react';
import style from './contador.module.css'


interface Mensaje {
    CantidadNumerosVendidos: number;
    OportunidadesAceptadas: number;
    OportunidadesRechazadas: number;
    PorcentajeAceptados: number;
    PorcentajeRechazados: number;
    TotalOportunidades: number;
    empezaronConNo: number;
    montoVendido: number;
  }


const Contador =()=>{
    const [cantidad, setCantidad] = useState(1)
    const [empezoConNo, setEmpezoConNo] = useState(false)
    const [mensaje, setMensaje] = useState<Mensaje | null>(null);
    const [isOn, setIsOn] = useState(false)
    const [get, setGet] = useState(false)

    //GET
    useEffect(()=>{
        console.log('Fetching data from:', '/ventas/oportunidades/');
        fetch('https://ventanumerosback.onrender.com/ventas/oportunidades/')            
        .then(response => {
            if (!response.ok) {
                alert('error en el get');
                throw new Error('Error en la respuesta de la API');
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            setMensaje(data.mensaje); // Guardar los datos en el estado
        })
        
    },[get])

    //POST
    

const reset=()=>{
    setCantidad(1)
    
    setEmpezoConNo(false)
}
const Post =(isAceptado: boolean)=>{
    const dataP={
        'aceptado':isAceptado,
        'cantidad': cantidad,
        'empezoConNo':empezoConNo,
    }
    fetch('https://ventanumerosback.onrender.com/ventas/oportunidades/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indica que estás enviando JSON
            },
            body: JSON.stringify(dataP), // Convierte el objeto a una cadena JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json(); // Parsear la respuesta JSON
        })
        .then(data => {
            console.log('Éxito:', data); // Maneja la respuesta del servidor
            reset()
            setGet(!get)
        })
        .catch((error) => {
            console.error('Error:', error); // Maneja el error
        });
}


    //Estados de la cantidad de rifas
    const sumar = ()=>{
        setCantidad (cantidad +1)
    }
    const restar = ()=>{
        setCantidad (cantidad - 1)
    }

    //estado de si la venta empezo con un No
    const empezoNo= () =>{
        setEmpezoConNo(!empezoConNo)
    }

    //estados para los botones de ventido y rechazado
    const rechazado = () =>{
        if (isOn){
            Post(false)
        }else{reset()}
    }
    const aceptado = () =>{
        if (isOn){
            Post(true)
        }else{
            reset()
        }
    }

    const prender =()=>{
        setIsOn(!isOn)
    }
    
    
    if (!mensaje) {
        return <h1 style={{color:'red'}}>Loading...</h1>;
    }

    return(
        <div className={style.contPrincipal}>

            <div className={style.contGeneral}>

                <button className={style.botonEncendido} onClick={()=> prender()} 
                    style={{border: isOn ? '3px solid green' : '3px solid red' }}> {isOn ? 'ON' : 'OFF'} </button>

                <h1>OPORTUNIDAD</h1>
                
                <div className={style.aceptado}>

                    <div className={style.cantidad}>
                        <button onClick={()=>restar()}>-</button>
                        <p>{cantidad}</p>
                        <button onClick={()=> sumar()}>+</button>
                    </div>

                    <button className={style.botonAceptado} onClick={()=> aceptado()}>VENDIDO</button>

                    <div className={style.check}>
                        <label>La venta empezo con un NO</label>
                        <input type="checkbox" id="miCheckbox" name="terminos" onClick={()=>empezoNo()}></input>
                    </div>
                    

                </div>
                <div className={style.rechazado}>
                    <button className={style.botonRechazado} onClick={() => rechazado()}> rechazao </button>
                </div>

                <div className={style.resultados}>
                    <h1>Total Oportunidades: {mensaje.TotalOportunidades}</h1>
                    <h1>Cantidad de Números Vendidos: {mensaje.CantidadNumerosVendidos}</h1>
                    <h1>Monto Vendido: {mensaje.montoVendido}</h1>
                    {/* <h1>Oportunidades Aceptadas: {mensaje.OportunidadesAceptadas}</h1>
                    <h1>Oportunidades Rechazadas: {mensaje.OportunidadesRechazadas}</h1> */}
                    <h1>Porcentaje Aceptados: {mensaje.PorcentajeAceptados}%</h1>
                    <h1>Porcentaje Rechazados: {mensaje.PorcentajeRechazados}%</h1>
                </div>
            </div>

        </div>
    )
}
export default Contador;