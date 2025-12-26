

import supabase from '../config/supabaseCLient'
import { useEffect, useState } from "react"
import SmoothieCard from '../components/SmoothieCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)          //const [stateValue, setStateValue] = useState(initialValue)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select("*")

      if (error) {
        setFetchError("Could not fetch smoothies")
        setSmoothies(null)
        console.log(error)
      }

      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }, []) //  VERY IMPORTANT
  

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}

      {smoothies && (
        <div className="smoothies">
          <div className='smoothie-grid'>
          {smoothies.map((smoothie) => (
            <SmoothieCard key = {smoothie.id} smoothie ={smoothie}/>
          ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
