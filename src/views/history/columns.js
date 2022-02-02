import {h} from 'vue';
import TableAction from '@/components/BasicTable/TableAction.vue'
import {formatDate} from '../../utils';

export const columns = [
  {
    title: '日期', key: 'date', width: '200px', align: 'center',
    render({date}) {
      return h(
        'span',
        {},
        {
          default: () => formatDate(+date, 'YYYY-MM-DD')
        }
      )
    }
  },
  {
    title: '事件', key: 'desc', align: 'center',
    render({desc}) {
      const result = []
      desc.forEach(text => {
        result.push(h(
          'p',
          {
            class: 'm-0'
          },
          {
            default: () => text
          }
        ))
      })
      return h(
        'div',
        {},
        {
          default: () => result
        }
      )
    }
  }
]

export const createActionColumn = ({handleDel, handleEdit}) => {
  return {
    width: 300,
    title: '操作',
    key: 'action',
    // fixed: 'right',
    // align: 'left',
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
