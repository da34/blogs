import {h} from 'vue';
import TableAction from '@/components/BasicTable/TableAction.vue'

export const columns = [
  {title: '名称', key: 'name'},
  {title: '描述', key: 'desc'},
  {
    title: '封面', key: 'imgUrl',
    render({imgUrl}) {
      return h(
        'img',
        {
          src: imgUrl,
          style: 'width: 150px'
        }
      )
    }
  },
  {
    title: '链接', key: 'linkUrl', render({linkUrl}) {
      return h(
        'a',
        {
          href: linkUrl,
          target: '__blank'
        },
        {
          default: () => linkUrl
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
