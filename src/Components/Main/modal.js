import React, { useEffect, useState, useRef }  from 'react';


export default function Modal({c1, c2, model, addTarea, editTarea, edicion }) {

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let timeLeft = {};
    const difference = +new Date(`${year}-9-1`) - +new Date();

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear()); 
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
  
    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });


    const doClean = () => {

    }

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
                            <button id="1" name="a_" className='bt_plantillas'>1 Día</button>
                            <button id="2" name="a_" className='bt_plantillas'>1 Hora</button>
                            <button id="3" name="a_" className='bt_plantillas'>45 Minutos</button>
                            <button id="4" name="a_" className='bt_plantillas'>30 Minutos</button>
                            <button id="5" name="a_" className='bt_plantillas'>15 Minutos</button>
                          </div>
                        </div>
                          <div>{timerComponents.length ? timerComponents : <span>Time's up!</span>}</div>
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
                    <label> Plantillas </label>
                    <div>
                      <button id="" name="" className='bt_plantillas'>1 Día</button>
                      <button id="" name="" className='bt_plantillas'>1 Hora</button>
                      <button id="" name="" className='bt_plantillas'>45 Minutos</button>
                      <button id="" name="" className='bt_plantillas'>30 Minutos</button>
                      <button id="" name="" className='bt_plantillas'>15 Minutos</button>
                    </div>
                  </div>
                    <div>{timerComponents.length ? timerComponents : <span>Time's up!</span>}</div>
                </div>                    
              </form>
              
              <div className="btns-modal"> 
                  <button onClick={() => c2(false)} className="btn_add u_line">cancelar</button>
                  <button onClick={editTarea} className="btn_add add_cls" >Actualizar</button>
              </div>
          </div>
      </div>
      
      }

      
       </>

    )
}
