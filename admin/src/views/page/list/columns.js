import {h} from 'vue';
import {NTag, NBadge} from 'naive-ui';
import {formatDate} from '@/utils';
import TableAction from '@/components/BasicTable/TableAction.vue'

export const createColumns = ({updateArticle}) => {
  return [
    {title: '名称', key: 'title',},
    {title: '路径', key: 'slug',},
    {title: '排序', key: 'order',},
    {
      title: '阅读量', key: 'views', width: '150px',
      render({views}) {
        return h(NBadge, {value: views, type: 'info'});
      }
    },
    {
      title: '状态',
      key: 'status',
      render({status}) {
        return h(
          NTag,
          {
            type: status ? 'success' : 'warning'
          },
          {default: () => status ? '正常' : '下线'}
        )
      }
    },
    {
      title: '发布时间',
      key: 'created',
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

export const createActionColumn = ({handleDel, handleEdit, handleReview, handleIsDown}) => {
  return {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction, {
        style: 'button',
        actions: createActions(record, handleDel, handleEdit, handleReview, handleIsDown),
      });
    }
  }
}

function createActions(record, handleDel, handleEdit, handleReview, handleIsDown) {
  return [
    {
      label: '编辑',
      onClick: () => handleEdit(record),
    },
    // {
    //   label: '查看',
    //   onClick: () => handleReview(record),
    // },
    {
      label: '下线',
      class: record.status ?  'block' : 'hidden',
      onClick: () => handleIsDown(record, false),
    },
    {
      label: '发布',
      class: record.status ? 'hidden' : 'block',
      onClick: () => handleIsDown(record, true),
    },
    {
      label: '删除',
      onClick: () => handleDel(record),
    },
  ]
}
