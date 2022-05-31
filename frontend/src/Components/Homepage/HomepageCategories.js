import {React} from 'react'
import { Link } from 'react-router-dom';
import Categories from './Categories';

export default function HomepageCategories(){

        const names = [
                ["Nikon", "Sony", "Canon", "Fujifilm", "Panasonic", "Olympus"],
                ["Systemkamera", "Mellanformatskamera", "Kompaktkamera"]
        ];
        const categories = [
            "Märken",
            "Typ av kamera"
        ]

        return (
            <div className='' style={{backgroundColor: " #f2f2f2"}}>
                <p className='fs-5 m-0' style={{backgroundColor: "#cccccc"}}>
                    Kategorier
                </p>
                <Link to={"/search?="}className='text-decoration-none text-dark'>
                    <p className="mb-1" style={{fontSize: "1.75vh"}}>
                        Alla föremål
                    </p>
                </Link>
                {categories.map((category, i)=> {
                    return (
                        <Categories category={category} names={names[i]} key={category}/>
                    )
                })}
            </div>
        )
}