import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api.studio.thegraph.com/query/49806/leela-ai-3/version/latest',
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: ['typescript'],
      config: {
        arrayInputCoercion: false,
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'src/types/types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },
  },
}

export default config
