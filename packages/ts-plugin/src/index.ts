import type ts from 'typescript/lib/tsserverlibrary'

function init({ typescript }: { typescript: typeof ts }) {
  function create(info: ts.server.PluginCreateInfo) {
    return info.languageService
  }

  return {
    create,
  }
}

export default init
