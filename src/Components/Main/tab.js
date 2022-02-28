import React, { useState } from 'react';
import Modal from './modal';

export default function Tab( { model, addTarea, editTarea, eliminaTarea, finalizaTarea, edicion, verTodos, verHistorial, setNuevo, setEdita, verEliminadosList}) {
    //NUEVA
    //const [m1, c1] = useState(false);
    //EDITA
    //const [m2, c2] = useState(false);

    const c1 = (param) => {
        setNuevo(param)
        //model.modalInsertar = param;
    }

    const c2 = (param) => {
        setEdita(param)
        //model.modalEdita = param;
    }
    


    return (
        <div className="panel-izq">
            <div className="avatar"></div>

            <div className="tit-main">ADMINISTRADOR DE TAREAS POR HACER</div>

            <div className="resum-main">
                {model.usuario}
            </div>

            <div className="btns-main">
                <button className="btn-ms" onClick={() => c1(true)}><i className="fas fa-plus-circle"></i> AGREGAR</button>
                <button className="btn-ms" onClick={verTodos}><i class="fad fa-th-list"></i>TODO</button>
                <button className="btn-ms" onClick={verHistorial}><i className="fas fa-folder"></i>LISTOS</button>
                <button className="btn-ms" onClick={verEliminadosList}><i class="fas fa-calendar-times"></i>ELIMINADOS</button>
                
            </div>

            <Modal c1={c1} c2={c2} model={model} addTarea={addTarea} editTarea={editTarea} eliminaTarea={eliminaTarea} finalizaTarea={finalizaTarea} edicion={edicion} />

            <div className="foot">Felizoide 2021</div>
        </div>
    )
}
