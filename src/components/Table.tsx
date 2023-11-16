import React from "react";

function Table() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publish Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Row 1, Cell 1</td>
            <td>Row 1, Cell 2</td>
            <td>Row 1, Cell 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Table;
