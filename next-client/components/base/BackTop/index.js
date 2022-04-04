import {scrollTo} from 'utils/scrollTop';
import useScroll from 'hooks/useScroll'
import {CSSTransition} from 'react-transition-group';
import backTopStyle from './backTop.module.css'
import {useState} from 'react';

export default function BackTop({visibilityHeight = 300}) {
  const {y} = useScroll()
  // const [visible, setVisible] = useState(false)

  // 返回顶部，并添加起飞动画
  function handleTo() {
    scrollTo(0)
  }
  // setVisible()
  //
  return (
    <CSSTransition in={y > visibilityHeight}>
      <div
        className={
          backTopStyle.backWrapper + ' ' +
          backTopStyle.sky +
          ' hidden md:block cursor-pointer fixed right-10 bottom-28 z-50'}
        onClick={handleTo}
      />
    </CSSTransition>
  )
}