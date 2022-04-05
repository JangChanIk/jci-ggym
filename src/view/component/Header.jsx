import * as React from 'react';
import { Container, Navbar, Offcanvas } from 'react-bootstrap';
import Navi from './Navi';
import {LOGO, H1, navbarBrandStyles} from '../../styles/HeaderStyle';





const Header = () => {


  const [isToggled, setIsToggled] = React.useState(false);

  const toggle = () => {
    setIsToggled(prevIsToggled => !prevIsToggled)
  }
  const textWhite =  {
    fontSize: '18px', 
    fontWeight: 'bold',
    color:"white",
    width: '90px',
    textAlign: 'center',
    padding: '0px',
    textShadow: "0.2px 0 #4b4b4b, 0 0.2px #4b4b4b, 0.2px 0 #4b4b4b, 0.2px 0 #4b4b4b"
  }
  const textBlack =  {
    fontSize: '18px', 
    fontWeight: 'bold',
    color:"black",
    padding:"7px 0px 7px 0px"
  }


  return (
    <Navbar  variant='dark' collapseOnSelect style={{padding: 5, backgroundColor: "rgb(105, 175, 245)", width: "100%"}} expand="lg" onToggle={toggle}>
      <Container fluid>
        <Navbar.Brand style={navbarBrandStyles} href="/">
          <LOGO
              alt="로고"
              src="https://i.ibb.co/MMnmjjQ/images-1.png"
            />  
          <H1>GYM</H1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        {
          !isToggled ?
            <>
              <Navbar.Collapse id="responsive-navbar-nav">
                <Navi textStyle={textWhite}/>
              </Navbar.Collapse>
            </>
          :
            <>
              <Navbar.Offcanvas
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
                placement="end"
              >
                <Offcanvas.Body>
                  <Navi textStyle={textBlack}/>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </>
        }
      </Container>

    </Navbar>
  );
};
export default Header;
