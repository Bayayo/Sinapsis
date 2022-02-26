import React from 'react'
import Countdown from 'react-countdown';

export default function Taskdo({model, edit }) {
    

    return (
        <div className="task-main" onClick={edit}>
          {
            (model.estatus === 5) &&
              <div className='task-fin' ><i class="fas fa-check-circle"></i></div>
          }
          <section className="task-tit">{model.titulo}</section>  
          <section className="task-do">{model.descripcion}</section>
            <Countdown date={Date.now() + model.tiempo} />
          <section className="task-foot">{model.foot}</section>
        </div>
    )
}
