import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://api.studio.thegraph.com/query/49806/leela-ai/v0.0.2',
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
