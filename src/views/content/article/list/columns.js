import {h} from "vue";
import {NButton, NSwitch, NTag} from "naive-ui";

export const createColumns = ({sendMail, topToggle}) => {
  return [
    {title: 'id', key: 'id'},
    {
      title: '标题',
      key: 'title',
      render(row) {
        const statusMap = {
          publish: 'success',
          draft: 'warning',
          delete: 'error',
        }
        const typeMap = {
          article: 'success',
          page: 'info'
        }
        const type = statusMap[row.status]
        return (
          <div level={1}>
            <span>Hello</span> world!
          </div>
        )
        // return h(
        //   'div',
        //   null,
        //   [
        //     h(
        //       NTag,
        //       {
        //         class: 'mr-3',
        //         type
        //       },
        //       {
        //         default: () => row.status
        //       }
        //     ),
        //     h(
        //       NTag,
        //       {
        //         class: 'mr-3',
        //         type
        //       },
        //       {
        //         default: () => row.status
        //       }
        //     ),
        //     row.title,
        //   ]
        // )

      }
    },
    {title: '浏览量', key: 'views'},
    {title: '点赞数', key: 'likeNum'},
    {title: '类型', key: 'type'},
    {
      title: '置顶',
      key: 'isTop',
      render(row) {
        return h(
          NSwitch,
          {
            defaultValue: row.isTop,
            'on-update:value': value => console.log(value)
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
            'on-update:value': value => console.log(value)
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
            'on-update:value': value => console.log(value)
          }
        )
      }
    },
    {
      title: '创建时间',
      key: 'createdAt'
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          }, {
            default: () => 'Send Email'
          }
        )
      }
    }
  ]
}
