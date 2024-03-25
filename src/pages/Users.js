import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Users = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(global.config.api.remotePath + `user/all`)
      .then((response) => {
        // console.log(response.data.response);
        if (response.data.res_code === 200) {
          setUsers(response.data.response);
        }
      }).catch((error) => {
        console.log(error);
      })
  }, [])


  return (
    <>
      <div className='container'>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((data) => {
                return (
                  <>
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.fullname}</td>
                      <td>{data.email}</td>
                      <td>{data.role.role}</td>
                    </tr>
                  </>
                )
              })
            }


          </tbody>
        </table>

      </div>


    </>
  )
}

export default Users
