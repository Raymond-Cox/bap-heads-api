import CollLogAPI from '../api/CollLogAPI.js'

/**
 * @template T
 * @param {T[]} arr Array to chunk
 * @param {number} [size=10] Size of the chunks
 * @returns {T[][]}
 */
export const chunker = (arr, size = 10) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) => {
    const start = index * size

    return arr.slice(start, start + size)
  })
}

/**
 * Chunks the users array and runs the operation on each chunk.
 * @template T
 * @param {T} operation Method to run
 * @param {string[]} arr Array to chunk
 * @param {number} chunkLimit Default 10
 * @param {number} chunkGap Default 5000
 * @returns {Promise<ReturnType<T>>}
 */
export const chunkedGetClogs = async (
  users,
  chunkLimit = 10,
  chunkGap = 5000
) => {
  const chunkedMembers = chunker(users, chunkLimit)

  // Create promises for each chunk
  const promises = chunkedMembers.map(async (chunk, index) => {
    if (index !== 0) {
      await new Promise((resolve) => setTimeout(resolve, chunkGap * index))
    }

    const collLogAPI = new CollLogAPI(chunk)

    return collLogAPI.fetchAllScores()
  })

  const chunkedResults = await Promise.all(promises)

  // flatten the results array
  return chunkedResults.flat().filter(Boolean)
}
