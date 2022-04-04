import {useState, useEffect} from 'react';

// 获取横向，纵向滚动条位置
const getPosition = () => {
  return {x: document.body.scrollLeft, y: document.documentElement.scrollTop,};
};

const useScroll = () => {
  const [position, setPosition] = useState(getPosition());
  useEffect(() => {
    const handler = () => { setPosition(getPosition(document)); };
    // 监听滚动条，更新位置
    document.addEventListener("scroll", handler);
    return () => {
      // 组件销毁时，取消事件监听
      document.removeEventListener("scroll", handler);
    }
  }, [])

  return position
}

export default  useScroll