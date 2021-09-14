import {h} from "vue";
import {NButton, NSwitch, NTag} from "naive-ui";
import {formatDate} from "@/utils";
import {isFunction} from "lodash-es";
import TableAction from '@/components/BasicTable/TableAction.vue'

export const createColumns = ({stateToggle}) => {
  return [
    {
      title: '标题',
      key: 'title',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'createdAt',
      align: 'center',
      // sorter (rowA, rowB) {
      //   console.log(rowA, rowB)
      //   return rowA.createdAt - rowB.createdAt
      // },
      render(row) {
        return h(
          'span',
          null,
          {
            default: () => row.createdAt && formatDate(row.createdAt)
          }
        )
      }
    },
    {
      title: '类型', key: 'type', align: 'center',
      render({type}) {
        const typeMap = {
          0: 'info',
          1: 'warning'
        }

        const typeEnum = {
          0: 'article',
          1: 'page'
        }
        return h(
          NTag,
          {
            type: typeMap[type]
          },
          {default: () => typeEnum[type]}
        )
      },
    },
    {
      title: '状态', key: 'status', align: 'center',
      render({status}) {
        const statusMap = {
          0: 'success',
          1: 'default',
          2: 'error',
        }

        const statusEnum = {
          0: 'publish',
          1: 'draft',
          2: 'delete',
        }
        return h(
          NTag,
          {
            type: statusMap[status]
          },
          {default: () => statusEnum[status]}
        )
      },
    },
    {title: '浏览量', key: 'views', align: 'center'},
    {title: '点赞数', key: 'likeNum', align: 'center'},
    {
      title: '置顶',
      key: 'isTop',
      align: 'center',
      render(row) {
        return h(
          NSwitch,
          {
            defaultValue: row.isTop,
            'on-update:value': value => isFunction(stateToggle) && stateToggle('isTop', row.id, value / 1)
          }
        )
      }
    },
    {
      title: '评论',
      key: 'commentDisabled',
      align: 'center',
      render(row) {
        return h(
          NSwitch,
          {
            defaultValue: row.commentDisabled,
            'on-update:value': value => isFunction(stateToggle) && stateToggle('commentDisabled', row.id, value)
          }
        )
      }
    },
    {
      title: '版权',
      key: 'shareStatement',
      align: 'center',
      render(row) {
        return h(
          NSwitch,
          {
            defaultValue: row.shareStatement,
            'on-update:value': value => isFunction(stateToggle) && stateToggle('shareStatement', row.id, value)
          }
        )
      }
    }
  ]
}

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
      onClick: () => handleEdit(record),
    },
    {
      label: '删除',
      onClick: () => handleDel(record),
    }
  ]
}
