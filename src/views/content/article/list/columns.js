import {h} from 'vue';
import {NSwitch, NTag, NSpace, NBadge} from 'naive-ui';
import {formatDate} from '@/utils';
import {isFunction} from 'lodash-es';
import TableAction from '@/components/BasicTable/TableAction.vue'

export const createColumns = ({updateArticle}) => {
  return [
    {
      title: '标题',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '分类',
      width: '200px',
      key: 'category',
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
          },
          { default: () => rTags }
        )
      }
    },
    {title: '阅读量', key: 'views', width: '150px', render({views}) {
        return h(NBadge,{ value: views, type: 'info' });
      }},
    {
      title: '评论',
      key: 'isCommentOpen',
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
      title: '发布时间',
      key: 'createTime',
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
  ]
}

export const createActionColumn = ({handleDel, handleEdit}) => {
  return {
    title: '操作',
    key: 'action',
    fixed: 'right',
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
      label: '查看',
      onClick: () => handleEdit(record),
    },
    {
      label: '删除',
      onClick: () => handleDel(record),
    }
  ]
}
