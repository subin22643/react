import { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "../App.css";
import { Context1 } from './../App.js'

const YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

function Detail(props) {
  // const [count, setCount] = useState(0);
  const [alarm, setAlarm] = useState(true);
  const [num, setNum] = useState("");
  const [tab, setTab] = useState(0);

  const [fade1, setFade1] = useState("");

  const { quantity, shoes } = useContext(Context1)

  useEffect(() => {
    setTimeout(() => {
      setFade1("end");
    }, 100);
    return () => {
      setFade1("");
    };
  }, []);

  useEffect(() => {
    if (isNaN(num) == true) {
      alert("숫자만 입력하세요");
    }
  }, [num]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlarm(false);
    }, 2000);
    return () => {
      // 기존 타이머 제거하는 코드 (기존 코드를 치우는걸 많이 작성함)
      clearTimeout(timer);
    };
  });

  const { id } = useParams();
  const product = props.shoes.find(function (x) {
    return x.id == id;
  });

  return (
    <div className={'container start ' + fade1}>
      {alarm == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      {/* {count}
      <YellowBtn
        onClick={() => {
          setCount(count + 1);
        }}
        bg="blue"
      >
        버튼
      </YellowBtn> */}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h3>
            수량 입력란{" "}
            <input
              onChange={(e) => {
                setNum(e.target.value);
              }}
            ></input>
          </h3>
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{props.shoes[id].price}</p>
          <button className="btn btn-primary">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={() => setTab(0)}>
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={() => setTab(1)}>
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={() => setTab(2)}>
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabComponent tab={tab} />
    </div>
  );

  // props 귀찮으면 props 명 그대로 써도됨
  function TabComponent({ tab }) {
    // if (tab == 0) {
    //   return <div>내용0</div>;
    // } else if (tab == 1) {
    //   return <div>내용1</div>;
    // } else if (tab == 2) {
    //   return <div>내용2</div>;
    // }
    const [fade, setFade] = useState("");
    const { quantity, shoes } = useContext(Context1)

    useEffect(() => {
      setTimeout(() => {
        setFade("end");
      }, 100);
      return () => {
        setFade("");
      };
    }, [tab]);

    return (
      <div className={"start " + fade}>
        {[<div>{quantity}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
      </div>
    );
  }
}

export default Detail;
