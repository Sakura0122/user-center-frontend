import { ref } from 'vue'

export default function usePagination(callback: () => void, options = { defaultPageSize: 15 }) {
  const pagination = ref({
    current: 1,
    pageSize: options.defaultPageSize,
    showSizeChanger: true,
    total: 0,
    pageSizeOptions: ['1', '10', '15', '30', '50'],
    hideOnSinglePage: false,
    position: ['bottomCenter'],
    onChange: (page: number) => {
      pagination.value.current = page
      callback && callback()
    },
    onShowSizeChange: (current: number, size: number) => {
      pagination.value.current = 1
      pagination.value.pageSize = size
      callback && callback()
    }
  })

  return {
    pagination
  }
}
