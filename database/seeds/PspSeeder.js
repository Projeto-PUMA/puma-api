"use strict";

/*
|--------------------------------------------------------------------------
| PspSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Database')} */
const Database = use('Database')
const slugify = use('slugify')

class PspSeeder {
  static async run() {
    let psps = [
      {
        title: 'PSP 1', psp_father_id: null, description: 'Probabilidade e Estatística',
      },
      {
        title: 'PSP 2', psp_father_id: null, description: 'Sistemas de informação',
      },
      {
        title: 'PSP 3', psp_father_id: null, description: 'Livre',
      },
      {
        title: 'PSP 4', psp_father_id: null, description: 'Planejamento e controle da Produção',
      },
      {
        title: 'PSP 5', psp_father_id: null, description: 'Gestão da Qualidade',
      },
      {
        title: 'PSP 6', psp_father_id: null, description: 'Engenharia do Produto',
      },
      {
        title: 'PSP 7', psp_father_id: null, description: 'Gestão estratégica',
      },
      {
        title: 'N/A', psp_father_id: null, description: 'Não sei em qual categoria meu projeto se encaixa',
      },
      {
        title: 'Análise de Banco de Dados', psp_father_id: 1, description: 'Análise de Banco de Dados',
      },
      {
        title: 'Criação de Questionários de Pesquisa', psp_father_id: 1, description: 'Criação de Questionários de Pesquisa',
      },
      {
        title: 'Outras', psp_father_id: 1, description: 'Outras',
      },

      {
        title: 'Projeto de Sistemas de Informação', psp_father_id: 2, description: 'Projeto de Sistemas de Informação',
      },
      {
        title: 'Outras', psp_father_id: 2, description: 'Outras',
      },

      {
        title: 'Outras', psp_father_id: 3, description: 'Outras',
      },

      {
        title: 'Previsão de Demanda', psp_father_id: 4, description: 'Previsão de Demanda',
      },
      {
        title: 'Gestão de Estoque', psp_father_id: 4, description: 'Gestão de Estoque',
      },
      {
        title: 'Criação de Ferramentas de Apoio ao Planejamento e Controle da Produção',
        psp_father_id: 4,
        description: 'Criação de Ferramentas de Apoio ao Planejamento e Controle da Produção',
      },
      {
        title: 'Outras', psp_father_id: 4, description: 'Outras',
      },

      {
        title: 'Mapeamento de Processos', psp_father_id: 5, description: 'Mapeamento de Processos',
      },
      {
        title: 'Melhoria Contínua de Processos', psp_father_id: 5, description: 'Melhoria Contínua de Processos',
      },
      {
        title: 'Cadeia de Valor', psp_father_id: 5, description: 'Cadeia de Valor',
      },
      {
        title: 'Outras', psp_father_id: 5, description: 'Outras',
      },

      {
        title: 'Elaboração de Projeto Conceitual de Produto',
        psp_father_id: 6,
        description: 'Elaboração de Projeto Conceitual de Produto',
      },
      {
        title: 'Outras', psp_father_id: 6, description: 'Outras',
      },
      {
        title: 'Definição de Objetivos Estratégicos', psp_father_id: 6, description: 'Definição de Objetivos Estratégicos',
      },
      {
        title: 'Viabilidade Econômica', psp_father_id: 6, description: 'Viabilidade Econômica',
      },
      {
        title: 'Desdobramento de Metas', psp_father_id: 6, description: 'Desdobramento de Metas',
      },
      {
        title: 'Outras', psp_father_id: 6, description: 'Outras',
      },
    ];
    psps.map(psp => {
      psp.slug = slugify(psp.title, {
        remove: null,
        lower: true,
        replacement: '-'
      })
    })
    console.log(psps);
    await Database.table("psps").insert(psps);
  }
}

module.exports = PspSeeder;


