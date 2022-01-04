import { ReactSession } from "react-client-session";
import { useState } from "react";
import { Alert, Collapse } from "@mui/material";


const AlertsBar = () => {
  const [alertBought, setAlertBought] = useState(ReactSession.get("bought"));
    const [alertAdded, setAlertAdded] = useState(ReactSession.get("added"));
    
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
            Service is Added and in pending state now
          </Alert>
        </Collapse>
      </div>
    );
}
 
export default AlertsBar;