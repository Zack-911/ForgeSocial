import { generateMetadata } from '@tryforge/forgescript';
import { ForgeSocialEventManagerName } from './constants';
import { generateAllMarkdownDocs } from './generateMarkdownDocs';

generateMetadata(
  __dirname + '/functions',
  'functions',
  ForgeSocialEventManagerName,
  undefined,
  undefined,
  __dirname + '/events',
);

generateAllMarkdownDocs();
