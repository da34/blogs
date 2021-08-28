import {h} from "vue";
import {formatDate} from "@/utils";
import {NAvatar, NTag,NSpace} from 'naive-ui'
import UAParser from 'ua-parser-js'
import TableAction from '@/components/BasicTable/TableAction.vue'

export const columns = [
  {type: 'selection', key: 'selection'},
  {title: '序号', key: 'number', render: (row, index) => index + 1},
  {
    title: '头像', key: 'name', width: 100,
    render({avatar, nickName}) {
      return h(
        NAvatar,
        {
          round: true,
          objectFit: 'cover',
          size: 48,
          src: `https://gravatar.loli.net/avatar/${avatar}?s=48&d=retro`
        }
      )
    }
  },
  {title: '评论人', key: 'nickName'},
  {title: '被评论人', key: 'targetName'},
  {title: '评论内容', key: 'text'},
  {
    title: 'ua', key: 'ua', width: 300,
    render({ua}) {

      const parser = new UAParser(ua);
      const browser = parser.getBrowser()
      const os = parser.getOS()
      // console.log(parser.getResult());
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
        null,
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
        '删除': 'error',
        '正常': 'success',
        '不通过': 'warning',
        '需要人工复查': 'info',
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
    render(row) {
      return h(
        'span',
        null,
        {
          default: () => row.createdAt && formatDate(row.createdAt)
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
