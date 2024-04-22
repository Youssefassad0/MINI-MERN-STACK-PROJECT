/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import axios from "axios"
import Spinner from "../Components/Spinner"
import { Link } from "react-router-dom"
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.get('http:/127.0.0.1:5000/books').then(res => {
      setBooks(res.data.data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  return (
    <div className="p-4" >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create" >
          <MdOutlineAddBox  className="text-sky-800 text-4xl" />
        </Link>
      </div>
{
  loading ? (<Spinner/>) : (
    <table className="w-full border-seperate border-spacing-2" ></table>
  )
}
    </div>
  )
}

export default Home