import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { UilTimesCircle } from '@iconscout/react-unicons'

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("nature");
  const inputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm !== "") 
      {
        const result = await axios.get(
          `https://pixabay.com/api/?key=17555297-46a99d3dc7abf78679ec9e640&q=${searchTerm}&image_type=photo&pretty=true`
        );
        setData(result.data.hits);
      }
    }
    fetchData();
  }, [searchTerm]);

  return (
    <div className="App relative">
      <div className="container mx-auto px-4 pt-10">
        <div className="flex justify-center items-center">
          <div className="w-3/12 relative flex justify-center items-center">
            <button className="absolute left-2"
              onClick={()=>{
                setSearchTerm("")
                inputRef.current.value = ""
                setData([])
              }}
            >
              <UilTimesCircle className="text-2xl text-slate-500" />
            </button>
            <input
              className=" w-full px-4 py-2 rounded-full text-center  border-2 border-slate-500"
              type="text"
              placeholder="Rechercher une image..."
              ref={inputRef}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {
              data.length > 0 ?
                data.map((image, index) => (
                <div
                  key={index}
                  className="bg-white rounded overflow-hidden shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer"
                >
                  <img
                    src={image.webformatURL}
                    alt={image.tags}
                    className="w-full"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{image.user}</div>
                    <p className="text-gray-700 text-base">{image.tags}</p>
                  </div>
                </div>
                ))
              :
              <div className="w-full flex justify-center items-center col-span-3">
                <p className="text-2xl text-slate-500">Aucun résultat</p>
              </div>
            }
          </div>
      
      </div>
    </div>
  );
}

export default App;
