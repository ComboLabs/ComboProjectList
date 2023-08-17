export const ADDRESS_TYPE = {
  type: 'string',
  minLength: 42,
  maxLength: 42,
}

export const TOKEN_SCHEMA = {
  project_name: {
    type: 'string',
  },
  project_describe: {
    type: 'string',
    minLength: 1,
    maxLength: 1000,
  },
  additionalProperties: false,
  required: ['project_name', 'project_describe']
}

export const TOKEN_DATA_SCHEMA = {
  type: 'object',
  properties: {
    project_name: {
      type: 'string',
    },
    project_describe: {
      type: 'string',
      minLength: 1,
      maxLength: 1000,
    },
    contract: {
      combo: {
        address: ADDRESS_TYPE,
        properties: {
          type: 'string',
        },
        required: ['address'],
      }
    },
    overrides: TOKEN_SCHEMA
  },
  additionalProperties: false,
  required: ['project_name', 'project_describe'],
}

export default {
  TOKEN_DATA_SCHEMA,
}
