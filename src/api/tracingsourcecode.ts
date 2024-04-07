import request from "@/axios/index";

export function get_source_codeList(str: string, query: object) {
    return request({
        method: 'get',
        url: "/api/TraceInfo/TraceInfoList",
        params: {
            timeType: `'${str}'`,
            ...query
        }
    })
}

export function get_proId_proName(CurrentPage: number, PageSize: number) {
    return request({
        url: '/api/ProInfo/ProInfoList',
        method: 'get',
        params: {
            CurrentPage,
            PageSize
        }
    })
}

export function Add_Ayyly(proId: string, applyName: string, levThreeCount: number, levOneCount: number, levTwoCount: number) {
    return request({
        url: '/api/TraceInfo/TraceCodeApply',
        method: 'get',
        params: {
            proId,
            applyName,
            levThreeCount,
            levOneCount,
            levTwoCount
        }
    })
}

export function Delete(traceId: number | string) {
    return request({
        url: "/api/TraceInfo/Trace_Del",
        method: 'get',
        params: {
            traceId,
        }
    })
}

export function download(traceId: string | number) {
    return request({
        url: '/api/TraceInfo/DownTraceInfo',
        method: 'get',
        params: {
            traceId,
        }
    })
}

// export function download1(url: string) {
//
//
//
//
// }