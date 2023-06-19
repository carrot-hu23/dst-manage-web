import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


import _ from "lodash";
import ModSelect from "../../Mod/ModSelect";

import {workShopConfigMap} from "../../../utils/dstUtils";
import {getMyModInfoList} from "../../../api/modApi";


export default (props) => {
    // formCluster.getFieldValue().modData
    const {modoverrides,modList, setModList } = props
    const [root, setRoot] = useState({})
    const {cluster} = useParams()
    useEffect(() => {
        getMyModInfoList(cluster)
            .then(data => {
                const object = {}
                const workshopMap = workShopConfigMap(modoverrides)
                data.data.forEach(mod => {
                    const {modid} = mod
                    const options = mod.mod_config.configuration_options
                    if (options !== undefined && options !== null) {
                        options.forEach(item => {
                            if (item.default !== '') {
                                _.set(object, `${modid}.${item.name}`, item.default)
                            }
                        })
                    }
                    if (workshopMap.has(modid)) {
                        mod.enable = true
                    } else {
                        workshopMap.set(modid, object[modid])
                    }
                });
                // setDefaultValuesMap(workshopMap)
                setModList(data.data || [])
                setRoot(object)
            }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <>
            <ModSelect
                modList={modList}
                setModList={setModList}
                root={root}
                setRoot={setRoot}
                defaultValuesMap={workShopConfigMap(modoverrides)}
            />
        </>
    )
}