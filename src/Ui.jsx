import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const Ui = () => {
  let [data, setdata] = useState([]);

  let [name, setname] = useState("");
  let [email, setemail] = useState("");
  let [phone, setphone] = useState("");
  let [img, setimg] = useState("");

  let [id, setid] = useState(-1);

  const handlesubmit = (e) => {
    e.preventDefault();
    let obj = {
      name: name,
      email: email,
      phone: phone,
      img: img,
    };

    if (id == -1) {
      // post request for creating
      axios
        .post("http://localhost:7000/user", obj)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // patch for updating
      axios
        .patch(`http://localhost:7000/user/${id}`, obj)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

        setemail("");
    setname("");
    setimg("");
    setphone("");
    setid(-1);
    }
  };

  const handleDelete=(id)=>{
    axios
    .delete(`http://localhost:7000/user/${id}`)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });


  }
  useEffect(() => {
    axios
      .get(`http://localhost:7000/user`)
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [handlesubmit,handleDelete]);

  const handleUpadate = (ele) => {
    setemail(ele.email);
    setname(ele.name);
    setimg(ele.img);
    setphone(ele.phone);
    setid(ele.id);
  };

 
  return (
    <div>
      <div>
        <form onSubmit={handlesubmit} className="form-main">
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setname(e.target.value)}
            value={name}
            className="form-name"
          />
          <input
            type="email"
            placeholder="Enter Your E-mail"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="form-mail"
          />
          <input
            type="number"
            placeholder="Enter Your Mobile No."
            onChange={(e) => setphone(e.target.value)}
            value={phone}
            className="form-number"
          />
          <input
            type="url"
            placeholder="Enter Your img url"
            onChange={(e) => setimg(e.target.value)}
            value={img}
            className="form-img"
          />
          <input type="submit" />
        </form>
      </div>

      <table border="2px solid black">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone</th>
            <th>update</th>
            <th>delete</th>
          </tr>
        </thead>

        <tbody>
          {data.map((ele) => (
            <tr>
              <td className="sub-name">{ele.id}</td>
              <td className="img-td">
                <img src={ele.img} alt="" className="sub-img" />
              </td>
              <td className="sub-name">{ele.name}</td>
              <td className="sub-mail">{ele.email}</td>
              <td className="sub-phone">{ele.phone}</td>
              <td onClick={() => handleUpadate(ele)}>edit</td>
              <td onClick={()=>handleDelete(ele.id)}>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ui;
