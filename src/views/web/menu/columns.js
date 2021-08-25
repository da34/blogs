import {h} from "vue";
import {NButton, NSwitch, NTag, NAvatar, NSpace} from "naive-ui";
import TableAction from '@/components/BasicTable/TableAction.vue'

export const columns = [
  {type: 'selection', key: 'selection'},
  {title: '序号', key: 'number', render: (row, index) => index + 1},
  {title: '名称', key: 'name'},
  {title: '图标', key: 'icon'},
  {title: '打开方式', key: 'target',
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
  {title: '排序', key: 'priority'}
]

export const createActionColumn = ({handleDel}) => {
  return {
    width: 150,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: createActions(record, handleDel),
      });
    }
  }
}

function createActions(record, handleDel) {
  return [
    {
      label: '删除',
      onClick: handleDel.bind(null, record),
    }
  ]
}
