import { computed, ref, watch } from 'vue'

export const usePagination = <T>(
  fetchData: (
    offset: number,
    limit: number
  ) => Promise<{ data: T[]; totalCount: number } | undefined>,
  perPage = 10
) => {
  const data = ref<T[]>([])
  const totalCount = ref<number>(0)
  const page = ref<number>(1)

  const totalPages = computed(() => Math.ceil(totalCount.value / perPage))

  const loadData = async () => {
    const offset = (page.value - 1) * perPage
    const response = await fetchData(offset, perPage)

    if (!response) {
      return
    }

    data.value = response?.data
    totalCount.value = response?.totalCount
  }

  watch(page, loadData)

  loadData()

  const setPage = (newPage: number) => {
    if (newPage !== page.value && newPage > 0 && newPage <= totalPages.value) {
      page.value = newPage
    }
  }

  const reset = () => {
    data.value = []
    totalCount.value = 0
    page.value = 1

    loadData()
  }

  return {
    data,
    page,
    totalPages,
    setPage,
    reset
  }
}
