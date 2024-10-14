import { PeopleAltOutlined as PeopleAltOutlinedIcon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import CustomerForm from "../components/costumerForm";
import { CustomerTable } from "./customerTable";
const ClientPage = () => {
 return(
   <Box sx={{ m: 2 }}>
      <Box display="flex" alignItems="left" sx={{ color: "#2f2467", my: 4 }}>
        <PeopleAltOutlinedIcon sx={{ mr: 2, fontSize: 40 }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Clientes
        </Typography>
      </Box>
      <CustomerForm/>
      <CustomerTable/>
      </Box>
 )
};

export default ClientPage;
