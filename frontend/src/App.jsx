import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import CreateBook from './Pages/CreateBook'
import EditBook from './Pages/EditBook'
import DeleteBook from './Pages/DeleteBook'
import SingleBook from './Pages/SingleBook'
function App() {
  return (
    <Routes>
      <Route path='/'  element={<Home/>} />
      <Route path='/book/addBook'  element={<CreateBook/>} />
      <Route path='/book/editBook/:id'  element={<EditBook/>} />
      <Route path='/book/details/:id'  element={<SingleBook/>} />
      <Route path='/book/delete/:id'  element={<DeleteBook/>} />
    </Routes>
  )
}

export default App