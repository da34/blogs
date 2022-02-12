import {h} from 'vue';
import {formatDate} from '@/utils';
import {NSpace, NTag} from 'naive-ui'
import UAParser from 'ua-parser-js'
import TableAction from '@/components/BasicTable/TableAction.vue'

export const columns = [
  {title: '评论人', key: 'name'},
  // {title: '被评论人', key: 'targetName', width: 100,},
  {title: '评论内容', key: 'text'},
  {
    title: 'ua', key: 'ua',
    render({ua}) {

      const parser = new UAParser(ua);
      const browser = parser.getBrowser()
      const os = parser.getOS()
      // console.history(parser.getResult());
      const browserDom = h(NTag,
        {
          type: 'info',
          size: 'small'
        },
        {
          default: () => browser.name + browser.version
        }
      )
      const osDom = h(NTag,
        {
          type: 'success',
          size: 'small'
        },
        {
          default: () => os.name + os.version
        }
      )

      return h(
        NSpace,
        {
        },
        {
          default: () => [osDom, browserDom]
        }
      )
    }
  },
  {title: 'ip', key: 'ip'},
  {title: '来源', key: 'anchor'},
  {
    title: '状态', key: 'status',
    render({status}) {
      const typeMap = {
        'pass': 'success',
        'block': 'warning',
        'review': 'info',
      }

      return h(
        NTag,
        {
          type: typeMap[status]
        },
        {
          default: () => status
        }
      )
    }
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 200,
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
