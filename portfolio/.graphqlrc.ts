import { IGraphQLConfig } from 'graphql-config';
import dotenv from 'dotenv';

dotenv.config();

const config: IGraphQLConfig = {
  documents: 'src/**/*.tsx',
  schema: {
    [`https://graphql.contentful.com/content/v1/spaces/${process.env['CONTENTFUL_SPACE_ID']}`]: {
      headers: {
        Authorization: `Bearer ${process.env['CONTENTFUL_ACCESS_TOKEN']}`
      }
    }
  }
};

export default config;
