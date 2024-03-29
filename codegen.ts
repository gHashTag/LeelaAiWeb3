import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8000/subgraphs/name/leela-ai-6',
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
