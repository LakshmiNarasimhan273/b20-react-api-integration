import React, { useEffect, useState } from 'react'
import axios from "axios";

const baseURL = "http://localhost:3001/users";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phonenumber: ''
  });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    // GET METHOD
    axios.get(baseURL) // parameter URL
      .then(res => setUsers(res.data))
      .catch(err => console.error(err)
      )
  }, []);

  // POST METHOD
  const addUser = () => {
    // parameter URL
    // parameter payload
    axios.post(baseURL, form).then((res) => {
      setUsers([...users, res.data]);
      setForm({name: '', phonenumber: ''});
    })
  }

  // Load existing user data to the form
  const loadUserdata = (user) => {
    setForm({name: user.name, phonenumber: user.phonenumber});
    setEditUser(user.id);
  }

  // PUT METHOD
  const updateUser = () => {
    // const updated = {...form};
    // updated - payload
    axios.put(`${baseURL}/${editUser}`, form)
    .then((res) => {
      // Update logic
      setUsers(users.map((u) => (u.id === editUser ? res.data : u)));
    });
    setForm({name: '', phonenumber: ''});
    setEditUser(null);
  }

  // DELETE METHOD
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
      
      {
        !editUser ? (
          <button onClick={addUser}>Add user</button>
        ) : (
          <button onClick={updateUser}>Update user</button>
        )
      }

      <div>
        <ul>
          {
            users.map((user) => (
              <li key={user.id}>{user.name} - {user.phonenumber} |
                <button onClick={() => loadUserdata(user)}>Edit details</button>
                <button onClick={() => deleteUser(user.id)}>Delete user</button></li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App