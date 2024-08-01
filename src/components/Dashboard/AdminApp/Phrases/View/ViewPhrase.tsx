import CustomCollapse from "../../../../commons/CustomCollapse";
import useViewPhraseForm from "../../../../../hooks/Commons/useViewPhraseForm.ts";
import { GET_BANNER_PHRASES } from '../../../../../graphql/app/queries.ts';
import {useLazyQuery} from "@apollo/client";
import React, {useEffect} from "react";
import { BannerPhrasesData, BannerPhrase } from "./ViewPhrase.types.ts"
import SkeletonTable from "../../../../commons/SkeletonTable";
import TableCRUD from "../../../../commons/TableCRUD";
import {ViewNewObjectProp} from "../../../../../types";

const ViewPhrase: React.FC<ViewNewObjectProp<BannerPhrase>> = (
    {
        onEdit,
        refreshTable,
        onDelete
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
    }] = useLazyQuery<BannerPhrasesData>(GET_BANNER_PHRASES, {
        fetchPolicy: 'cache-and-network'
    });

    useEffect(() => {
        if (collapseOpen || refreshTable) {
            getPhrases().then(r => r);
        }
    }, [collapseOpen, refreshTable, getPhrases]);

    const columnNames = ['ID', 'Frase'];
    const columnKeys: (keyof BannerPhrase)[] = ['id', 'phrase'];

    return (
      <div className="p-2 rounded-lg border-2 shadow-md">
          <CustomCollapse
              label="Ver frases"
              initialOpen={collapseOpen}
              onToggle={() => setCollapseOpen(!collapseOpen)}
          >
              {error && <p>Error al cargar frases {error.message}</p>}
              {loading ? (
                    <SkeletonTable columnCount={columnNames.length + 1} />
              ) : (
                  data && (
                      <TableCRUD<BannerPhrase>
                          columnNames={columnNames}
                          columnKeys={columnKeys}
                          data={data.bannerPhrases}
                          onEdit={onEdit}
                          onDelete={onDelete}
                      />
                  )
              )}
          </CustomCollapse>
      </div>
    )
}

export default ViewPhrase;
