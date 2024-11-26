import {useTranslation} from "react-i18next";

const langs = {
    en: {nativeName: 'English'},
    zh: {nativeName: '中文'}
};

export default () => {
    const {i18n} = useTranslation();
    return (
        <div>
            <select
                onChange={(evt) => {
                i18n.changeLanguage(evt.target.value)
                console.log(evt.target.value)
            }}>
                {Object.keys(langs).map((lng) => (
                    <option key={lng} value={lng} label={langs[lng].nativeName}
                            style={{fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal'}}/>
                ))}
            </select>
        </div>
    );
}