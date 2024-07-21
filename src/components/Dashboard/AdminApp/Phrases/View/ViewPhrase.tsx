import CustomCollapse from "../../../../commons/CustomCollapse";
import useViewPhraseForm from "../../../../../hooks/Commons/useViewPhraseForm.ts";
import { GET_BANNER_PHRASES } from '../../../../../graphql/app/queries.ts';
import {useLazyQuery} from "@apollo/client";
import React, {useEffect} from "react";
import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Skeleton from "react-loading-skeleton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BannerPhrasesData, BannerPhrase } from '../../../../../types';

interface ViewPhraseProps {
    onEdit: (object: BannerPhrase) => void;
}

const ViewPhrase: React.FC<ViewPhraseProps> = (
    {
        onEdit
    }
) => {

    const {
        collapseOpen,
        setCollapseOpen
    } = useViewPhraseForm();

    const [getPhrases, {
        loading,
        data,
        error
    }] = useLazyQuery<BannerPhrasesData>(GET_BANNER_PHRASES);

    useEffect(() => {
        if (collapseOpen) {
            getPhrases().then(r => r);
        }
    }, [collapseOpen, getPhrases]);

    return (
      <div className="p-2 rounded-lg border-2 shadow-md">
          <CustomCollapse
              label="Ver frases"
              initialOpen={collapseOpen}
              onToggle={() => setCollapseOpen(!collapseOpen)}
          >
              {error && <p>Error al cargar frases {error.message}</p>}
              {loading ? (
                  <TableContainer>
                      <Table>
                          <TableHead>
                              <TableRow>
                                  <TableCell><Skeleton /></TableCell>
                                  <TableCell><Skeleton /></TableCell>
                                  <TableCell><Skeleton /></TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                                <TableRow>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                    <TableCell><Skeleton /></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
              ) : (
                  data && (
                      <TableContainer>
                          <Table>
                              <TableHead>
                                  <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Frase</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.bannerPhrases.map((phrase) => (
                                        <TableRow key={phrase.id}>
                                            <TableCell>{phrase.id}</TableCell>
                                            <TableCell>{phrase.phrase}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    onClick={() => onEdit(phrase)}
                                                    className="hover:text-purple1"
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    className="hover:text-purple1"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                  )
              )}
          </CustomCollapse>
      </div>
    )
}

export default ViewPhrase;
