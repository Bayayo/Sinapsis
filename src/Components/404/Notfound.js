import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    
    const navigate = useNavigate();
    
    useEffect(() => {

        setTimeout(() => {
            navigate("/Main");
        }, 5000);
        
    }, [navigate]);

    return (
        <div>
            No se encontrĂ³
        </div>
    )
}


export default Notfound;