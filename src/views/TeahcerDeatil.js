import { Col, Row } from "reactstrap";

import axios from "axios";

import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import TeacherTable from "../components/dashboard/TeacherTable";
import { useEffect, useState } from "react";
import Blog from "../components/dashboard/Blog";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const TeacherDetail = () => {
  const [teachers, setTeachers] = useState([]);
  const getAllTeachers=()=>{
    axios.get(`http://localhost:8030/ws/teacher/all`).then((res) => {
      setTeachers(res.data);
    });
  }
  const searchTeachers= (e) => {
    axios.get(`http://localhost:8030/ws/tours/all/search/${e.target.value}`).then((res) => {
        setTeachers(res.data);
      });
  }
  useEffect(() => {
    getAllTeachers()
  }, []);

  const handleChange=(e)=>{
    if(e.target.value===""){
      getAllTeachers();
    }else {
      searchTeachers(e);
    }
  }

  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}

      {/***Table ***/}
      <Row>
        <div className="input-group rounded">
         
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
      </Row>
      <Row>
        <Col lg="12">
          <TeacherTable teachers={teachers} />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TeacherDetail;
