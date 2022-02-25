import React, { useEffect, Fragment } from 'react';
import Taskdo from './taskdo';
import gsap from 'gsap';

export default function Container({tareas, model, setEdicion, setIdEdicion, setEdita, playAll, pauseAll, quitAll}) {

    //console.log(tareas)
    console.log(model)

    const openTarea = (param, data, index) => {

        console.log(index )
        setEdicion(data);
        setIdEdicion(index)
        setEdita(param)

    }

    /* EFECTO INICIAL */
    useEffect(() => {            
        gsap.to(".container", { duration: 1.5, ease: "bounce.out", opacity: "1" });
    }, []); 


    return (

            <div className="container">
                <div className="cont-p-links">
                    Principal / {model.usuario}
                </div>
                <div className="cont-btns">

                    <div><input type="text" /><i className="fas fa-search ppp"></i></div>                    
                    <button onClick={playAll} className="btn-tasks p2"> REINICIAR TODAS</button>
                    <button onClick={pauseAll} className="btn-tasks p2"> PAUSAR TODAS</button>
                    <button onClick={quitAll} className="btn-tasks"> ELIMINAR TODAS</button>
                </div>
                <div className="cont-tasks">                    
                    <Fragment>
                        {
                            model.visor.todos &&

                            tareas.map( (data, index) => {
                                 return <Taskdo key={index}  id={data.id} edit={() => openTarea(true, data, data.idx)} model={data} /> 
                            })
                            
                        }
                        {
                            model.visor.finalizados &&
                            
                            tareas.filter(tarea => tarea.estatus(0)).map( (data, index) => (
                                    <Taskdo key={index}  id={data.id} edit={() => openTarea(true, data, data.idx)} model={data}/>
                                )
                            )
                            
                        }
                    </Fragment>
                </div>
            </div>

    )
}
