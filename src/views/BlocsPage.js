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

import BlocsCard from "../components/dashboard/BlocsCard";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import axios from "axios";

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

const BlocsPage = () => {

  const baseUlr = "http://localhost:8030/ws/blocs/all"

  const [blocs, setBlocs] = React.useState([]);

  const [name, setName] = React.useState("");

  const getBlocs = () => {
    // fetch(baseUlr)
    // .then((response) => response.json())
    axios.get(baseUlr)
    .then((response) => {
        console.log(response)
        setBlocs(response.data.filter(bloc => bloc.name.value === 'IJK' || bloc.name.value === 'FEG' || bloc.name.value === 'ABC'))
        console.log(blocs)
      }
    )
    .catch((err) => console.error(err));
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
 

  React.useEffect(() => {
    getBlocs();
  }, []);

//   const Teacher = () => {
//     const [teachers,setTeachers]=useState([]);
//       useEffect(() => {
//         axios.get(http://localhost:8030/ws/teacher/all)
//             .then(res => {
//               console.log(res.data )
//               setTeachers(res.data)
           
//             })
//       }, [])


const [search, setSearch] = React.useState("");
const [searchD, setSearchD] = React.useState("");

const handleSearch = (e) => {
  setSearch(e.target.value);

  const baseUlr2 = "http:localhost:8030/ws/departmentByName/"

  if (e.target.value) {
      setBlocs(
      blocs.filter((bloc) =>
      bloc.name.value.toLowerCase().startsWith(e.target.value.toLowerCase())
      )
    );
  } else getBlocs();
};

const searchBlocs= (e) => {
    axios.get(`http://localhost:8030/ws/blocByDepartment/${e.target.value}`).then((res) => {
        console.log(res.data)
        setBlocs(res.data);
        
      });
  }
  React.useEffect(() => {
    getBlocs()
  }, []);

  const handleChange=(e)=>{
    if(e.target.value===""){
      getBlocs();
    }else {
        searchBlocs(e);
    }
  }

    
  


  return (
    <div>

<div className="search__input d-flex mb-4">
                  <Input
                    type="text"
                    placeholder="Search By Name..."
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
                </div>

<div className="input-group rounded mb-5">
         
         <input
           onChange={handleChange}
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
        {blocs &&
          blocs.map((bloc, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              {/* {courses && courses.map((course,index) => {
              
            })} */}
            <BlocsCard
              image={bg1}
              id={bloc.ID.value}
              name={bloc.name.value}
              status={bloc.status.value}
              color={"primary"}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlocsPage;
