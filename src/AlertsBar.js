import { ReactSession } from "react-client-session";
import { useState } from "react";
import { Alert, Collapse } from "@mui/material";


const AlertsBar = (props) => {
  const page = props.page
  const [alertBought, setAlertBought] = useState(ReactSession.get("bought"));
  const [alertAdded, setAlertAdded] = useState(ReactSession.get("added"));
  const [alertBid, setAlertBid] = useState(ReactSession.get("bid"));
    return (
      <div className="alerts-bar">
        <Collapse in={alertBought}>
          <Alert
            onClose={() => {
              ReactSession.set("bought", false);
              setAlertBought(false);
            }}
          >
            Service is bought and in pending state now
          </Alert>
        </Collapse>

        <Collapse in={alertAdded}>
          <Alert
            onClose={() => {
              ReactSession.set("added", false);
              setAlertAdded(false);
            }}
          >
            {page === "Custom" ? "Custom " : ""} Service is Added and in pending state now
          </Alert>
        </Collapse>
        <Collapse in={alertBid}>
          <Alert
            onClose={() => {
              ReactSession.set("bid", false);
              setAlertBid(false);
            }}
          >
            bid is Added 
          </Alert>
        </Collapse>
      </div>
    );
}
 
export default AlertsBar;