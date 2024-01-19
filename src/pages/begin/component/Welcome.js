import {useTranslation} from "react-i18next";

const Welcome = () => {
    const { t } = useTranslation()
    return(
        <>
            <h3>{t('Welcome to dst-admin-web management platform')}</h3>
            <div>
                {/* <Image
                    width={200}
                    src="/assets/pig.fig"
                /> */}
                <img src="/assets/illustrations/illustration_login3.png" alt="login" />
            </div>
        </>
    )
}

export default Welcome