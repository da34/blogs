<template>
  <div class="mt-3">
    <NGrid cols="1 s:2 m:2 l:2 xl:2 2xl:2" responsive="screen" :x-gap="12" :y-gap="8">
      <NGi>
        <NCard segmented size="small" :bordered="false" title="最近文章">
          <NList>
            <NListItem>
              <NThing title="Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 22:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <NThing title="Ah Jung 在 开源组 创建了项目 naive-ui-admin？">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 09:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <NThing title="@It界风清扬，向naive-ui-admin提交了一个bug，抽时间看看吧！">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 22:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <NThing title="技术部那几位童鞋，再次警告，不要摸鱼，不要摸鱼，不要摸鱼啦！">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 09:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <NThing title="上班不摸鱼，和咸鱼有什么区别（这话真不是我说的哈）！">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 20:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <NThing title="页面切换其实也支持缓存，只是加了过度效果，看起来像是重新渲染了">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 20:37:16</p>
                </template>
              </NThing>
            </NListItem>
          </NList>
        </NCard>
      </NGi>
      <NGi>
        <NCard segmented size="small" :bordered="false" title="最近评论">
          <n-list>
            <NListItem>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy"/>
              </template>
              <NThing title="Ah Jung 刚才把工作台页面随便写了一些，凑合能看了！">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 22:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy"/>
              </template>
              <NThing title="Ah Jung 在 开源组 创建了项目 naive-ui-admin？">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 09:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy"/>
              </template>
              <NThing title="@It界风清扬，向naive-ui-admin提交了一个bug，抽时间看看吧！">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 22:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy"/>
              </template>
              <NThing title="技术部那几位童鞋，再次警告，不要摸鱼，不要摸鱼，不要摸鱼啦！">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 09:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy"/>
              </template>
              <NThing title="上班不摸鱼，和咸鱼有什么区别（这话真不是我说的哈）！">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 20:37:16</p>
                </template>
              </NThing>
            </NListItem>
            <NListItem>
              <template #prefix>
                <n-avatar circle :size="40" :src="schoolboy"/>
              </template>
              <NThing title="页面切换其实也支持缓存，只是加了过度效果，看起来像是重新渲染了">
                <template #description>
                  <p class="text-xs text-gray-500">2021-07-04 20:37:16</p>
                </template>
              </NThing>
            </NListItem>
          </n-list>
        </NCard>
      </NGi>
    </NGrid>
  </div>
</template>

<script setup>
import {NGrid, NGi, NCard, NList, NListItem, NThing, NAvatar} from 'naive-ui'
const schoolboy = ''
</script>

<style scoped>

</style>
