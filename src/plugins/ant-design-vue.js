import Vue from 'vue'
import { Button, Form, Row, Col, Tag, Divider, Input, Empty, Icon, message } from 'ant-design-vue'

Vue.use(Button)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Input)
Vue.use(Input.TextArea)
Vue.use(Empty)
Vue.use(Icon)

Vue.prototype.$message = message
