import { BuildOutput } from '../types/interfaces';

const buildOutput: BuildOutput = (t) => (output) =>
  output ? `${output} - ${t(`countries.${output}`)}` : '';

export default buildOutput;
