import {h} from 'vue';
import TableAction from '@/components/BasicTable/TableAction.vue'
import {formatDate} from '../../../utils';

export const columns = [
  {
    title: '日期', key: 'date',
    render({date}) {
      return h(
        'span',
        {},
        {
          default: () => formatDate(date, 'YYYY-MM-DD')
        }
      )
    }
  },
  {title: '描述', key: 'desc'}
]

export const createActionColumn = ({handleDel, handleEdit}) => {
  return {
    width: 300,
    title: '操作',
    key: 'action',
    // fixed: 'right',
    // align: 'left',
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
