import { isColumnCopy } from './command/column_copy'
import { isColumnCreate } from './command/column_create'
import { isColumnList } from './command/column_list'
import { isColumnRemove } from './command/column_remove'
import { isColumnRename } from './command/column_rename'
import { isConfigDelete } from './command/config_delete'
import { isConfigGet } from './command/config_get'
import { isConfigSet } from './command/config_set'
import { isDelete } from './command/delete'
import { isDump } from './command/dump'
import { isGet } from './command/get'
import { isIndexColumnDiff } from './command/index_column_diff'
import { isIOFlush } from './command/io_flush'
import { isLoad } from './command/load'
import { isLogicalCount } from './command/logical_count'
import { isLogicalRangeFilter } from './command/logical_range_filter'
import { isLogicalSelect } from './command/logical_select'
import { isLogicalShardList } from './command/logical_shard_list'
import { isLogicalTableRemove } from './command/logical_table_remove'
import { isLogLevel } from './command/log_level'
import { isLogPut } from './command/log_put'
import { isNormalize } from './command/normalize'
import { isObjectExist } from './command/object_exist'
import { isObjectInspect } from './command/object_inspect'
import { isObjectRemove } from './command/object_remove'
import { isPluginRegister } from './command/plugin_register'
import { isPluginUnregister } from './command/plugin_unregister'
import { isQueryExpand } from './command/query_expand'
import { isQueryLogFlagsAdd } from './command/query_log_flags_add'
import { isQueryLogFlagsGet } from './command/query_log_flags_get'
import { isQueryLogFlagsRemove } from './command/query_log_flags_remove'
import { isQueryLogFlagsSet } from './command/query_log_flags_set'
import { isRangeFilter } from './command/range_filter'
import { isRegister } from './command/register'
import { isReindex } from './command/reindex'
import { isRequestCancel } from './command/request_cancel'
import { isRubyEval } from './command/ruby_eval'
import { isRubyLoad } from './command/ruby_load'
import { isSchema } from './command/schema'
import { isSelect } from './command/select'
import { isShutdown } from './command/shutdown'
import { isStatus } from './command/status'
import { isSuggest } from './command/suggest'
import { isTableCopy } from './command/table_copy'
import { isTableCreate } from './command/table_create'
import { isTableList } from './command/table_list'
import { isTableRemove } from './command/table_remove'
import { isTableRename } from './command/table_rename'
import { isTableTokenize } from './command/table_tokenize'
import { isThreadLimit } from './command/thread_limit'
import { isTokenize } from './command/tokenize'
import { isTruncate } from './command/truncate'

export const TypeGuards = {
  isColumnCopy,
  isColumnCreate,
  isColumnList,
  isColumnRemove,
  isColumnRename,
  isConfigDelete,
  isConfigGet,
  isConfigSet,
  isDelete,
  isDump,
  isGet,
  isIndexColumnDiff,
  isIOFlush,
  isLoad,
  isLogicalCount,
  isLogicalRangeFilter,
  isLogicalSelect,
  isLogicalShardList,
  isLogicalTableRemove,
  isLogLevel,
  isLogPut,
  isNormalize,
  isObjectExist,
  isObjectInspect,
  isObjectRemove,
  isPluginRegister,
  isPluginUnregister,
  isQueryExpand,
  isQueryLogFlagsAdd,
  isQueryLogFlagsGet,
  isQueryLogFlagsRemove,
  isQueryLogFlagsSet,
  isRangeFilter,
  isRegister,
  isReindex,
  isRequestCancel,
  isRubyEval,
  isRubyLoad,
  isSchema,
  isSelect,
  isShutdown,
  isStatus,
  isSuggest,
  isTableCopy,
  isTableCreate,
  isTableList,
  isTableRemove,
  isTableRename,
  isTableTokenize,
  isThreadLimit,
  isTokenize,
  isTruncate,
}
