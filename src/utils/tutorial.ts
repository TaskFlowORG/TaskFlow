import { Step } from "react-joyride";

export const steps: { steps: Array<Step> } = {
  steps: [
    {
      target: ".initial-page",
      content: "Esta é a página inicial. Aqui você pode ver as tarefas de hoje e os projetos em que está envolvido."
    },
    {
      target: ".header",
      content: "Este é o cabeçalho do nosso site. Aqui, você pode realizar algumas configurações simples, como tema e idioma, além de acessar nosso chat, configurações e visualizar notificações quando existirem."
    },
    {
      target: ".sidebar-button",
      content: "Neste botão, você pode abrir a navegação da barra lateral."
    },
    {
      target: ".sidebar",
      content: "Esta é a nossa barra lateral simplificada. Quando você estiver dentro de um projeto, ela terá mais opções. Por enquanto, você pode ver projetos, grupos e sua página inicial."
    },
    {
      target: ".groups-side",
      content: "Essa é a barra lateral dos seus grupos, os grupos em que você é dono ou faz parte."
    },    
    {
      target: ".group-page",
      content: "Essa é a página do grupo. Aqui você pode visualizar e editar as informações do grupo (caso seja o dono), além de visualizar outros membros desse grupo."
    },
    {
      target: ".projects-page",
      content: "Essa é página de projetos, você pode registrar novos projetos e visualizar e filtrar os existentes. Vamos criar um projeto!"
    },
    {
      target: ".project-page",
      content: "Esta é a página do projeto. Aqui você pode visualizar e editar, se for o proprietário do projeto, as informações deste projeto."
    },
    {
      target: ".dashboard-button",
      content: "Ao clicar neste botão, você pode abrir o painel de controle do projeto e visualizar alguns gráficos relacionados a ele."
    },
    {
      target: ".logs-section",
      content: "Nesta seção, você pode visualizar os logs do projeto."
    },
    {
      target: ".comments-section",
      content: "Aqui estão os comentários do projeto."
    },
    {
      target: ".properties-section",
      content: "E aqui estão as propriedades valoradas no projeto."
    },
    {
      target:".properties",
      content: "Aqui estão as propriedades do projeto que seriam valoradas nas tarefas, ou seja, que o valor final seria atribuida tarefa por tarefa. Caso você esteja em uma página você poderá ver as propriedades da página juntamente com as do projeto."
    },
    {
      target: ".pages",
      content: "Aqui estão as páginas do projeto. Você pode criar novas páginas e visualizar e editar as existentes."
    },
    {
      target:".configs", 
      content: "Aqui estão as configurações da sua conta. Você pode alterar suas informações, suas preferencias e notificações."
    }
  ]
}
