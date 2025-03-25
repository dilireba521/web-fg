import type { ProjectConfig } from '#/config'
import { CacheTypeEnum } from '@/enums/cacheEnum'

// ! You need to clear the browser cache after the change
const setting: ProjectConfig = {
  // Permission-related cache is stored in sessionStorage or localStorage
  permissionCacheType: CacheTypeEnum.LOCAL
}

export default setting
