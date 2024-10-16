import { useState } from 'react';
import style from './contador.module.css'



const Contador =()=>{
    const [cantidad, setCantidad] = useState(1)
    const [aceptados, setAceptados]= useState(false)
    const [empezoConNo, setEmpezoConNo] = useState(false)

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
        setAceptados(false)
    }
    const aceptado = () =>{
        setAceptados(true)
    }

    return(
        <div className={style.contPrincipal}>

            <div className={style.contGeneral}>
                <button className={style.botonEncendido} > hola </button>

                <h1>OPORTUNIDAD</h1>
                
                <div className={style.aceptado}>

                    <div className={style.cantidad}>

                        <button onClick={()=>restar()}>-</button>
                        <p>{cantidad}</p>
                        <button onClick={()=> sumar()}>+</button>
                    </div>

                    <button className={style.botonAceptado} onClick={()=> aceptado()}>VENDIDO</button>

                    <label>La venta empezo con un NO</label>
                    <input type="checkbox" id="miCheckbox" name="terminos" onClick={()=>empezoNo()}></input>

                </div>
                <div className={style.rechazado}>
                    <button className={style.botonRechazado} onClick={() => rechazado()}> rechazao </button>
                </div>
                <div className={style.resultados}>
                    resultados
                </div>
            </div>

        </div>
    )
}
export default Contador;