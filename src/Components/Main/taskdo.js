import React from 'react'

export default function Taskdo({model, edit }) {
    

    return (
        <div className="task-main" onClick={edit}>
          <section className="task-tit">{model.titulo}</section>  
          <section className="task-do">{model.descripcion}</section>
          <section className="task-foot">{model.foot}</section>

        </div>
    )
}
