#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('@AMK')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');
  
program.command("ifnti")
        .argument('<string>', "Niveau d'étude (L1, L2, L3)")
        .action((str, options)=>{          
          console.log("Bonjour "+str);
        });

program.parse();

