import React from "react";
import BaseMain from "../Commons/BaseMain";
import { createGroup, deleteGroup, updateGroup } from "../../../services/Product";
import { GET_GROUPS } from "../../../graphql/products/queries.ts";

const GroupMain: React.FC = () => {
    return (
        <div>
            <BaseMain
                componentName="Grupo"
                createEndpoint={createGroup}
                deleteEndpoint={deleteGroup}
                viewEndpoint={GET_GROUPS}
                listObjects="listGroups"
                totalObjects="totalGroups"
                editEndpoint={updateGroup}
            />
        </div>
    );
}

export default GroupMain
