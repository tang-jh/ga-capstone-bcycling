import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListTable = (props) => {
  const { fields, tableData, baseLink, click } = props;
  console.log(tableData);

  return (
    <Table hover>
      <thead>
        <tr>{fields ? fields.map((item) => <th>{item}</th>) : ""}</tr>
      </thead>
      <tbody>
        {tableData.length > 0
          ? tableData.map((row) => (
              <tr
                onClick={
                  click
                    ? () => {
                        click(row);
                      }
                    : () => {}
                }
              >
                {fields.map((elem) => (
                  <td>
                    <Link to={`${baseLink}${row.id}`}> {row[elem]}</Link>
                  </td>
                ))}
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
};

export default ListTable;
