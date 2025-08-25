import {useMemo} from "react";
import {useTodos} from "@/todo/application/useTodos.ts";

export default function TodosStats() {

  const {stats} = useTodos();

  const widthCompletion = useMemo(() => {
    if(stats.isFetched && stats.data) {
      return stats.data.total > 0
        ? (stats.data.totalCompleted / stats.data.total) * 100
        : 0
    }
    return 0;
  }, [stats])

  return (
    <>
      {stats.isFetched &&
        <div className="mt-8 bg-white rounded-xl p-4 shadow-md border border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total: {stats.data?.total} tâches</span>
            <span>
          Complétées: {stats.data?.totalCompleted}
        </span>
            <span>
                Restantes: {stats.data?.totalRemaining}
              </span>
          </div>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${widthCompletion}%`
              }}
            />
          </div>
        </div>
      }
    </>
  )

}
