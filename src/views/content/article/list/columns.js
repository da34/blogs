import {h} from 'vue';
import {NSwitch, NTag, NSpace} from 'naive-ui';
import {formatDate} from '@/utils';
import {isFunction} from 'lodash-es';
import TableAction from '@/components/BasicTable/TableAction.vue'

export const createColumns = ({updateArticle}) => {
  return [
    {
      title: '标题',
      key: 'title',
      ellipsis: true,
      align: 'center'
    },
    {
      title: '发布时间',
      key: 'createTime',
      align: 'center',
      // sorter (rowA, rowB) {
      //   console.history(rowA, rowB)
      //   return rowA.createdAt - rowB.createdAt
      // },
      render(row) {
        return h(
          'span',
          null,
          {
            default: () => row.createTime && formatDate(+row.createTime)
          }
        )
      }
    },
    {
      title: '分类',
      key: 'category',
      align: 'center',
      render({category}) {
        return category?.name && h(
          NTag,
          {
            type: 'success'
          },
          {default: () => category?.name}
        )
      }
    },
    {
      title: '标签',
      key: 'tags',
      align: 'center',
      render({tags}) {
        const rTags = tags.map((tag, i) => {
          return h(
            NTag,
            {
              type: [ 'primary' ,'info' , 'success' , 'warning' , 'error'][i % 5]
            },
            {default: () => tag.name}
          )
        })
        return h(
          NSpace,
          {
            justify: 'center'
          },
          { default: () => rTags }
        )
      }
    },
    {
      title: '类型', key: 'type', align: 'center', width: '150px',
      render({type}) {
        const typeMap = {
          'article': 'info',
          'page': 'warning'
        }
        return h(
          NTag,
          {
            type: typeMap[type]
          },
          {default: () => type}
        )
      },
    },
    {title: '浏览量', key: 'views', align: 'center', width: '150px'},
    {
      title: '置顶',
      key: 'isTop',
      align: 'center',
      width: '150px',
      render(row) {
        return h(
          NSwitch,
          {
            defaultValue: row.isTop,
            'on-update:value': value => isFunction(updateArticle) && updateArticle(Object.assign(row, { isTop: value  }))
          }
        )
      }
    },
    {
      title: '评论',
      key: 'isCommentOpen',
      align: 'center',
      width: '150px',
      render(row) {
        return h(
          NSwitch,
          {
            defaultValue: row.isCommentOpen,
            'on-update:value': value => isFunction(updateArticle) && updateArticle(Object.assign(row, { isCommentOpen: value  }))
          }
        )
      }
    },
    {
      title: '版权',
      key: 'isShare',
      align: 'center',
      width: '150px',
      render(row) {
        return h(
          NSwitch,
          {
            defaultValue: row.isShare,
            'on-update:value': value => isFunction(updateArticle) && updateArticle(Object.assign(row, { isShare: value  }))
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
