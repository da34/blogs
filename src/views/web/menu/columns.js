import {h} from "vue";
import {NTag,NIcon} from "naive-ui";
import TableAction from '@/components/BasicTable/TableAction.vue'

export const columns = [
  {title: '名称', key: 'name'},
  {
    title: '图标', key: 'icon',
    render({icon}) {
      const iconDom = h('div', {

        }
      )
      return h(
        NIcon,
        null,
        {
          default: () => icon
        }
      )
    }
  },
  {title: '路径', key: 'url'},
  {
    title: '打开方式', key: 'target',
    render({target}) {
      return h(
        NTag,
        null,
        {
          default: () => target
        }
      )
    }
  },
  {
    title: '状态', key: 'status',
    render({status}) {
      return h(
        NTag,
        {
          type: status ? 'success' : 'error'
        },
        {
          default: () => status ? '启用' : '禁用'
        }
      )
    }
  },
  {title: '排序', key: 'priority'}
]

export const createActionColumn = ({handleDel, handleEdit}) => {
  return {
    width: 150,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: createActions(record, handleDel, handleEdit),
      });
    }
  }
}

function createActions(record, handleDel, handleEdit) {
  return [
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record),
    },
    {
      label: '删除',
      onClick: handleDel.bind(null, record),
    },
  ]
}
