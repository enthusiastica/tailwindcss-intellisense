import * as path from 'path'
import stackTrace from 'stack-trace'
import pkgUp from 'pkg-up'

function isObject(variable) {
  return Object.prototype.toString.call(variable) === '[object Object]'
}

export default function getPlugins(config) {
  let plugins = config.plugins

  if (!Array.isArray(plugins)) {
    return []
  }

  return plugins.map(plugin => {
    let pluginConfig = plugin.config
    if (!isObject(pluginConfig)) {
      pluginConfig = {}
    }

    let contributes = {
      theme: isObject(pluginConfig.theme)
        ? Object.keys(pluginConfig.theme)
        : [],
      variants: isObject(pluginConfig.variants)
        ? Object.keys(pluginConfig.variants)
        : []
    }

    const fn = plugin.handler || plugin
    const fnName =
      typeof fn.name === 'string' && fn.name !== 'handler' && fn.name !== ''
        ? fn.name
        : null

    try {
      fn()
    } catch (e) {
      const trace = stackTrace.parse(e)
      if (trace.length === 0)
        return {
          name: fnName
        }
      const file = trace[0].fileName
      const dir = path.dirname(file)
      let pkg = pkgUp.sync({ cwd: dir })
      if (!pkg)
        return {
          name: fnName
        }
      try {
        pkg = __non_webpack_require__(pkg)
      } catch (_) {
        return {
          name: fnName
        }
      }
      if (pkg.name && path.resolve(dir, pkg.main || 'index.js') === file) {
        return {
          name: pkg.name,
          homepage: pkg.homepage,
          contributes
        }
      }
    }
    return {
      name: fnName
    }
  })
}
