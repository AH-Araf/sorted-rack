import React from "react";
import { Routes, Route } from "react-router-dom";
import StockProvider from "./contexts/StockContext";
import {
  Layout,
  LoginForm,
  PageNotFound,
  Dashboard,
  Allitems,
  Request,
  AddUser,
  ListUser,
  EditUser,
  ListStock,
  AddStock,
  EditSystemDetails,
} from "./Pages";

import AssignItem from "./Pages/AssignItems";
import AdminTicket from "./Pages/Ticket/AdminTicket/AdminTicket";
import ViewFullTicket from "./Pages/Ticket/AdminTicket/ViewFullTicket";
import ViewFullTicketUserSide from "./Pages/Ticket/UserTicket/ViewFullTicketUserSide";
import UserTicketPart from "./Pages/Ticket/UserTicket/UserTicketPart";
import Archive from "./Pages/Ticket/AdminTicket/Archive";
import Statistics from "./Pages/Ticket/AdminTicket/Statistics/Statistics";
import { AdminRoute, SuperAdminRoute } from "./component/Authentication/MainAuth";


function App() {
  return (
    <StockProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="stock" element={<AdminRoute> <ListStock /> </AdminRoute>} />
          <Route path="stock/add" element={<AdminRoute > <AddStock /> </AdminRoute>} />
          <Route path="stock/edit/:id" element={<AdminRoute> <EditSystemDetails /> </AdminRoute>} />
          {/* <Route path="allitems" element={<Allitems />} /> */}
          {/* <Route path="request" element={<Request />} /> */}
          <Route path="user/add" element={<SuperAdminRoute> <AddUser /> </SuperAdminRoute>} />
          <Route path="user" element={<SuperAdminRoute> <ListUser /></SuperAdminRoute>} />
          <Route path="user/edit/:id" element={<SuperAdminRoute><EditUser /></SuperAdminRoute>} />
          <Route path="assigned/" element={<AdminRoute><AssignItem /></AdminRoute>} />
          <Route path="adminTicket/" element={<AdminRoute><AdminTicket /></AdminRoute>} />
          <Route path="userTicketPart/" element={<UserTicketPart />} />

          <Route path="adminTicket/details/:id" element={<AdminRoute><ViewFullTicket /></AdminRoute>} />
          <Route path="userTicketPart/details/:id" element={<ViewFullTicketUserSide />} />

          <Route path="adminTicket/archiveTickets" element={<AdminRoute><Archive /></AdminRoute>} />
          <Route path="Statistics/" element={<AdminRoute><Statistics /></AdminRoute>} />



        </Route>

        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      
    </StockProvider>
  ); 
}

export default App;
