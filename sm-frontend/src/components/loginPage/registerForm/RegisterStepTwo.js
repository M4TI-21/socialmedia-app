import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './registerFormStyle.css';

export default function RegisterStepTwo(props) {

  return (
      <Form className="regform">
          <Form.Group className="nameGroup">
            <Form.Control className="input name mx-auto" placeholder="Name" type="text" onChange={e => props.setName(e.target.value)}/>
            {props.errorMsg.name && <Form.Text className="errorMessage">{props.errorMsg.name}</Form.Text>}
          </Form.Group>

          <Form.Group className="tagGroup">
            <Form.Control className="input tag mx-auto" placeholder="User tag" type="text" onChange={e => props.setTag(e.target.value)}/>
            {props.errorMsg.tag && <Form.Text className="errorMessage">{props.errorMsg.tag}</Form.Text>} 
          </Form.Group>

          <Form.Group className="passGroup">
            <Form.Control className="input pass mx-auto" placeholder="Password" type="password" onChange={e => props.setPass(e.target.value)}/>
            {props.errorMsg.pass && <Form.Text className="errorMessage">{props.errorMsg.pass}</Form.Text>}
          </Form.Group>
          <Form.Group className="btnGroup">
            <Button className="submitBtn d-flex align-items-center justify-content-center" onClick={props.submitOnClick}>Register</Button>
            <Button variant="danger" onClick={()=> props.setActive("StepOne")}>Back</Button>
          </Form.Group>
      </Form>
  );
}
