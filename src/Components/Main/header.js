import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function Header() {
    
    const navigate = useNavigate();

    /* EFECTO INICIAL */
    useEffect(() => {            
        gsap.to(".main", { duration: 1.5, ease: "bounce.out", opacity: "1", y: "250" }, 2);
    }, []); 

    function NavHome (){       
        navigate('/Login/' );   
    }

    return (
        <header>
            <div className="isotipo-bnc"></div>
            <div className="btns-head">
                <div className="bt-head"><i className="far fa-alarm-exclamation "></i></div>
                <div className="bt-head"><i className="far fa-address-book "></i></div>
                <div className="bt-head"><i className="fas fa-bell "></i></div>
                <div className="bt-head"><i className="fas fa-question-circle "></i></div>
                <div className="bt-head"><i className="fas fa-cog "></i></div>
                <div className="bt-head" onClick={NavHome}><i className="fas fa-sign-out-alt "></i></div>


            </div>
        </header>
    )
}
