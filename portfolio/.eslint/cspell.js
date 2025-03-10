import cspellPlugin from '@cspell/eslint-plugin';
import { getExtend, addPrefixRule, validateRules } from './utils.js';

const cspellPrefix = '@cspell';

const cspellRule = addPrefixRule(cspellPrefix, {
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
        'words': ['noto', 'roboto', 'rehype', 'Rehype', 'Katex', 'kenta', 'forex', 'youtu'],
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
});

const cspellExtend = getExtend(cspellPrefix, cspellPlugin.rules);

validateRules(cspellExtend, cspellRule);

export { cspellPrefix, cspellExtend, cspellRule, cspellPlugin };
