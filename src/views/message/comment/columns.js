import {h} from "vue";
import {NButton, NSwitch, NTag, NImage, NEmpty} from "naive-ui";
import {formatDate} from "@/utils";
import {isFunction} from "lodash-es";

export const createColumns = [
  {type: 'selection', key: 'selection'},
  {title: '序号', key: 'number', render: (row, index) => index + 1},
  {
    title: '头像', key: 'name', width: 100,
    render({firstPicture, title}) {
      if (firstPicture) {
        return h(
          NImage,
          {
            alt: title,
            width: 90,
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
  {title: '评论人', key: 'nickName'},
  {title: '被评论人', key: 'targetName'},
  {title: '评论内容', key: 'text'},
  {title: 'ua', key: 'ua'},
  {title: 'ip', key: 'ip'},
  {title: '来源', key: 'anchor'},
  {title: '状态', key: 'status'},
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
