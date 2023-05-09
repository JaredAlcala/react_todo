//This component will house a button for each category as well as an all button to remove filtering
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function FilterCat(props) {
    // We need to access and store categories from the API for this component to work
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        axios.get('http://todoapi.jaredalcala.com/api/categories').then(response => {
            setCategories(response.data)
        })
    }, []);
  return (
    <div className='text-center mt-5'>
      <button className="btn btn-outline-light bg-dark m-1" onClick={() => props.setFilter(0)}>
        All
        </button>  
        {/* Below we map all our categories to a button that will filter the resources for that category */}
        {categories.map(cat =>
            <button key={cat.categoryId} className="btn btn-outline-light bg-dark m-1"
            onClick={() => props.setFilter(+cat.categoryId)}>
                {cat.catName}
            </button>
            )}
            {!props.showDone ?
                <button className="btn btn-success m-1" onClick={() => props.setShowDone(!props.showDone)}>
                    Show Complete
                </button>:
                <button className="btn btn-warning m-1" onClick={() => props.setShowDone(!props.showDone)}>
                    Hide Complete  
                </button>
            }  
    </div>
    
  )
}