import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useState, createContext } from "react";
import "./App.css";
import data from "./data";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail";
import axios from "axios";
import Cart from './routes/Cart'

export const Context1 = createContext()


function App() {
  const [shoes, setShoes] = useState(data);
  const [quantity] = useState([10, 11, 12])
  const [num, setNum] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="#pricing">Mypage</Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="container">
                <div className="row">
                  {shoes.map((shoe, i) => {
                    return <Card shoes={shoes[i]} i={i + 1} key={i}></Card>;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  setNum(num + 1);
                  if (num == 0) {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((res) => {
                        const copy = [...shoes, ...res.data];
                        setShoes(copy);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (num == 1) {
                    axios
                      .get("https://codingapple1.github.io/shop/data3.json")
                      .then((res) => {
                        const copy = [...shoes, ...res.data];
                        setShoes(copy);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    alert("더이상 상품이 없습니다");
                  }

                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{quantity, shoes}}>
            <Detail shoes={shoes} />
          </Context1.Provider>
          } />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<p>박수빈</p>} />
          <Route path="location" element={<p>부산광역시</p>} />
        </Route>
        <Route path="*" element={<div>없는 페이지입니다</div>} />
        <Route path="/event" element={<EventPage />}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} />
          <Route path="two" element={<p>생일기념 쿠폰받기</p>} />
        </Route>
        <Route path="/cart" element={ <Cart/>} />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>회사정보</h2>
      <Outlet></Outlet>
    </div>
  );
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
