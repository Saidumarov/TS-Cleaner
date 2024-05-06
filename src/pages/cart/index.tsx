import {
  ChakraProvider,
  FormControl,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useServiceStore from "../../app/service/useServiceStore";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { Button, Input } from "antd";
import LoadingProduct from "../../components/loading";
import toast, { Toaster } from "react-hot-toast";
const Orders = () => {
  const { data, updateService, deleteService, loading } = useServiceStore();
  const [dataa, setDataa] = useState({
    id: "",
    name: "",
    owner_email: "",
    price: 0,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const deleteData = (id: string) => {
    const data = localStorage.getItem("tokenData");
    if (data) {
      const tokenData = JSON.parse(data);
      deleteService(id, tokenData.access_token);
      toast.error("Buyurtma o'chirildi");
    }
  };

  console.log(data);

  const editProduct = (el: any) => {
    setDataa({
      id: el.id,
      name: el.name,
      owner_email: "",
      price: el.price,
    });
    onOpen();
  };

  const handelChange = (name: string, value: any) => {
    setDataa({
      ...dataa,
      [name]: value,
    });
  };

  const Save = () => {
    const data = localStorage.getItem("tokenData");
    if (data) {
      const tokenData = JSON.parse(data);
      const obj = {
        ...dataa,
        owner_email: tokenData.email,
      };
      updateService(obj, tokenData.access_token);
    }
    onClose();
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {loading ? <LoadingProduct /> : null}
      <ChakraProvider>
        <Heading>Buyurtmalar</Heading>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your Service</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  onChange={(e) => handelChange(e.target.name, e.target.value)}
                  ref={initialRef}
                  placeholder="First name"
                  name="name"
                  required
                  value={dataa.name}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Price</FormLabel>
                <Input
                  onChange={(e) => handelChange(e.target.name, +e.target.value)}
                  type="number"
                  placeholder="Price"
                  name="price"
                  required
                  value={dataa.price}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter className="footer_modal">
              <Button
                onClick={Save}
                disabled={!dataa.name || !dataa.price}
                type="primary"
              >
                Update
              </Button>
              <Button type="dashed" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>
      <TableContainer sx={{ marginTop: 5 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((el, i) => (
              <TableRow
                key={el?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell> {el?.name}</TableCell>
                <TableCell>{el?.price}</TableCell>
                <TableCell>
                  <ChakraProvider>
                    <Button
                      style={{ backgroundColor: "red", color: "white" }}
                      onClick={() => deleteData(el?.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </ChakraProvider>
                </TableCell>
                <TableCell>
                  <ChakraProvider>
                    <Button type="primary" onClick={() => editProduct(el)}>
                      <EditOutlined />
                    </Button>
                  </ChakraProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
