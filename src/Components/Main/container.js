import React, { useEffect } from 'react';
import Taskdo from './taskdo';
import gsap from 'gsap';

export default function Container({tareas, model, setEdicion, setIdEdicion, setEdita, playOnTask, resetOnTask, quitAll , finalizaTarea, refCallback, okClick}) {

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
                    {
                        model.visor.curso  &&
                        <>
                            <div><input type="text" /><i className="fas fa-search ppp"></i></div>                    
                            <button onClick={playOnTask} className="btn-tasks p2"><i class="fas fa-play m-r"></i>  INICIAR</button>
                            <button onClick={resetOnTask} className="btn-tasks p2"><i class="fas fa-redo m-r"></i> REINICIAR TODAS</button>
                            <button onClick={resetOnTask} className="btn-tasks p2"><i class="fas fa-pause m-r"></i>  PAUSAR TODAS</button>
                            <button onClick={quitAll} className="btn-tasks p2"><i class="fas fa-folder-times m-r"></i> ELIMINAR TODAS</button>
                        </>
                        
                    }
                        

                </div>
                <div className="cont-tasks">                    
                        {
                            model.visor.curso &&

                            tareas.filter(tarea => tarea.estatus === 2).map( (data, index) => (
                                <Taskdo key={index}  id={data.id} edit={() => openTarea(true, data, data.idx)} model={data} finalizaTarea={finalizaTarea} refCallback={refCallback} okClick={okClick}/>
                                )
                            )
                            
                        }
                        {
                            model.visor.todos &&

                            tareas.map( (data, index) => {
                                 return <Taskdo key={index}  id={data.id} edit={() => openTarea(true, data, data.idx)} model={data} finalizaTarea={finalizaTarea} refCallback={refCallback}  okClick={okClick}/> 
                            })
                            
                        }
                        {
                            model.visor.finalizados &&
                            
                            tareas.filter(tarea => tarea.estatus === 5).map( (data, index) => (
                                    <Taskdo key={index}  id={data.id} edit={() => openTarea(true, data, data.idx)} model={data} finalizaTarea={finalizaTarea} refCallback={refCallback} okClick={okClick}/>
                                )
                            )
                            
                        }
                        {
                            model.visor.eliminados &&
                            
                            tareas.filter(tarea => tarea.estatus === 9).map( (data, index) => (
                                    <Taskdo key={index}  id={data.id} edit={() => openTarea(true, data, data.idx)} model={data} finalizaTarea={finalizaTarea} refCallback={refCallback} okClick={okClick}/>
                                )
                            )
                            
                        }
                </div>
            </div>

    )
}
