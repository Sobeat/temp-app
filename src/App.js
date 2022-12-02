import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

const App = () => {
  return (
    <div>
      <h1>Basic Example</h1>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

const Layout = () => {
  return (
    <div>
      <hr />
      <Outlet />
    </div>
  );
}

const Home = () => {
  const [state, setState] = useState({
    name: '',
    info1: '',
    info2: '',
    info3: ''
  });
  const [result, setResult] = useState(null);

  return (
    <div>
      <h2>Home</h2>
      <Box display={"flex"}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
      >
        <TextField label="이름" variant="outlined" onChange={(e) => setState({...state, name: e.target.value})} value={state.name} />
        <TextField label="정보1" variant="outlined" onChange={(e) => setState({...state, info1: e.target.value})} value={state.info1} />
        <TextField label="정보2" variant="outlined" onChange={(e) => setState({...state, info2: e.target.value})} value={state.info2} />
        <TextField label="정보3" variant="outlined" onChange={(e) => setState({...state, info3: e.target.value})} value={state.info3} />
        <Button variant="contained" onClick={() => {
          if (state.name) {
            setResult(`http://domain.com/${state.name}/${state.info1}/${state.info2}/${state.info3}`);
          }
          else {
            alert("이름은 필수!")
          }
        }}>확인</Button>
        <Button variant="contained" onClick={() => {
          setResult(null);
          setState({
            name: '',
            info1: '',
            info2: '',
            info3: ''
          });
        }}>초기화</Button>
      </Box>
      <hr />
      <Box>
        <Typography variant="body1">
          {result &&
            <Box component={"p"}>링크 생성주소: <a href={result} target="_blank" rel="noreferrer">{result}</a></Box>
          }
        </Typography>
      </Box>
    </div>
  );
}


const NoMatch = () => {
  return (
    <div>
      <h2>404 Error</h2>
      <p>
        <Link to="/">Back Home</Link>
      </p>
    </div>
  );
}

export default App;
