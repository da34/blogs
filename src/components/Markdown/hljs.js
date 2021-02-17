import hljs from 'highlight.js/lib/core'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import stylus from 'highlight.js/lib/languages/stylus'
import sql from 'highlight.js/lib/languages/sql'
import css from 'highlight.js/lib/languages/css'
import nginx from 'highlight.js/lib/languages/nginx'
import shell from 'highlight.js/lib/languages/shell'

hljs.registerLanguage('js', javascript)
hljs.registerLanguage('stylus', stylus)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('css', css)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('xml', xml)

export default hljs
