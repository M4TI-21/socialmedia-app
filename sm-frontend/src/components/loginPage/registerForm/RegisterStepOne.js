import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


export default function RegisterStepOne(props) {
  return (
    <div className="RegisterFormArea">
        <div className="firstStep">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" onChange={e => props.setEmail(e.target.value)}/>
              {props.errorMsg.email && <Form.Text className="errorMessage">{props.errorMsg.email}</Form.Text>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of birth</Form.Label>
              <Form.Control type="date" onChange={e => props.setDob(e.target.value)}/>
              {props.errorMsg.dob && <Form.Text className="errorMessage">{props.errorMsg.dob}</Form.Text>}
            </Form.Group>
            <Button variant="primary" onClick={props.continueOnClick}>Continue</Button>
            <Button variant="secondary"><Link to="/">Back</Link></Button>
        </div>
    </div>
  );
}
