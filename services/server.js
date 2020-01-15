// 域名映射地址
// 接口前缀名地址

const baseHostName = {
    'localhost': '172.22.1.127'
}

export const getBaseName = () => {
    const hostName = window.hostName;
    return baseHostName[hostName];
}