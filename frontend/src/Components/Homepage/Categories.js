import {React} from 'react'
import { Link } from 'react-router-dom'


export default function Categories({category, names}) {


    return (
        <div key={category} className="mt-2">
            <p className="mb-1"style={{fontSize: "2vh", backgroundColor: "#e6e6e6"}}>{category}</p>
            {names.map(name => {
                return(                    
                    <Link to={`search?search=${name}`} className="text-dark text-decoration-none" key={name}>
                        <p className="mb-1" style={{fontSize: "1.75vh"}}>{name}</p>
                    </Link>                                        
                )
            })}  
        </div>
    )
}