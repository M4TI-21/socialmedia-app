import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RegisterStepTwo(props) {
  return (
    <div className="RegisterFormArea">
        <div className="secondStep">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={e => props.setName(e.target.value)}/>
              {props.errorMsg.name && <Form.Text className="errorMessage">{props.errorMsg.name}</Form.Text>}
            </Form.Group>
            <Form.Group>
              <Form.Label>User Tag</Form.Label>
              <Form.Control type="text" onChange={e => props.setTag(e.target.value)}/>
              {props.errorMsg.tag && <Form.Text className="errorMessage">{props.errorMsg.tag}</Form.Text>} 
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={e => props.setPass(e.target.value)}/>

              {props.errorMsg.pass && <Form.Text className="errorMessage">{props.errorMsg.pass}</Form.Text>}
            </Form.Group>
            <Button variant="primary" onClick={props.submitOnClick}>Register new account</Button>
            <Button variant="danger" onClick={()=> props.setActive("StepOne")}>Back</Button>
        </div>
    </div>
  );
}
