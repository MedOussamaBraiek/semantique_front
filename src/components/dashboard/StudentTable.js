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
  Input,
} from "reactstrap";

const StudentTable = ({ students }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">Students year 2022</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              the Students
            </CardSubtitle>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              <thead>
                <tr>
                  <th>First Name </th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Adress</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {students.map((tdata, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={
                            "https://lwlies.com/wp-content/uploads/2017/04/avatar-2009-1108x0-c-default.jpg"
                          }
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{tdata.First_Name.value}</h6>
                        </div>
                      </div>
                    </td>
                    <td>{tdata.Last_Name.value}</td>
                    <td>{tdata.Email.value}</td>

                    <td>{tdata.Adress.value}</td>
                    <td>{tdata.Age.value}</td>

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
    </>
  );
};

export default StudentTable;
