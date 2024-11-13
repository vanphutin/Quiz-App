import "../assets/style/pages/_About.scss";
// src/pages/About.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaBootstrap,
  FaServer,
} from "react-icons/fa";
import {
  SiRedux,
  SiMaterialformkdocs,
  SiAxios,
  SiJsonwebtokens,
} from "react-icons/si";
import { TbStackMiddle } from "react-icons/tb";

const technologiesFE = [
  {
    name: "React",
    description:
      "Thư viện JavaScript mạnh mẽ để xây dựng giao diện người dùng.",
    icon: <FaReact size={50} color="#61dafb" />,
  },
  {
    name: "Redux",
    description: "Thư viện quản lý trạng thái ứng dụng trong React.",
    icon: <SiRedux size={50} color="#764abc" />,
  },
  {
    name: "Axios",
    description: "Thư viện giúp gửi các yêu cầu HTTP dễ dàng.",
    icon: <SiAxios size={50} color="#5a5a5a" />,
  },
  {
    name: "Material UI",
    description:
      "Một thư viện giao diện người dùng để xây dựng ứng dụng React dễ dàng và đẹp mắt.",
    icon: <SiMaterialformkdocs size={50} color="#007bff" />,
  },
  {
    name: "Bootstrap",
    description:
      "Thư viện CSS phổ biến để xây dựng giao diện người dùng responsive.",
    icon: <FaBootstrap size={50} color="#563d7c" />,
  },
];

const technologiesBE = [
  {
    name: "Node.js",
    description: "Nền tảng JavaScript giúp xây dựng server-side applications.",
    icon: <FaNodeJs size={50} color="#68a063" />,
  },
  {
    name: "Express",
    description:
      "Framework tối giản cho Node.js giúp phát triển ứng dụng web nhanh chóng.",
    icon: <FaServer size={50} color="#000000" />,
  },
  {
    name: "MySQL",
    description: "Hệ quản trị cơ sở dữ liệu quan hệ phổ biến.",
    icon: <FaDatabase size={50} color="#00618d" />,
  },
  {
    name: "JWT",
    description:
      "JSON Web Token, giải pháp xác thực bảo mật cho các ứng dụng web.",
    icon: <SiJsonwebtokens size={50} color="#00618d" />,
  },
  {
    name: "Multer",
    description:
      "Middleware để xử lý multipart/form-data, thường được sử dụng để upload file.",
    icon: <TbStackMiddle size={50} color="#00618d" />,
  },
];

const About = () => {
  return (
    <Container className="about-page">
      <h1 className="about-page__title">
        Các công nghệ tôi đã áp dụng trong dự án
      </h1>

      <h2 className="about-page__subtitle">Công nghệ Front-end</h2>
      <div className="about-page__content">
        {technologiesFE.map((tech, index) => (
          <Card
            key={index}
            className="about-page__card"
            style={{ "--card-index": index }}
          >
            <Card.Body className="about-page__card-body">
              <div className="about-page__icon-container">{tech.icon}</div>
              <Card.Title className="about-page__card-title">
                {tech.name}
              </Card.Title>
              <Card.Text className="about-page__card-text">
                {tech.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <h2 className="about-page__subtitle mt-5">Công nghệ Back-end</h2>
      <div className="about-page__content">
        {technologiesBE.map((tech, index) => (
          <Card key={index} className="about-page__card">
            <Card.Body className="about-page__card-body">
              <div className="about-page__icon-container">{tech.icon}</div>
              <Card.Title className="about-page__card-title">
                {tech.name}
              </Card.Title>
              <Card.Text className="about-page__card-text">
                {tech.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default About;
