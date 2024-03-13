/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

const httpsRE = /^https:\/\//;

/**
 * Generate proxy
 * @param list
 */
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
      
    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // bypass(req, res, options: any) {
      //   const proxyURL = options.target + options.rewrite(req.url);
      //   console.log('proxyURL', proxyURL);
      //   req.headers['x-req-proxyURL'] = proxyURL; // 设置未生效
      //   res.setHeader('x-req-proxyURL', proxyURL); // 设置响应头可以看到
      // },
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
