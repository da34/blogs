import {h} from "vue";
import {NButton, NSwitch, NTag,NImage, NEmpty} from "naive-ui";
import {formatDate} from "@/utils";
import {isFunction} from "lodash-es";

export const createColumns = ({handleEdit, handleDel, stateToggle}) => {
  return [
    { type: 'selection', key: 'selection'},
    {title: '序号', key: 'number', render: (row, index) => index + 1},
    {title: '头图', key: 'firstPicture', width: 190,
      render({firstPicture, title}) {
        if (firstPicture) {
          return h(
            NImage,
            {
              alt: title,
              width: 150,
              objectFit: 'cover',
              style: 'height: 80px',
              src: firstPicture
            }
          )
        }
        return h(
            NEmpty,
            {
              description: '没有图片'
            }
          )
      }
    },
    {
      title: '标题',
      key: 'title',
      ellipsis: true,
      render(row) {
        const statusMap = {
          0: 'success',
          1: 'default',
          2: 'error',
        }
        const typeMap = {
          0: 'warning',
          1: 'info'
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

        const status = statusMap[row.status]
        const type = typeMap[row.type]
        const statusText = statusEnum[row.status]
        const typeText = typeEnum[row.type]

        const tagDom = (type, text) => h(NTag,
          {class: 'mr-3', type, round: true},
          {default: () => text}
        )

        return h(
          'div',
          null,
          [
            tagDom(status, statusText),
            tagDom(type, typeText),
            row.title,
          ]
        )
      }
    },
    {title: '浏览量', key: 'views'},
    {title: '点赞数', key: 'likeNum'},
    {
      title: '置顶',
      key: 'isTop',
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
    },
    {
      title: '操作',
      key: 'actions',
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
