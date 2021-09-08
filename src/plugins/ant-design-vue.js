import Vue from 'vue'
// import Button from 'ant-design-vue/lib/button'
// import Steps from 'ant-design-vue/lib/steps'
// import Form from 'ant-design-vue/lib/form'
// import Input from 'ant-design-vue/lib/input'
import { Button, Form, Row, Col, Tag, Divider, Input, Empty, message } from 'ant-design-vue'

Vue.use(Button)
Vue.use(Form)
Vue.use(Form.Item)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Input)
Vue.use(Input.TextArea)
Vue.use(Empty)

Vue.prototype.$message = message
