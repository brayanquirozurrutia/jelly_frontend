import React from "react";
import {activateAccountNewToken} from "../../../services/Auth";
import NewToken from "../../commons/NewToken";

const ActivateAccountNewToken: React.FC = () => {
    return (
        <div className="w-full pt-4">
            <NewToken
                endpoint={activateAccountNewToken}
                openCollapseMessage="¿No recibiste el correo?"
                labelMessage="Reenviar correo"
            />
        </div>
    );
}

export default ActivateAccountNewToken;
