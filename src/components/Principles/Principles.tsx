
import { useTranslation } from 'react-i18next';

import { FlippableCard } from './FlippableCard';

export const Principles = () => {
    const {t} = useTranslation()
    return (
        <div className="flex flex-col items-center gap-[5rem] mb-12" id='principles'>
            <h2 className="h3 md:text-[48px] text-primary dark:text-white self-center">{t('principles')}</h2>

            <div id="cocotinha" className="flex flex-wrap gap-12 md:gap-1 justify-between  w-full relative max-w-[957px]">
                <img src="prank.svg" alt="" className="absolute z-[1] bottom-[-105px] left-[-48px]" />

                <img src="prank.svg" alt="" className="absolute z-[1] top-[-55px] rotate-180 right-[-30px]" />
                <FlippableCard description={t('our-mission')} title={t('mission')} content={t('mission-statement')} img={"missao.png"} />
                <FlippableCard description={t('our-vision')} title={t('vision')} content={t('changing-world')} img={"missao.png"} />
                <FlippableCard description={t('our-values')} title={t('values')} content={t('commitment-to-excellence')} img={"missao.png"} />


            </div>
        </div>
    )
}