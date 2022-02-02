import {h} from 'vue';
import TableAction from '@/components/BasicTable/TableAction.vue'


export const columns = [
  {title: '名称', key: 'name', align: 'center'},
  {title: '描述', key: 'desc', align: 'center'},
  {
    title: '封面', key: 'imgUrl', align: 'center',
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
    title: '预览链接', key: 'linkUrl', align: 'center',
    render({linkUrl}) {
      return h(
        'a',
        {
          href: linkUrl,
          target: '_blank'
        },
        {
          default: () => linkUrl
        }
      )
    }
  },
  {
    title: '源码链接', key: 'sourceUrl', align: 'center',
    render({sourceUrl}) {
      return h(
        'a',
        {
          href: sourceUrl,
          target: '_blank'
        },
        {
          default: () => sourceUrl
        }
      )
    }
  },
  {title: '排序', key: 'priority', align: 'center'}
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
