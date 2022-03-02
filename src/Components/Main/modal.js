import React, { useEffect, useState, useRef, Component }  from 'react';
import Countdown, { CountdownApi }  from 'react-countdown';


export default function Modal({c1, c2, model, addTarea, editTarea, eliminaTarea, finalizaTarea, setTiempo, edicion, initTarea, pauseTarea }) {

    const inputTitulo = useRef();
    const inputDescrip = useRef();
    
    const changeTitulo = useRef();
    const changeDescrip = useRef();

    let okTimer = useRef();

    let valida = true;

    //let countdownApi: CountdownApi; 

    const [active, setActv] = useState(false);

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

    const handleClick = () => {
      setActv(true)
    }


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
                    <div className="cont-modal"> 
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
                              <Countdown  autoStart={false} className="tiempo-modal" date={Date.now() + model.tarea.tiempo} />
                              <div className='objs-elems txt-mins'> <div>HORAS</div> <div>MINUTOS</div>  <div>SEGUNDOS</div> </div>
                            </div>
                        </div>
                        <div className='cnt-m-ms'>
                          <label> Plantillas </label>
                          <div>
                            <button onClick={() => setTiempo(3600000)} id="2" className='bt_plantillas'>1 Hora</button>
                            <button onClick={() => setTiempo(2700000)} id="3" className='bt_plantillas'>45 Minutos</button>
                            <button onClick={() => setTiempo(1800000)} id="4" className='bt_plantillas'>30 Minutos</button>
                            <button onClick={() => setTiempo(120000)} id="4" className='bt_plantillas'>2 Minutos</button>
                          </div>
                        </div>
                      </div>                    
                    </div>
                    
                    <div className="btns-modal"> 
                        <button onClick={() => c1(false)} className="btn_add u_line">cancelar</button>
                        <button onClick={addTarea} className="btn_add add_cls" disabled={!valida}>Añadir</button>
                    </div>
                </div>
            </div>

       }

      { (model.modalEdita && model.tarea.estatus !== 9 ) &&

      <div className='modal'>
        <div className="bkg-modal" onClick={() => c2(false)}></div>
          <div className="main-modal">
              <div className="header-modal">
                  <div className="tit-modal">EDITAR</div>
                  <button onClick={() => c2(false)} className="close-modal"><i className="fas fa-times"></i></button>
              </div>
              <div className="cont-modal"> 
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
                              <Countdown onPause={active} className="tiempo-modal" date={Date.now() + edicion.tiempo} />
                              <div className='objs-elems txt-mins'> <div>HORAS</div> <div>MINUTOS</div>  <div>SEGUNDOS</div> </div>
                            </div>
                  </div>
                  <div className='cnt-m-ms'>
                          <label> Plantillas </label>
                          <div>
                            <button id="2" className='bt_plantillas' disabled={edicion.estatus === 2 || edicion.estatus === 5 || edicion.estatus === 9}><i class="fas fa-play"></i> INICIAR</button>
                            <button onClick={() => handleClick} id="3" className='bt_plantillas'> <i class="fas fa-pause"></i> PAUSAR</button>
                            <button onClick={setTiempo(edicion.tiempo_inicial)} id="4" className='bt_plantillas'>REINICIAR</button>
                          </div>
                        </div>
                </div>                    
              </div>
              
              <div className="btns-modal"> 
                  <button onClick={() => eliminaTarea()} className="btn_add u_line destroy_btn"><i className="fas fa-shredder ico-l"></i> destruir</button>
                  <button onClick={() => finalizaTarea()} className="btn_add u_line">finalizar</button>
                  <button onClick={() => c2(false)} className="btn_add u_line">cancelar</button>
                  <button onClick={editTarea} className="btn_add add_cls" >Actualizar</button>
              </div>
          </div>
      </div>
      
      }

      { (model.modalEdita && model.tarea.estatus === 9 ) &&

      <div className='modal'>
        <div className="bkg-modal" onClick={() => c2(false)}></div>
          <div className="main-modal">
              <div className="header-modal">
                  <div className="tit-modal">ELIMINADO</div>
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
                </div>                    
              </form>
              
              <div className="btns-modal"> 
                  <button onClick={() => eliminaTarea()} className="btn_add u_line destroy_btn"><i className="fas fa-shredder ico-l"></i> destruir</button>
                  
              </div>
          </div>
      </div>

      }

      
       </>

    )
}
