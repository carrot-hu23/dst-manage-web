import ModSearch from "../../Mod/modSearch";

export default (props)=>{

    const {setModList} = props

    return(
        <>
            <ModSearch addModList={setModList} />
        </>
    )
}