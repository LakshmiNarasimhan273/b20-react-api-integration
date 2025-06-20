import React, { useEffect, useState } from 'react'
import axios from "axios";

const baseURL = "http://localhost:3001/users";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phonenumber: ''
  });

  useEffect(() => {
    axios.get(baseURL) // parameter URL
      .then(res => setUsers(res.data))
      .catch(err => console.error(err)
      )
  }, []);

  const addUser = () => {
    // parameter URL
    // parameter payload
    axios.post(baseURL, form).then((res) => {
      setUsers([...users, res.data]);
      setForm({name: '', phonenumber: ''});
    })
  }

  const deleteUser = (id) => {
    // parameter - URL / id
    axios.delete(`${baseURL}/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    })
  }

  console.log(users);
  return (
    <div>

      <input type="text" 
      value={form.name} 
      onChange={(e) => setForm({ ...form, name: e.target.value })} 
      placeholder='Enter your name' />
      {/*  */}
      <input type="number" 
      value={form.phonenumber} 
      onChange={(e) => setForm({ ...form, phonenumber: e.target.value })} 
      placeholder='Enter your number' />
      <button onClick={addUser}>Add user</button>

      <div>
        <ul>
          {
            users.map((user) => (
              <li key={user.id}>{user.name} - {user.phonenumber} |
                <button>Edit details</button><button onClick={() => deleteUser(user.id)}>Delete user</button></li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App