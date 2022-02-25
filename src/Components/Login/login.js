import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { collection, getDocs, addDoc, orderBy  } from 'firebase/firestore';
import db from '../../firebase/firebase.config';

export default function Login() {

    const usersCollectionRef = collection(db, "usuario");
    const LOCAL_STORAGE_KEY = 'SINOPSIS';
    const navigate = useNavigate();
    const [datosApp, setdatosApp] = useState([]);
    const [passCheck, enableButton] = useState("");
    const [usr, setUsr] = useState([]);
    const [ver, inVer] = useState("");
    const [idUsr, inUsr] = useState("");
    const [select, inSelect] = useState("0");
    const nombRef = useRef();
    
    useEffect(() => {
        /*LLENA LOS DATOS DEL API*/
        const obtieneDatosIniciales = async() => {
            const usuarios = await getDocs( usersCollectionRef, orderBy("id"))
            const version = await getDocs( collection(db, "version"))
            setUsr(usuarios.docs.map((doc) => ({ ...doc.data() })));
            llenaVersion(version.docs[0].data(), usuarios.docs)
        }
        
        obtieneDatosIniciales()
        
    }, [])



    /* EFECTO INICIAL */
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(datosApp))
        gsap.to(".form", { duration: 1.5, ease: "bounce.out", opacity: "1", y: "250" }, 2);
    }, [datosApp])
    
    
    function setUsuarioApp(){
        const name = nombRef.current.value;
        enableButton(name);
    }

    function Entrar(){
        const name = nombRef.current.value;
        const id = idUsr + 1;
        setdatosApp( tempData => {
            return [...tempData,  {id:id, nombre:name } ]
        }) 
        const createUser = async () => {
            await addDoc(usersCollectionRef, { id:id, nombre: name });
        };
        createUser();
        const transicion = gsap.timeline({onComplete: NavMain});
        transicion.to(".form", { duration: 0.5, ease: "bounce.out", opacity: "0", y: "0" })
                  .to(".bkg-login", { duration: 1,  opacity: "0" });
    }

    function NavMain (){       
        navigate('/Tareas/' );   
    }

    function llenaVersion(dato, usuarios){
        inVer(dato.version)
        inUsr(usuarios.length)
    }

    function selectUsuarioApp(e){
        e.preventDefault()
        inSelect(e.target.value)
        setdatosApp( tempData => {
            return [...tempData,  { id:e.target.value, nombre:e.target.options[e.target.selectedIndex].text } ]
        }) 
        const transicion = gsap.timeline({onComplete: NavMain});
        transicion.to(".form", { duration: 0.5, ease: "bounce.out", opacity: "0", y: "0" })
                  .to(".bkg-login", { duration: 1,  opacity: "0" });
        
    }
    
    return (
        <div className="bkg-login">

            <div className="form" >

                <div className="isotipo iso-form-nuevo" ></div>
                <h3 className="txt-center"> ACCESO </h3>

                <div className="objs-elems">
                    <div className="objs-ins">
                        <label>NUEVO</label>
                        <input type="text" className="form-control bord" data-value="txt" ref={nombRef} onChange={setUsuarioApp} />
                    </div>
                </div>

                <div className="objs-elems">
                    <div className="objs-ins">
                        <label>TEMPLATE</label>
                        <select type="text" data-value="txt" value={select} onChange={selectUsuarioApp}>
                        <option value={0} name={0} disabled>SELECCIONA</option>
                            {usr.map((user) => {
                                return(
                                    <option key={user.id} value={user.id} name={user.nombre}>{user.nombre}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="objs-elems">
                    <div className="objs-ins">
                        <button className="btn txt-center-100" disabled={!passCheck} onClick={Entrar} >Entrar</button>
                    </div>
                </div>

                <div>
                    <p className="version">{ver}</p>
                </div>
            
            </div>
            
        </div>

    )
}
