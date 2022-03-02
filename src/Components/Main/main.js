import React, { useState, useEffect, useRef, Fragment } from 'react';
import {collection,getDocs, setDoc, addDoc,updateDoc,deleteDoc,doc,where, query} from "firebase/firestore";
//import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Header from './header';
import Container from './container';
import Tab from './tab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from '../../firebase/firebase.config';

export default function Main() {

    //const navigate = useNavigate();
    const tareasCollection = collection(db, "tareas");
    const LOCAL_STORAGE_KEY = 'SINOPSIS';
    const [usrTemp, setUsrTemp] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [usr, setUsr] = useState();
    const [usrId, setUsrId] = useState();
    const [nuevo, setNuevo] = useState(false);
    const [edita, setEdita] = useState(false);
    const [edicion, setEdicion] = useState();
    const [idx, setIdEdicion] = useState();
    const [idxTarea, setIdx] = useState();
    const [verTodo, setVerTodo] = useState(false);
    const [verFinal, setVerFinal] = useState(false);
    const [verCurso, setVerCurrso] = useState(false);
    const [verEliminados, setVerEliminados] = useState(false);
    const [okClick, setClick] = useState(false);
    const [tiempo, setTiempo] = useState(120000);
    const refCallback = useRef();

    /*MODELO PRINCIPAL*/
    const state = {
        usuario: usr,
        usr_id: usrId,
        data: tareas,
        modalActualizar: false,
        modalInsertar: nuevo,
        modalEdita: edita,
        modalHistorico: false,
        modalGraficas: false,
        visor: { 
            curso:verCurso, 
            todos:verTodo, 
            finalizados:verFinal,
            eliminados: verEliminados,
            graficas: false
        },
        tarea: {
            usr_id: usrId,
            usuario: usr,
            titulo: '',
            descripcion: '',
            tiempo: tiempo,
            tiempo_inicial: tiempo,
            estatus: 0,
            fecha_inicial: Date.now(),
            fecha_final: '',
            id: 0,
            idx: ''
        },
      };
  
    /* INICIO */
    useEffect(() => {   
        /*SE BUSCA EN EL TEMP*/
        const sslocalTemp = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if(sslocalTemp) setUsrTemp (sslocalTemp)
        /*SE CREA LA VAR DE USUARIO*/
        setUsr(sslocalTemp[0].nombre)
        let id = Number.parseInt(sslocalTemp[0].id, 10)
        setUsrId(id)
        /*SE BUSCA LAS TAREAS DEL USUARIO*/
        getTareas(Object.values(sslocalTemp[0].id))
        /* INICIA ANIMACIÓN*/
        const transicion = gsap.timeline();
        transicion.to(".container-main", { opacity: "1", duration: 1});
            toast('Bienvenido!', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined});
    }, []);  
    

    /* BUSCA TAREAS EN BD*/
    async function getTareas(usrId){
        /* SE VISUALIZAN LAS TAREAS DEL USUARIO*/
        setTareas([]);
        let id = Number.parseInt(usrId, 10)
        const q = query(collection(db, "tareas"), where("usr_id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.map((doc) =>
            setTareas(oddars => { 
                return [...oddars, { ...doc.data(), idx: doc.id }]
            })
        );
        setVerFinal(false)
        setVerTodo(false);
        setVerCurrso(true);
    }


    const addTarea = async () => {

        /*SE CREA ID*/
        const initialId = state.usr_id.toString();
        const ultimoTra = (state.data.length).toString();
        const idUsr = initialId.padStart(3, "0");
        const trabajos = ultimoTra.padStart(4, "0");

        const time = new Date();
        const idx = 'WRK-' + idUsr + '-' + state.usuario.slice(0,4).toUpperCase() + '-' + trabajos  + '-' + time.getMilliseconds();
        /* INSERTA NUEVA TAREA*/
        if(state.usr_id != null && state.tarea.titulo != null && state.tarea.descripcion != null){
            const nuevaTarea = doc(db, 'tareas', idx);
            await setDoc(nuevaTarea, state.tarea);
            toast.success('Se ha agregado una nueva tarea con el id: '+ state.tarea.id, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
                getTareas(idUsr);
                setNuevo(false)
                //console.log(state)
        } else{
            console.log('falla: ' + idx)
            toast.error('😲 QUE RARO 😲!, no se insertó, hubo un error esperado pero inesperado. 😝' + idx, { position: "bottom-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
            //console.log(state)
            setNuevo(false)
        }  
    }

    const editTarea = async () => {
        /* SE ACTUALIZA TAREA CON EL IDX*/        
        if(state.usr_id != null && edicion.titulo != null && edicion.descripcion != null){
            const q = doc(db, "tareas", idx);
            await updateDoc(q, edicion);
            toast.success('Se ha actualizado la tarea: '+ idx, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            setEdita(false)
        }
        else{
            toast.error('😲 NO POS NO 😲!, Quien sabe por que pero no se actualizó. 😝 ID: ' + idx, { position: "bottom-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
            setEdita(false)
        }
        //console.log("OK, se actualizo: -" +  cosa + "ID= " + idx)
    }

    const eliminaTarea = async () => {
        /* SE ACTUALIZA TAREA CON EL IDX*/        
        if(state.usr_id != null && edicion.titulo != null && edicion.estatus !== 0){
            const q = doc(db, "tareas", idx);
            await deleteDoc(q);
            toast.success('Dile adios a la tarea: (' +  edicion.id +  ') , IDX: ' + idx, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            getTareas(state.usr_id);
            setEdita(false)
        }
        else{
            toast.error('😲 QUE CARAJO 😲!, Porqué demonios no se eliminó, si le diste eliminar! 😝 ID: ' + idx, { position: "bottom-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
            setEdita(false)
        }
    }

    const finalizaTarea = async () => {
         /* SE ACTUALIZA TAREA CON EL IDX*/        
         if(state.usr_id != null && edicion.titulo != null && edicion.descripcion != null){
            const q = doc(db, "tareas", idx);
            await updateDoc(q, {estatus: 5});
            toast.success('😍 MARAVILLOSO 😍! Se ha Finalizado la tarea: '+ idx, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            getTareas(state.usr_id);
            setEdita(false)
        }
        else{
            toast.error('😲 JA 😲!, NO PUEDES ACABAR ESTA TAREA. 😝 ID: ' + idx, { position: "bottom-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
            setEdita(false)
        }
    }
    /* INICIA LAS TAREAS CON EL ESTATUS: 2*/ 
    const initTarea = async () => {
        if(state.usr_id != null && edicion.titulo != null && edicion.descripcion != null){
            const q = doc(db, "tareas", idx);
            await updateDoc(q, {estatus: 2});
            toast.success('😍 OK 😍! Manos a la obra!, : '+ idx, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                });
            getTareas(state.usr_id);
            setEdita(false)
        }
        else{
            toast.error('😲 JA 😲!, NO PUEDES INICIAR ESTA TAREA. 😝 ID: ' + idx, { position: "bottom-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
            setEdita(false)
        }
    }

    const pauseTarea = () => {

    }

    const playAll = (c) => {
        console.log('Play:' + c)
    }

    const pauseAll = (d) => {
        console.log('Pausa:' + d)
    }

    const quitAll = (e) => {
        console.log('Quitar' + e)
        refCallback.pause()
    }

    /* SWITCHES PARA VER LOS MENUS CON LA INFO*/
    /* LAS TAREAS EN CURSO SON DEL ESTATUS:2 */
    const verEnCurso = () => {
        setVerCurrso(true);
        setVerTodo(false)
        setVerFinal(false)
        setVerEliminados(false)
    }
    /* VISUALIZA TODO */
    const verTodos = () => {
        setVerCurrso(false);
        setVerTodo(true)
        setVerFinal(false)
        setVerEliminados(false)
    }
    /* VISUALIZA CON EL ESTATUS:5 o FINALIZADOS */
    const verHistorial = () => {
        setVerCurrso(false);
        setVerTodo(false)
        setVerFinal(true)
        setVerEliminados(false)
    }
    /* VISUALIZA CON EL ESTATUS:9 */
    const verEliminadosList = () => {
        setVerCurrso(false);
        setVerTodo(false)
        setVerFinal(false)
        setVerEliminados(true)
    }
    const clock = () => {
        
    }

    

    /* CONTENEDOR DE TODA LA INFORMACIÓN*/
    return (
        <Fragment>
            <Header/>
            <div className="container-main">
                <Tab model={state} addTarea={addTarea} editTarea={editTarea} eliminaTarea={eliminaTarea} finalizaTarea={finalizaTarea} edicion={edicion} verTodos={verTodos} verHistorial={verHistorial} setNuevo={setNuevo} setEdita={setEdita} verEliminadosList={verEliminadosList} verCurso={verEnCurso} setTiempo={setTiempo} initTarea={initTarea} pauseTarea={pauseTarea}  okClick={okClick}/>
                <Container tareas={state.data} model={state} setEdita={setEdita} setEdicion={setEdicion} setIdEdicion={setIdEdicion} playAll={playAll} pauseAll={pauseAll} quitAll={quitAll} finalizaTarea={finalizaTarea} refCallback={refCallback} okClick={okClick}/>
            </div>
            <ToastContainer />

        </Fragment>
    )
}
