type Item = {
  /**
   * Game item ID
   */
  id: number
  /**
   * Item name
   */
  name: string
  /**
   * Item quantity
   */
  quantity: number
  /**
   * Whether the item is obtained
   */
  obtained: boolean
  /**
   * ISO Date the item was obtained
   */
  obtainedAt: string | null
  /**
   * The natural index the item appears in the collection log
   */
  sequence?: number
}

export interface Collection {
  /**
   * OSRS username
   */
  username: string
  /**
   * The type of account the user has
   */
  accountType:
    | 'NORMAL'
    | 'IRONMAN'
    | 'HARDCORE_IRONMAN'
    | 'ULTIMATE_IRONMAN'
    | 'GROUP_IRONMAN'
    | 'HARDCORE_GROUP_IRONMAN'
    | 'UNRANKED_GROUP_IRONMAN'
  /**
   * Total items obtained in the collection
   */
  uniqueObtained: number
  /**
   * Total possible items in the collection
   */
  uniqueItems: number
  /**
   * There are more tabs, but I'm only typing the one we need
   */
  tabs: {
    Other: {
      'All Pets': {
        items: Item[]
      }
    }
  }
}

export interface BaseCollection extends Omit<Collection, 'tabs'> {
  /**
   * The total number of pets obtained
   */
  petCount: number
}
