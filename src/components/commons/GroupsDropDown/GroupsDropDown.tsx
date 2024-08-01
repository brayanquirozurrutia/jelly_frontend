import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Select, MenuItem, CircularProgress, FormControl, InputLabel } from '@mui/material';
import { GroupType, GroupsData } from "../../Dashboard/Groups/group.types.ts";
import {GET_GROUPS_WITHOUT_PAGINATION} from "../../../graphql/products/queries.ts";

interface GroupsDropDownProps {
    selectedGroup?: GroupType | null;
    onSelectGroup: (group: GroupType | null) => void;
}

const GroupsDropDown: React.FC<GroupsDropDownProps> = ({ selectedGroup, onSelectGroup }) => {
    const [getGroups, { loading, error, data }] = useLazyQuery<GroupsData>(GET_GROUPS_WITHOUT_PAGINATION);
    const [groups, setGroups] = useState<GroupType[]>([]);

    useEffect(() => {
        getGroups().then(r => r);
    }, [getGroups]);

    useEffect(() => {
        if (data) {
            setGroups(data.listGroupsWithoutPagination);
        }
    }, [data]);

    if (loading) return <CircularProgress />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <FormControl fullWidth>
            <InputLabel id="groups-dropdown-label">Selecciona un grupo</InputLabel>
            <Select
                labelId="groups-dropdown-label"
                value={selectedGroup?.id || ''}
                onChange={(e) => {
                    const selectedId = e.target.value as string;
                    const selected = groups.find(group => group.id === selectedId) || null;
                    onSelectGroup(selected);
                }}
            >
                <MenuItem value="">
                    <em>Selecciona un grupo</em>
                </MenuItem>
                {groups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                        {group.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default GroupsDropDown;
