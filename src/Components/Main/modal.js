import React, { useEffect, useState, useRef }  from 'react';
import Countdown from 'react-countdown';


export default function Modal({c1, c2, model, addTarea, editTarea, eliminaTarea, finalizaTarea, edicion }) {

    const inputTitulo = useRef();
    const inputDescrip = useRef();
    
    const changeTitulo = useRef();
    const changeDescrip = useRef();

    const handleChange = () => {
      model.tarea.titulo = inputTitulo.current.value;
      model.tarea.descripcion = inputDescrip.current.value;
      model.tarea.usuario = model.usuario;
      model.tarea.usr_id = model.usr_id;
      model.tarea.estatus = 1;
      model.tarea.id = model.data.length + 1;

      console.log(model)
    };

    const handleChange2 = () => {
      edicion.titulo = changeTitulo.current.value;
      edicion.descripcion = changeDescrip.current.value;
      edicion.usuario = model.usuario;
      edicion.usr_id = model.usr_id;
      edicion.estatus = 1;

      console.log(model)
    };


    return (
       <>
       { model.modalInsertar &&

            <div className='modal'>
              <div className="bkg-modal" onClick={() => c1(false)}></div>
                <div className="main-modal">
                    <div className="header-modal">
                        <div className="tit-modal">Nueva Tarea</div>
                        <button onClick={() => c1(false)} className="close-modal"><i className="fas fa-times"></i></button>
                    </div>
                    <form className="cont-modal"> 
                      <div className='cnt-m-all'>
                        <div className='cnt-m-ms'>
                          <label> Titulo <span>*</span></label>
                          <input type="text" ref={inputTitulo} name="titulo" onChange={handleChange} />
                        </div>
                        <div className='cnt-m-ms'>
                          <label> Descripción <span>*</span></label>
                          <textarea name="descripcion" ref={inputDescrip} onChange={handleChange} rows="5"></textarea>
                        </div>
                        <div className='cnt-m-ms'>
                          <label> Tiempo <span>*</span></label>
                            <div className="clock-container">
                              <div className="clock-col">
                                <input type="number" min="0" max="99" className="clock-timer"/>
                                <p className="clock-label"> Días </p>
                              </div>
                              <div className="clock-col">
                                <input type="number" min="0" max="99" className="clock-timer"/>
                                <p className="clock-label"> Horas </p>
                              </div>
                              <div className="clock-col">
                                <input type="number" min="1" max="99" className="clock-timer"/>
                                <p className="clock-label">Minutos</p>
                              </div>
                            </div>
                        </div>
                        <div className='cnt-m-ms'>
                          <label> Plantillas </label>
                          <div>
                            <button id="1" className='bt_plantillas'>1 Día</button>
                            <button id="2" className='bt_plantillas'>1 Hora</button>
                            <button id="3" className='bt_plantillas'>45 Minutos</button>
                            <button id="4" className='bt_plantillas'>30 Minutos</button>
                            <button id="5" className='bt_plantillas'>15 Minutos</button>
                          </div>
                        </div>
                      </div>                    
                    </form>
                    
                    <div className="btns-modal"> 
                        <button onClick={() => c1(false)} className="btn_add u_line">cancelar</button>
                        <button onClick={addTarea} className="btn_add add_cls" >Añadir</button>
                    </div>
                </div>
            </div>

       }

      { model.modalEdita &&

      <div className='modal'>
        <div className="bkg-modal" onClick={() => c2(false)}></div>
          <div className="main-modal">
              <div className="header-modal">
                  <div className="tit-modal">EDITAR</div>
                  <button onClick={() => c2(false)} className="close-modal"><i className="fas fa-times"></i></button>
              </div>
              <form className="cont-modal"> 
                <div className='cnt-m-all'>
                  <div className='cnt-m-ms'>
                    <label> Tareas <span>*</span></label>
                    <input type="text"  name="titulo" defaultValue={edicion.titulo} onChange={handleChange2} ref={changeTitulo}/>
                  </div>
                  <div className='cnt-m-ms'>
                    <label> Descripción <span>*</span></label>
                    <textarea  name="descripcion" onChange={handleChange2} defaultValue={edicion.descripcion} ref={changeDescrip} rows="5"></textarea>
                  </div>
                  <div className='cnt-m-ms'>
                    <label> Tiempo <span>*</span></label>
                      <div className="clock-container">
                        <div className="clock-col">
                          <input type="number" min="0" max="99" className="clock-timer"/>
                          <p className="clock-label"> Días </p>
                        </div>
                        <div className="clock-col">
                          <input type="number" min="0" max="99" className="clock-timer"/>
                          <p className="clock-label"> Horas </p>
                        </div>
                        <div className="clock-col">
                          <input type="number" min="1" max="99" className="clock-timer"/>
                          <p className="clock-label">Minutos</p>
                        </div>
                      </div>
                  </div>
                  <div className='cnt-m-ms'>
                    <Countdown date={Date.now() + model.tiempo} />
                  </div>
                </div>                    
              </form>
              
              <div className="btns-modal"> 
                  <button onClick={() => eliminaTarea()} className="btn_add u_line">eliminar</button>
                  <button onClick={() => finalizaTarea()} className="btn_add u_line">finalizar</button>
                  <button onClick={() => c2(false)} className="btn_add u_line">cancelar</button>
                  <button onClick={editTarea} className="btn_add add_cls" >Actualizar</button>
              </div>
          </div>
      </div>
      
      }

      
       </>

    )
}
