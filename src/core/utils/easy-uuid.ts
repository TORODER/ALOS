let acc = 0;
/**
 * 简单的UUID生成方法
 * @param prefix UUID 前缀 例如 buildUUID("PID") buildUUID("NID")
 * @returns 返回一个带时间的 UUID
 */
export function buildUUID(prefix: string) {
    acc+=1;
    return `${prefix}_${Date.now()}_${~~(Math.random() * 99999)}_${acc}`;
}