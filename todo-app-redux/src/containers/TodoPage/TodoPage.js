import React from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../ducks/user.duck";
import { logout } from "../../ducks/auth.duck";
import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import TotalCompleteItems from "./TotalCompleteItems";

const TodoPage = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleLogout = () => {
    const { history } = props;
    dispatch(logout())
      .then(() => history.push("/login"))
      .catch(() => {});
  };

  return (
    <>
      <LogoutContainer>
        <h1>
          Todo App
          <CustomButton
            variant="contained"
            color="secondary"
            startIcon={<ExitToApp />}
            onClick={() => handleLogout()}
          >
            Logout
          </CustomButton>
        </h1>
      </LogoutContainer>
      <div className="container bg-white p-4 mt-5">
        <AddTodoForm />
        <TodoList />
        <TotalCompleteItems />
      </div>
    </>
  );
};

export default TodoPage;

/* Styled Components */

export const CustomButton = styled(Button)`
  margin-top: 20px;
  display: flex;
  float: right;
  color: white;
  text-align: center;
`;

export const LogoutContainer = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
`;
