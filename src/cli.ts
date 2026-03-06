import yargs from 'yargs/yargs'

void yargs(process.argv.slice(2))
  .command({
    command: 'check <file>',
    describe: 'check file for errors or warnings',
    builder: (yargs) =>
      yargs.positional('file', {
        type: 'string',
        demandOption: true,
      }),
    handler: async ({ file }) => {
      const { check } = await import('./cli/check')
      await check(file)
    },
  })
  .demandCommand().argv
