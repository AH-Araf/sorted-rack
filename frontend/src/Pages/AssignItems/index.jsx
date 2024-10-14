import React, { useState, useEffect, useMemo } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { Table, Toast, Container, Col, Form } from "react-bootstrap";
import { axiosSecure } from "../../api/axios";
import PaginationComponent from "../../component/Pagination/Pagination";

const AssignItem = () => {
  const [stock, setStock] = useState([]);
  const [search, setSearch] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [showToaster, setShowToaster] = useState(false);


  useEffect(() => {
    const getAllStockDetails = async () => {
      try {
        const response = await axiosSecure.get('/product', {
          headers: {
            Authorization: `Bearer ${localStorage.userDetails &&
              JSON.parse(localStorage.userDetails).token
              }`,
          },
        });
        setStock(response.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    getAllStockDetails();
  }, []);

  const handleUnassignment = async (product) => {
    try {
      await axiosSecure.patch(`/assignedProduct/updateProducts/${product._id}`, {
        tag: "notassigned", 
        assignedUserEmail: "" 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.userDetails &&
            JSON.parse(localStorage.userDetails).token
            }`,
        },
      });

      setShowToaster(true);

      setStock((prevStock) => prevStock.map((item) =>
        item._id === product._id
          ? { ...item, tag: "notassigned", assignedUserEmail: "" }
          : item
      ));

    } catch (err) {
      console.error("Error unassigning the product:", err);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filtered = useMemo(() => {
    let filteredResult = stock.filter(item => item.tag === "assigned"); 

    setTotalItems(filteredResult?.length);

    if (search) {
      filteredResult = filteredResult.filter((result) =>
      (result?.accessoriesName?.toLowerCase().includes(search.toLowerCase()) ||
        result?.systemName?.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return filteredResult?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [currentPage, stock, search]);

  return (
    <Container>
      <div className="d-flex align-items-center justify-content-between">
        <div className="col-9">
          <h2 className="py-3">Assigned Devices</h2>
        </div>
        <Form.Group as={Col} md="2" className="pe-3" controlId="validationCustom01">
          <Form.Control onChange={handleSearch} type="text" placeholder="Search devices" />
        </Form.Group>
      </div>

      <Toast
        className="toaster-position"
        onClose={() => setShowToaster(!showToaster)}
        show={showToaster}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <div className="info-container">
            <BiCheckCircle className="info-icon" />
            &nbsp;
          </div>
          <div className="toaster-title">
            <strong className="me-auto">Unassignment Successful</strong>
          </div>
        </Toast.Header>
      </Toast>

      {filtered?.length > 0 ? (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th className="text-start">Product Category</th>
              <th className="text-start">Product Type</th>
              <th className="text-start">Assigned User Email</th>
              <th className="text-start">Accessories/System Name</th>
              <th className="text-start">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {filtered.map((item, index) => (
              <tr key={index}>
                <td className="text-start">{item.productCategory || "---"}</td>
                <td className="text-start">{item.productType || "---"}</td>
                <td className="text-start">{item.assignedUserEmail || "---"}</td>
                <td className="text-start">
                  {item.accessoriesName || item.systemName || "---"}
                  &nbsp;&nbsp;
                </td>
                <td className="text-start">
                  <i
                    className="bi bi-person-dash-fill px-1"
                    title="Unassign"
                    onClick={() => handleUnassignment(item)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h4 className="ms-3 mt-3">No assigned devices found...</h4>
      )}
      <div className="d-flex justify-content-end me-3">
        <PaginationComponent
          total={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Container>
  );
};

export default AssignItem;
