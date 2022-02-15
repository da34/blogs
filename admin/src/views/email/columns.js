import {h} from 'vue';
import {formatDate} from '@/utils';
import {NTag} from 'naive-ui'
import TableAction from '@/components/BasicTable/TableAction.vue'

export const columns = [
  {title: '发件人', key: 'fromEmail',  },
  {title: '收件人', key: 'toEmail', },
  {title: '主题', key: 'subject', width: 300, },
  {
    title: '状态', key: 'isSuccess', width: 100,
    render({isSuccess}) {
      return h(
        NTag,
        {
          type: isSuccess ? 'success' : 'error'
        },
        {
          default: () => isSuccess ? '成功' : '失败'
        }
      )
    }
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 200,
    align: 'center',
    render(row) {
      return h(
        'span',
        null,
        {
          default: () => row.createTime && formatDate(+row.createTime)
        }
      )
    }
  }
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
