import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

function TableData({ data }) {
  const user = useSelector((state) => state.user.account);

  const formatDay = (str) => {
    const date = str.substr(0, 10); // "YYYY-MM-DD"
    const [year, month, day] = date.split("-"); // Split by "-"
    return `${day}-${month}-${year}`; // Reorder to "DD-MM-YYYY"
  };

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Index</th>
          <th>Title</th>
          <th>Description</th>
          {user && user.role === "admin" && <th>Created by</th>}
          <th>Category name</th>
          <th>Level</th>
          <th>Created at</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={index} className="text-light">
              <td>{index}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              {user && user.role === "admin" && (
                <td>
                  @<i>{item.username}</i>
                </td>
              )}
              <td>{item.category_name}</td>
              <td>{item.level}</td>
              <td>{formatDay(item.created_at)}</td>
              <td className="">
                <button type="button" className="btn btn-info btn-sm w-100">
                  Edit
                </button>
                <button type="button" className="btn btn-danger btn-sm w-100">
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default TableData;
