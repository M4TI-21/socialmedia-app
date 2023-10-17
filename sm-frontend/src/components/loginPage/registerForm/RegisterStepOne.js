import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './registerFormStyle.css';

export default function RegisterStepOne(props) {
  return (
      <Form className="regform">
          <Form.Group className="emailGroup">
              <Form.Control className="input email" placeholder="Email" type="text" onChange={e => props.setEmail(e.target.value)}/>
              {props.errorMsg.email && <Form.Text className="errorMessage">{props.errorMsg.email}</Form.Text>}
          </Form.Group>

          <Form.Group className="dobGroup">
              <Form.Control className="input dob" placeholder="Date of birth" type="date" onChange={e => props.setDob(e.target.value)}/>
              {props.errorMsg.dob && <Form.Text className="errorMessage">{props.errorMsg.dob}</Form.Text>}
          </Form.Group>
          
          <Button className="submitBtn d-flex align-items-center justify-content-center" onClick={props.continueOnClick}>Continue</Button>
      </Form>
  );
}
    