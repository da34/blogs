import {h} from "vue";
import {NButton, NSwitch, NTag} from "naive-ui";
import {formatDate} from "@/utils";
import {isFunction} from "lodash-es";

export const createColumns = ({handleEdit, handleDel, stateToggle}) => {
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
        const statusMap = {
          0: 'success',
          1: 'default',
          2: 'error',
        }
        const typeMap = {
          0: 'info',
          1: 'warning'
        }

        const statusEnum = {
          0: 'publish',
          1: 'draft',
          2: 'delete',
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
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render(row) {
        const editBtn = h(NButton,
          {
            size: 'small',
            class: 'mr-3',
            onClick: () => isFunction(handleEdit) && handleEdit(row.id)
          },
          {default: () => '编辑'}
        )
        const delBtn = h(NButton,
          {
            size: 'small',
            onClick: () => isFunction(handleDel) && handleDel(row.id),
          },
          {default: () => '删除'}
        )
        return h(
          'div',
          null,
          [editBtn, delBtn]
        )
      }
    }
  ]
}
