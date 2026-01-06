"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const constants_1 = require("./constants");
const generateMarkdownDocs_1 = require("./generateMarkdownDocs");
(0, forgescript_1.generateMetadata)(__dirname + '/functions', 'functions', constants_1.ForgeSocialEventManagerName, undefined, undefined, __dirname + '/events');
(0, generateMarkdownDocs_1.generateAllMarkdownDocs)();
//# sourceMappingURL=docgen.js.map