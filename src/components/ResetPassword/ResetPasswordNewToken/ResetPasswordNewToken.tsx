import React from "react";
import { resetPasswordNewToken } from "../../../services/Auth";
import NewToken from "../../commons/NewToken";

const ResetPasswordNewToken: React.FC = () => {

    return (
        <div>
            <NewToken
                endpoint={resetPasswordNewToken}
                openCollapseMessage="¿Olvidaste tu contraseña?"
                labelMessage="Reestablece tu contraseña"
            />
        </div>
    );
}

export default ResetPasswordNewToken;
