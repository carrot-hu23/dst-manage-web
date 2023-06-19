import ModSubscribe from "../../Mod/ModSubscribe";

export default (props)=>{

    const {setModList} = props

    return(
        <>
            <ModSubscribe addModList={setModList} />
        </>
    )
}