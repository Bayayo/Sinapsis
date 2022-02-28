import React from 'react'
import Countdown from 'react-countdown';

export default function Taskdo({model, edit, finalizaTarea }) {
    

    return (
        <div className="task-main" onClick={edit}>
          {
            (model.estatus === 5) &&
              <div className='task-fin' ><i class="fas fa-check-circle"></i></div>
          }
          {
            (model.estatus === 9) &&
              <div className='task-elim' ><i class="fas fa-trash-alt"></i></div>
          }
          <section className="task-tit">{model.titulo}</section>  
          <section className="task-do">{model.descripcion}</section>
          {
            (model.tiempo > 60000) &&
            <Countdown autoStart={false} onComplete={finalizaTarea} className='task-date tsk-normal' date={Date.now() + model.tiempo} />

          }
          {
            (model.tiempo < 60000 && model.estatus !== 5) &&
            <Countdown autoStart={false} onComplete={finalizaTarea} className='task-date tsk-rojo' date={Date.now() + model.tiempo} />

          }
          {
            (model.tiempo === 0 && model.estatus === 5) &&
            <Countdown autoStart={false} onComplete={finalizaTarea} className='task-date' date={Date.now() + model.tiempo} />

          }
        </div>
    )
}
