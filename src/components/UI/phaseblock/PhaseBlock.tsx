import React, {FC} from 'react';
import style from './PhaseBlock.module.scss'

interface PhaseBlockProps{
    phaseNum:number
}
const PhaseBlock:FC<PhaseBlockProps> = ({phaseNum}) => {

    
  return (
    <div className={style.phaseBLock}>

        <div className={style.phaseBLock__cont}>

            <div className={phaseNum >= 1 ? style.phaseBLock__bar_1_active : style.phaseBLock__bar_1}></div>
            <div className={phaseNum >= 2 ? style.phaseBLock__bar_2_active : style.phaseBLock__bar_2}></div>
            <div className={phaseNum >= 3 ? style.phaseBLock__bar_3_active : style.phaseBLock__bar_3}></div>

        </div>

      
    </div>
  );
};

export default PhaseBlock;