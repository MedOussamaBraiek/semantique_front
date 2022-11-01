import React from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
} from "reactstrap";

import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import axios from "axios";
import DepartmentCard from "../components/dashboard/DepartmentsCard";

const BlogData = [
    {
      image: bg1,
      title: "This is simple blog",
      subtitle: "2 comments, 1 Like",
      description:
        "This is a wider card with supporting text below as a natural lead-in to additional content.",
      btnbg: "primary",
    },
]

const DepartmentPage = () => {

  const baseUlr = "http://localhost:8030/ws/getalldepartment"

  const [departments, setDepartments] = React.useState([]);

  const [name, setName] = React.useState("");

  const getDepartments = () => {
    axios.get(baseUlr)
    .then((response) => {
        console.log(response)
        setDepartments(response.data.filter(department => 
            department.name.value === 'Genie civil' || 
            department.name.value === 'Informatique' || 
            department.name.value === 'Business'))
        console.log(departments)
      }
    )
    .catch((err) => console.error(err));
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
 

  React.useEffect(() => {
    getDepartments();
  }, []);


//   const [search, setSearch] = React.useState("");

//   const handleSearch = (e) => {
//     setSearch(e.target.value);

//     if (e.target.value) {
//         setDepartments(
//         departments.filter((department) =>
//         department.name.value.toLowerCase().startsWith(e.target.value.toLowerCase())
//         )
//       );
//     } else getDepartments();
//   };


const searchDepartments= (e) => {
    axios.get(`http://localhost:8030/ws/departmentByName/${e.target.value}`).then((res) => {
        console.log(res.data)
        setDepartments(res.data);
        
      });
  }
  React.useEffect(() => {
    getDepartments()
  }, []);

  const handleChange=(e)=>{
    if(e.target.value===""){
      getDepartments();
    }else {
      searchDepartments(e);
    }
  }

  const searchDepartments2= (e) => {
    axios.get(`http://localhost:8030/ws/departmentByBloc/${e.target.value}`).then((res) => {
        console.log(res.data)
        setDepartments(res.data);
        
      });
  }
  React.useEffect(() => {
    getDepartments()
  }, []);

  const handleChange2=(e)=>{
    if(e.target.value===""){
      getDepartments();
    }else {
    searchDepartments2(e);
    }
  }


  return (
    <div>

            {/* <div className="search__input d-flex mb-5">
                  <Input
                    type="text"
                    placeholder="Search Departments..."
                    value={search}
                    onChange={handleSearch}
                  />
                   <span className="mt-1" style={{"transform" : "translateX(-30px)"}}>
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.6767 14.5454L11.0909 11.9597M13.0779 7.4935C13.0779 10.8287 10.3742 13.5324 7.03894 13.5324C3.70373 13.5324 1 10.8287 1 7.4935C1 4.15828 3.70373 1.45456 7.03894 1.45456C10.3742 1.45456 13.0779 4.15828 13.0779 7.4935Z"
                        stroke="#4FD1C5"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div> */}


    <div className="input-group rounded mb-5">
         
         <input
           onChange={handleChange}
           type="search"
           className="form-control rounded"
           placeholder="Search"
           aria-label="Search"
           aria-describedby="search-addon"
         />
         <span className="input-group-text border-0" id="search-addon">
           <i className="fas fa-search"></i>
         </span>
       </div>


       <div className="input-group rounded mb-5">
         
         <input
           onChange={handleChange2}
           type="search"
           className="form-control rounded"
           placeholder="Search By Department"
           aria-label="Search"
           aria-describedby="search-addon"
         />
         <span className="input-group-text border-0" id="search-addon">
           <i className="fas fa-search"></i>
         </span>
       </div>



      {/***Blog Cards***/}
      <Row>
        {/* {BlogData.map((blg, index) => ( */}
        {departments &&
          departments.map((department, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              {/* {courses && courses.map((course,index) => {
              
            })} */}
            <DepartmentCard
              image={bg1}
              id={department.ID.value}
              name={department.name.value}
              status={department.status.value}
              color={"primary"}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DepartmentPage;
