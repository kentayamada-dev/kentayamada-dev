import { getKeyUpdatedObject, getUpdatedPluginRules } from './utils.js';
import cspellPlugin from '@cspell/eslint-plugin';

const cspellPrefix = '@cspell';
const customRules = {
  'spellchecker': [
    'error',
    {
      'autoFix': false,
      'numSuggestions': 3,
      'generateSuggestions': true,
      'ignoreImports': true,
      'ignoreImportProperties': true,
      'checkIdentifiers': true,
      'checkStrings': true,
      'checkStringTemplates': true,
      'checkJSXText': true,
      'checkComments': true,
      'cspell': {
        'language': 'en-US',
        'words': ['noto', 'roboto', 'rehype', 'Rehype', 'Katex', 'kenta'],
        'ignoreWords': [],
        'flagWords': [],
        'ignoreRegExpList': [],
        'includeRegExpList': [],
        'allowCompoundWords': true,
        'import': [],
        'dictionaries': [],
        'dictionaryDefinitions': []
      },
      'customWordListFile': undefined,
      'debugMode': false
    }
  ]
};

const cspellRules = getKeyUpdatedObject(
  getUpdatedPluginRules(cspellPrefix, cspellPlugin.rules, customRules),
  cspellPrefix
);

export { cspellPrefix, cspellPlugin, cspellRules };
