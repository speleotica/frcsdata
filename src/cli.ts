import yargs from 'yargs/yargs'

void yargs(process.argv.slice(2))
  .command({
    command: 'check <file>',
    describe: 'check survey file for errors or warnings',
    builder: (yargs) =>
      yargs.positional('file', {
        type: 'string',
        demandOption: true,
      }),
    handler: async ({ file }) => {
      const { checkSurvey } = await import('./cli/check')
      await checkSurvey(file)
    },
  })
  .command({
    command: 'parse <file>',
    describe: 'parse survey file and output JSON parse tree',
    builder: (yargs) =>
      yargs.positional('file', {
        type: 'string',
        demandOption: true,
      }),
    handler: async ({ file }) => {
      const { parseSurvey } = await import('./cli/parse-survey')
      await parseSurvey(file)
    },
  })
  .command({
    command: 'summarize <file>',
    describe: 'parse survey file and output trip summaries',
    builder: (yargs) =>
      yargs.positional('file', {
        type: 'string',
        demandOption: true,
      }),
    handler: async ({ file }) => {
      const { summarizeSurvey } = await import('./cli/summarize')
      await summarizeSurvey(file)
    },
  })
  .command({
    command: 'list-names <file>',
    describe: 'parse survey file and output surveyor name/count table',
    builder: (yargs) =>
      yargs
        .positional('file', {
          type: 'string',
          demandOption: true,
        })
        .option('counts', {
          alias: 'c',
          type: 'boolean',
          describe: 'count the number of occurrences of each name',
          demandOption: false,
        }),
    handler: async ({ file, counts }) => {
      const { listSurveyNames: listNames } = await import('./cli/list-names')
      await listNames(file, { includeCounts: counts })
    },
  })
  .command({
    command: 'replace-names <surveyFile> <replacementsFile>',
    describe: 'replace names survey file',
    builder: (yargs) =>
      yargs
        .positional('surveyFile', {
          type: 'string',
          demandOption: true,
        })
        .positional('replacementsFile', {
          type: 'string',
          demandOption: true,
        }),
    handler: async ({ surveyFile, replacementsFile }) => {
      const { replaceSurveyNames: replaceNames } = await import(
        './cli/replace-names'
      )
      await replaceNames(surveyFile, replacementsFile)
    },
  })
  .command({
    command: 'check-correspondence <surveyFile> <summaryFile>',
    describe: 'parse survey file and output trip summaries',
    builder: (yargs) =>
      yargs
        .positional('surveyFile', {
          type: 'string',
          demandOption: true,
        })
        .positional('summaryFile', {
          type: 'string',
          demandOption: true,
        }),
    handler: async ({ surveyFile, summaryFile }) => {
      const { checkSurveyCorrespondence } = await import(
        './cli/check-correspondence'
      )
      await checkSurveyCorrespondence(surveyFile, summaryFile)
    },
  })
  .demandCommand().argv
