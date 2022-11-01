import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  CardText,
  ModalFooter,
} from "reactstrap";

const SchoolTable = (props) => {
  const { schools,departments1 } = props;
  const [open, setOpen] = useState(false);
  const [openDepar, setOpendepar] = useState(false);
  const [school, setSchool] = useState({});
  const [departments, setdpartments] = useState([]);
  const handleGetSchool = (email) => {
    axios
      .get(`http://localhost:8030/ws/school/getbyemail/${email}`)
      .then((res) => {
        setSchool(res.data[0]);
      });
  };
  const handleGetDepartment = (name) => {
    axios
      .get(`http://localhost:8030/ws/school/getdepartmentbyschool/${name}`)
      .then((res) => {
        setdpartments(res.data);
      });
  };
  const toogleDepartment = () => {
    setOpendepar((prevOpen) => !prevOpen);
  };
  const toogle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Schools Listing</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Overview of the schools
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>Id </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Adress</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={
                            "https://th.bing.com/th/id/OIP.LRHeuQYucogSGIUPNIrMvwHaD4?pid=ImgDet&rs=1"
                          }
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{tdata.ID.value}</h6>
                        </div>
                      </div>
                    </td>
                    <td>{tdata.name.value}</td>
                    <td>{tdata.Email.value}</td>

                    <td>{tdata.Adress.value}</td>
                    <td>
                      <Button
                        className="btn"
                        onClick={() => {
                          handleGetSchool(tdata?.Email?.value);
                          toogle();
                        }}
                        outline
                        color="info"
                      >
                        Show School
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="btn"
                        onClick={() => {
                          handleGetDepartment(tdata?.name?.value);
                          toogleDepartment();
                        }}
                        outline
                        color="info"
                      >
                        Show Departments
                      </Button>
                    </td>
                    <td>
                      <div className="d-flex justify-content-evenly">
                        <Button className="btn" outline color="info">
                          {" "}
                          <i className="bi bi-pencil-fill"></i>
                        </Button>

                        <Button className="btn" outline color="danger">
                          {" "}
                          <i className="bi bi-trash"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <div>
        <Modal isOpen={open}>
          <ModalHeader>{school?.name?.value}</ModalHeader>
          <Card
            style={{
              width: "18rem",
            }}
          >
            <CardBody>
              <CardTitle tag="h5">{school?.Adress?.value}</CardTitle>
              <CardText> {school?.Email?.value}</CardText>
            </CardBody>
          </Card>
          <ModalFooter>
            <Button color="secondary" outline onClick={toogle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal isOpen={openDepar}>
          <ModalHeader>Departments</ModalHeader>
          <Card
            style={{
              width: "18rem",
            }}
          >
            <CardBody>
              <Table striped>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {departments?.map((r, index) => (
                    <tr key={index}>
                      <td>{r?.ID?.value}</td>
                      <td>{r?.name?.value}</td>
                      <td>{r?.status?.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <ModalFooter>
            <Button color="secondary" outline onClick={toogleDepartment}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default SchoolTable;
