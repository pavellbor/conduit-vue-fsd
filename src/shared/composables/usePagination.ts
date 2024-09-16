import { computed, ref, watch } from 'vue'

export const usePagination = <T>(
  fetchData: (offset: number, limit: number) => Promise<{ data: T[]; totalCount: number }>,
  perPage = 10
) => {
  const data = ref<T[]>([])
  const totalCount = ref<number>(0)
  const page = ref<number>(1)

  const totalPages = computed(() => Math.ceil(totalCount.value / perPage))

  const loadData = async () => {
    const offset = (page.value - 1) * perPage
    const { data: items, totalCount: count } = await fetchData(offset, perPage)
    data.value = items
    totalCount.value = count
  }

  watch(page, loadData)

  loadData()

  const setPage = (newPage: number) => {
    if (newPage !== page.value && newPage > 0 && newPage <= totalPages.value) {
      page.value = newPage
    }
  }

  return {
    data,
    totalCount,
    page,
    totalPages,
    setPage
  }
}
