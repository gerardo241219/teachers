import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginLayout from "./Layouts/LoginLayout"
import HomeLayout from "./Layouts/HomeLayout"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ListDocuments from './Pages/ListDocuments'
import Document from './Pages/Document'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={ <LoginLayout /> } >
         <Route index element={ <Login /> } />
         <Route path="register" element={ <Register /> } />
        </Route>

        <Route path="/home/:id" element={ <HomeLayout /> }>
          <Route index element={ <ListDocuments /> } />
          <Route path=":file" element={ <Document /> }/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App