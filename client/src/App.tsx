import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginForm from './components/Form/LoginForm/LoginForm';
import Lobby from './components/Lobby/Lobby';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { auth, selectIsAuth, selectIsInRoom } from './store/users/usersSlice';
import Layout from './components/Layout/Layout';
import RoomComponent from './components/Room/Room';
import http from './http';
import { useEffect } from 'react';
import NotFound from './components/UI/404';

function App() {
  const isAuth = useSelector(selectIsAuth);
  const isInRoom = useSelector(selectIsInRoom);
  const dispatch = useDispatch();

  useEffect(() => {
    http
      .get('/isAuth')
      .then(resp => {
        if (resp.data.username) {
          dispatch(
            auth({ username: resp.data.username, roomId: resp.data.roomId })
          );
        }
      })
      .catch(error => console.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props => {
          // return isAuth ? (
          //   isInRoom ? (
          //     <Layout
          //       child={<RoomComponent roomId={isInRoom} />}
          //       route={props}
          //     />
          //   ) : (
          //     <Layout child={<Lobby />} route={props} />
          //   )
          // ) : (
          //   <Redirect exact to="/auth" />
          // );
          return isAuth ? (
            <Layout child={<Lobby />} route={props} />
          ) : (
            <Redirect exact to="/auth" />
          );
        }}
      />
      <Route
        exact
        path="/rooms/:id"
        render={props => {
          return isAuth ? (
            <Layout child={<RoomComponent />} route={props} />
          ) : (
            <Redirect exact to="/auth" />
          );
        }}
      />
      <Route
        path="/auth"
        render={props => {
          return !isAuth ? <LoginForm {...props} /> : <Redirect exact to="/" />;
        }}
      />
      <Route
        path="/404"
        render={props => {
          return <NotFound {...props} />;
        }}
      />
    </Switch>
  );
}

export default App;
