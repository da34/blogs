export default function Footer() {
  const date = new Date().getFullYear()
  return (
    <div className="text-gray-400" style={{ background: '#232323' }}>
      <footer className="xl:max-w-screen-xl m-auto text-center p-5">
        <div className="blog-info">
          <p>© {date} 玉捷 Code </p>
          <p>托管于腾讯云 | 使用七牛云对象存储</p>
          <a href="http://www.beian.miit.gov.cn" target="_blank" rel="noreferrer">桂ICP备2021002604号-1</a>
        </div>
      </footer>
    </div>
  )
}