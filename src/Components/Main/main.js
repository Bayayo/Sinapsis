import React, { useState, useEffect } from 'react';
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
    const ref = doc(tareasCollection, "id");
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

    const state = {
        usuario: usr,
        usr_id: usrId,
        data: tareas,
        modalActualizar: false,
        modalInsertar: nuevo,
        modalEdita: edita,
        modalHistorico: false,
        modalGraficas: false,
        visor: { todos:true, finalizados:false},
        tarea: {
            usr_id: null,
            usuario: null,
            titulo: null,
            descripcion: null,
            tiempo: null,
            estatus: null,
            fecha: null,
            id: null,
            idx: null
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
        state.data = [];
        GetTareas(Object.values(sslocalTemp[0].id))
        /* INICIA ANIMACIÓN*/
        const transicion = gsap.timeline();
        transicion.to(".container-main", { opacity: "1", duration: 1});
            toast('Bienvenido!', { position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined});
    }, []);  
    

    /* BUSCA TAREAS EN BD*/
    async function GetTareas(idUsr){
        let id = Number.parseInt(idUsr, 10)
        state.data = [];
        const q = query(collection(db, "tareas"), where("usr_id", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
           // setTareas([{ idx: doc.id }]);
           //console.log(doc.id, " => ", doc.data());            
        });
        setTareas(querySnapshot.docs.map((doc) => ({ ...doc.data(), idx: doc.id })));
        
        //const data = await getDocs(usersCollectionRef);
        //setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

        state.visor.todos= true;
    }

    const addTarea = async () => {
        const initialId = state.usr_id.toString();
        const ultimoTra = (state.data.length).toString();
        const idUsr = initialId.padStart(3, "0");
        const trabajos = ultimoTra.padStart(4, "0");

        const time = new Date();
        const idx = 'WRK-' + idUsr + '-' + state.usuario.slice(0,4).toUpperCase() + '-' + trabajos  + '-' + time.getMilliseconds();

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
                GetTareas();
                setNuevo(false)
                console.log(state)
        } else{
            console.log('falla: ' + idx)
            toast.error('😲 QUE RARO 😲!, no se insertó, hubo un error esperado pero inesperado. 😝' + idx, { position: "bottom-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
            console.log(state)
            setNuevo(false)
        }

        

    }

    const editTarea = async () => {
        console.log(idx)
        let cosa = JSON.stringify(edicion)
        /*if(state.usr_id != null && edicion.titulo != null && edicion.descripcion != null){
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
            GetTareas();
            setEdita(false)

        }
        else{
            toast.error('😲 NO POS NO 😲!, Quien sabe por que pero no se actualizó. 😝 ID: ' + idx, { position: "bottom-center", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined });
            setEdita(false)
        }
        */
        
        console.log("OK, se actualizo: -" +  cosa + "ID= " + idx)
        
    }

    const verHistorial = (b) => {
        console.log('Historial: ' + b)
    }

    const playAll = (c) => {
        console.log('Play:' + c)
    }

    const pauseAll = (d) => {
        console.log('Pausa:' + d)
    }

    const quitAll = (e) => {
        console.log('Quitar' + e)
    }

    


    return (
        <>
            <Header/>
            <div className="container-main">
                <Tab model={state} addTarea={addTarea} editTarea={editTarea} edicion={edicion} verHistorial={verHistorial} setNuevo={setNuevo} setEdita={setEdita}/>
                <Container tareas={state.data} model={state} setEdita={setEdita} setEdicion={setEdicion} setIdEdicion={setIdEdicion} playAll={playAll} pauseAll={pauseAll} quitAll={quitAll}/>
            </div>
            <ToastContainer />

        </>
    )
}
