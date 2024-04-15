import { Step } from "react-joyride";

export const steps:{steps:Array<Step>} = {
  steps: [
    {
      target: '.initial-page',
      content: "Essa é sua página inicial",
      disableBeacon: true,
    },
    {
      target: '.tasks-today',
      content: 'Aqui você pode ver as tarefas que você tem para hoje, mais pra frente você verá como configurar isso.',
    },
    {
      target: '.projects-initial-page',
      content: "Aqui você tem os projetos aos quais você tem acesso.",
    },
    {
      target: '.projects-initial-page-button',
      content: 'Nesse botão você pode ir direto para a página de projetos.',
    },
    {
      target: '.sidebar',
      content: 'Se você clicar no nosso logotipo, você pode abrir a barra lateral.',
      spotlightClicks: true,

    },
    {
      target: '.projects-sidebar',
      content: 'Selecionando a opção "Projetos", você irá para a página de projetos, a mesma mencionada anteriormente. Voltaremos a essa página depois.',
    },
    {
      target: '.groups-sidebar-option',
      content: `Selecionando a opção "Grupos", você abrirá a barra lateral de grupos.`,
    },
    {
      target: '.groups-sidebar',
      content: `Aqui você pode gerenciar os grupos dos quais você faz parte.`,
    },
    {
      target: '.groups-add-button',
      content: `Clique aqui para criar um novo grupo.`,
    },
    {
      target: '.group-page',
      content: `Esta é a página do grupo que você acabou de criar, aqui você pode editar, excluir e convidar pessoas para seus grupos.`,
    },
    {
      target: '.sidebar',
      content: `Abra a barra lateral novamente!`,
      spotlightClicks: true,
      
    },
    {
      target: '.projects-sidebar',
      content: `Agora, vamos voltar para a página de projetos.`,
    },
    {
      target: '.projects-sidebar',
      content: `Agora, vamos voltar para a página de projetos.`,
    },
    {
      target: '.project-filter-button',
      content: `Aqui você tem a possibilidade de filtrar seus projetos.`,
    }, {
      target: '.project-search-button',
      content: `E aqui você pode pesquisar os projetos pelo nome, mas por enquanto vamos criar um novo projeto.`,
    },
    {
      target: '.project-add-button',
      content: `Clique aqui para fazer isso!`,
    },
    {
      target: '.project-page',
      content: `Esta é a página do projeto, aqui você pode gerenciar seu projeto.`,
    },
    {
      target: '.project-name',
      content: `Aqui você pode editar o nome do projeto.`,
    },
    {
      target: '.project-logs',
      content: `Aqui temos os logs do projeto.`,
    },
    {
      target: '.project-report',
      content: `Neste botão você pode gerar um relatório para este projeto (com base nos logs).`,
    },
    {
      target: '.project-comments',
      content: `Clicando aqui você pode ver os comentários do projeto e, se quiser, pode comentar aqui também.`,
    },
    {
      target: '.project-values',
      content: `Nesta seção você pode ver as propriedades do projeto, mais especificamente as propriedades que são valorizadas no projeto.`,
    },
    {
      target: '.project-value-button',
      content: `Clique aqui para inserir uma propriedade neste projeto.`,
    },
    //Cadastrar propriedade valorada no projeto
    {
      target: '.sidebar',
      content: `Vamos abrir a barra lateral novamente!`,
      spotlightClicks: true,
      
    },
    {
      target: '.sidebar-component',
      content: `Agora temos mais opções nesta barra lateral!`,
    },
    {
      target: '.pages-sidebar-option',
      content: `Selecionando esta opção, você poderá ver as páginas do projeto aberto.`,
    },
    {
      target: '.tash',
      content: `Aqui você tem acesso às tarefas excluídas deste projeto.`,
    },
    {
      target: '.pages-sidebar-option',
      content: `Vamos inserir uma página neste projeto!`,
    },
    {
      target: '.pages-sidebar-add-button',
      content: `Clique aqui e adicione uma página kanban!`,
    },
    {
      target: ".page-type-selector",
      content: `Aqui você pode escolher o tipo da página. Se quiser, como mencionado, no final deste tour você pode iniciar outro tour para aprender mais sobre os tipos de páginas e tipos de propriedades em nosso site.`,
    },
    {
      target: '.page-or-property-options',
      content: `Aqui você pode abrir as opções da página, excluir, renomear, mesclar e alterar o tipo.`,
    },
    {
      target: '.page-delete',
      content: `Clicando aqui você irá excluir a página.`,
    },
    {
      target: '.page-rename',
      content: `Aqui você pode renomear a página.`,
    },
    {
      target: '.page-merge',
      content: `Nesta opção você irá copiar e colar as propriedades e tarefas desta página para outra página. (Pode ser mais de uma página)`,
    },
    {
      target: '.page-change-type',
      content: `E aqui você pode alterar o tipo da página.`,
    },
    {
      target: '.add-prop-or-task',
      content: `Clique aqui...`,
    },
    {
      target: '.add-prop-or-task-modal',
      content: `Neste modal você pode escolher gerenciar as propriedades da página ou adicionar uma tarefa.`,
    },
    {
      target: '.manage-properties',
      content: `Clique aqui para gerenciar as propriedades da página.`,
    },
    {
      target: '.add-property',
      content: `Neste botão você pode adicionar uma nova propriedade à página.`,
    },
    {
      target: '.page-or-property-options',
      content: `Aqui você tem algumas configurações da propriedade.`,
    },
    {
      target:".property-delete",
      content: `Clique aqui para excluir a propriedade.`,
    },
    {
      target:".cant-delete-property",
      content: `Você não pode excluir esta propriedade porque alguma página precisa dela. Neste caso, esta página, kanban, precisa de uma propriedade de seleção, tag, caixa de seleção ou rádio.`,
    },
    {
      target:".add-prop-or-task",
      content: `Clique aqui para adicionar uma tarefa a esta página.`,
    },
    {
      target:".add-task",
      content: `Clique aqui.`,
    },
    {
      target:".task",
      content: `Essa é a sua tarefa, clique nela para abrir as informações específicas desta tarefa.`,
    },
    {
      target:".modal-task",
      content: `Essa é uma interface com a qual você está acostumado, então não precisamos explicar mais uma vez.`,
    },
    {
      target:".sidebar",
      content: `Vamos voltar para a página do projeto...`,
    },
    {
      target:".project-sidebar",
      content: `Clique aqui!`,
    },
    {
      target:".add-prop-or-task",
      content: `Agora deixe-me mostrar algo interessante.`,
    },
    {
      target:".sidebar-properties",
      content: `Agora esta barra lateral é específica para as propriedades do projeto, mas apenas as propriedades valorizadas em suas tarefas, ou seja, propriedades globais para o projeto, mas relacionadas às tarefas em si.`,
    }
  ]
}