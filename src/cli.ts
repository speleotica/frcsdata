import yargs from 'yargs/yargs'

void yargs(process.argv.slice(2))
  .command({
    command: 'check-survey <file>',
    describe: 'check survey file for errors or warnings',
    builder: (yargs) =>
      yargs.positional('file', {
        type: 'string',
        demandOption: true,
      }),
    handler: async ({ file }) => {
      const { checkSurvey } = await import('./cli/check-survey')
      await checkSurvey(file)
    },
  })
  .command({
    command: 'parse-survey <file>',
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
    command: 'summarize-survey <file>',
    describe: 'parse survey file and output trip summaries',
    builder: (yargs) =>
      yargs.positional('file', {
        type: 'string',
        demandOption: true,
      }),
    handler: async ({ file }) => {
      const { summarizeSurvey } = await import('./cli/summarize-survey')
      await summarizeSurvey(file)
    },
  })
  .command({
    command: 'list-names <file>',
    describe: 'parse survey file and output surveyor name/count table',
    builder: (yargs) =>
      yargs.positional('file', {
        type: 'string',
        demandOption: true,
      }),
    handler: async ({ file }) => {
      const { listNames } = await import('./cli/list-names')
      await listNames(file)
    },
  })
  .command({
    command: 'check-survey-correspondence <surveyFile> <summaryFile>',
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
        './cli/check-survey-correspondence'
      )
      await checkSurveyCorrespondence(surveyFile, summaryFile)
    },
  })
  .demandCommand().argv
