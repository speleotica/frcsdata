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
  .demandCommand().argv
