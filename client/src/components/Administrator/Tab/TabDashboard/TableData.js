import Table from "react-bootstrap/Table";
import "./__TableData.scss";
function TableData(props) {
  const user = props.data;

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Index</th>
            <th>Username</th>
            <th>Last Name</th>
            <th>First name</th>
            <th>School</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user &&
            user.map((item, index) => (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.lastname}</td>
                <td>{item.firstname}</td>
                <td>{item.school}</td>
                <td>{item.email}</td>
                <td>{item.gender ? "Male" : "Female"}</td>
                <td>{item.role}</td>

                <td className="d-flex">
                  <button type="button" className="btn btn-dark">
                    View
                  </button>

                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default TableData;
