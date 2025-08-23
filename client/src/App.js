import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './source/header';
import Main from './source/main';
import Login from './source/login';
import Register from './source/register';
import AddProperty from './source/addproperty';
import AddMaintenance from './source/addmaintenance';
import SingleProperty from './source/singleproperty';
import User from './source/user';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
            <Route exact path='/' element ={<Main />} />
            <Route exact path='/home' element ={<Main />} />
            <Route exact path='/login' element ={<Login />} />
            <Route exact path='/register' element ={<Register />} />
            <Route exact path='/addProperty' element ={<AddProperty />} />
            <Route exact path='/addMaintenance' element ={<AddMaintenance />} />
            <Route path="/property/:id" element={<SingleProperty />} />
            <Route exact path='/user' element ={<User />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
